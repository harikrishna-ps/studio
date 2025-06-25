'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, LoaderCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { hotelRecommendationChat } from '@/ai/flows/hotel-recommendation-chat';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AiChat() {
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
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await hotelRecommendationChat({ userInput: input });
      const assistantMessage: Message = { role: 'assistant', content: result.hotelRecommendations };
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
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed bottom-4 right-4 z-50 h-16 w-16 rounded-full shadow-lg" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}} >
          <Bot className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            AI Assistant
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 my-4" ref={scrollAreaRef}>
          <div className="space-y-4 pr-4">
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
            placeholder="Ask for hotel recommendations..."
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading} style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
