import HotelSearchForm from '@/components/HotelSearchForm';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden p-4">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Beautiful hotel lobby"
        layout="fill"
        objectFit="cover"
        className="-z-10 opacity-30"
        data-ai-hint="hotel lobby"
      />
      <div className="z-10 w-full max-w-4xl rounded-xl bg-card/80 p-8 text-center shadow-lg backdrop-blur-sm">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl">
          Welcome to StayAI
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Your AI-powered travel partner. Find the perfect hotel for your next adventure.
        </p>
        <div className="mt-8">
          <HotelSearchForm />
        </div>
      </div>
    </div>
  );
}
