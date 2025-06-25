import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, ChevronRight } from 'lucide-react';
import type { Hotel } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image
            src={hotel.images[0]}
            alt={`Image of ${hotel.name}`}
            width={300}
            height={300}
            className="h-48 w-full object-cover md:h-full md:w-48"
            data-ai-hint="hotel exterior"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <CardHeader>
            <CardTitle className="text-xl font-bold font-headline">
              <Link href={`/hotel/${hotel.id}`} className="hover:underline">
                {hotel.name}
              </Link>
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              {hotel.city}
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
             <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                    key={i}
                    className={`h-5 w-5 ${
                        i < Math.round(hotel.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                    />
                ))}
                <span className="text-sm font-medium text-muted-foreground ml-2">{hotel.rating.toFixed(1)}</span>
            </div>
            <p className="mt-2 text-sm text-foreground/80 line-clamp-2">{hotel.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-primary">
                ${hotel.pricePerNight}
              </span>
              <span className="text-sm text-muted-foreground">/night</span>
            </div>
            <Button asChild style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
              <Link href={`/hotel/${hotel.id}`}>
                View Details <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
