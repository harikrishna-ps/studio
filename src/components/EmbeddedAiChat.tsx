'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { hotelRecommendationChat } from '@/ai/flows/hotel-recommendation-chat';
import { useToast } from '@/hooks/use-toast';
import { hotels } from '@/lib/mock-data';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function EmbeddedAiChat({className}: {className?: string}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const historyForGenkit = newMessages.map(msg => ({
          role: msg.role === 'assistant' ? ('model' as const) : ('user' as const),
          parts: [{ text: msg.content }],
      }));

      const result = await hotelRecommendationChat({
        history: historyForGenkit,
        hotelList: JSON.stringify(hotels),
      });
      const assistantMessage: Message = { role: 'assistant', content: result.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI chat error:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with the AI assistant. Please try again later.',
      });
       const assistantMessage: Message = { role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now. Please try again later." };
       setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-[400px] ${className || ''}`}>
        <ScrollArea className="flex-1 my-4 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
             {messages.length === 0 && (
                <div className="flex justify-start">
                    <div className="max-w-xs rounded-lg px-4 py-2 text-sm lg:max-w-md bg-muted flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        <span>How can I help you plan your trip?</span>
                    </div>
                </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 text-sm lg:max-w-md ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
             {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-xs rounded-lg px-4 py-2 text-sm lg:max-w-md bg-muted flex items-center gap-2">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. recommend a hotel in Paris with a pool"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading} style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
    </div>
  );
}
