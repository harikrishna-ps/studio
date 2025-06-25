import HotelSearchForm from '@/components/HotelSearchForm';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Bot } from 'lucide-react';
import EmbeddedAiChat from '@/components/EmbeddedAiChat';

export default function Home() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden p-4">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Beautiful hotel lobby"
        fill
        className="object-cover -z-10 opacity-30"
        data-ai-hint="hotel lobby"
      />
      <div className="z-10 w-full max-w-4xl rounded-xl bg-card/80 p-8 shadow-lg backdrop-blur-sm">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl">
            Welcome to StayAI
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Your AI-powered travel partner. Find the perfect hotel for your next adventure.
          </p>
        </div>

        <Tabs defaultValue="search" className="w-full mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">
              <Search className="mr-2 h-4 w-4" />
              Search Hotels
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Bot className="mr-2 h-4 w-4" />
              Plan with AI
            </TabsTrigger>
          </TabsList>
          <TabsContent value="search" className="mt-6">
            <HotelSearchForm />
          </TabsContent>
          <TabsContent value="ai" className="mt-6">
            <EmbeddedAiChat />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
