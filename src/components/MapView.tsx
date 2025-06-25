import Image from 'next/image';
import { MapPin } from 'lucide-react';
import type { Hotel } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MapViewProps {
  hotels: Hotel[];
}

export default function MapView({ hotels }: MapViewProps) {
  // These are mock positions for the demo.
  const pinPositions = [
    { top: '25%', left: '30%' },
    { top: '40%', left: '60%' },
    { top: '65%', left: '20%' },
    { top: '50%', left: '80%' },
    { top: '35%', left: '45%' },
  ];

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-lg border">
       <Image
          src="https://placehold.co/1200x800.png"
          alt="Map of a city"
          fill
          className="object-cover opacity-50"
          data-ai-hint="city map"
       />
       <p className="absolute top-4 left-4 bg-background/80 p-2 rounded-md text-sm text-muted-foreground">Map view is for demonstration purposes.</p>
      <TooltipProvider>
        {hotels.slice(0, pinPositions.length).map((hotel, index) => (
          <Tooltip key={hotel.id}>
            <TooltipTrigger asChild>
              <div
                className="absolute -translate-x-1/2 -translate-y-full transform cursor-pointer"
                style={pinPositions[index]}
              >
                <MapPin className="h-10 w-10 text-primary fill-primary/30" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">{hotel.name}</p>
              <p>${hotel.pricePerNight}/night - {hotel.rating} ★</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
