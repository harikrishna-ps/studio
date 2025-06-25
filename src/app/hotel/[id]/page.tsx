import { hotels } from '@/lib/mock-data';
import type { Hotel } from '@/lib/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star, Wifi, ParkingCircle, Utensils, Droplets, Dumbbell, Wine } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import HotelSummary from '@/components/HotelSummary';

const amenityIcons: { [key: string]: React.ReactNode } = {
  Wifi: <Wifi className="h-5 w-5" />,
  Pool: <Droplets className="h-5 w-5" />,
  Spa: <Star className="h-5 w-5" />, // Placeholder
  Restaurant: <Utensils className="h-5 w-5" />,
  Gym: <Dumbbell className="h-5 w-5" />,
  Parking: <ParkingCircle className="h-5 w-5" />,
  'Pet Friendly': <Star className="h-5 w-5" />, // Placeholder
  Bar: <Wine className="h-5 w-5" />,
};

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  const hotel = hotels.find((h) => h.id === params.id);

  if (!hotel) {
    notFound();
  }
  
  const allReviewsText = hotel.reviews.map(r => r.comment).join('\n');

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4">
      <h1 className="text-4xl font-bold font-headline mb-2">{hotel.name}</h1>
      <div className="flex items-center gap-4 text-muted-foreground mb-6">
        <span>{hotel.city}</span>
        <div className="flex items-center gap-1">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          <span className="font-bold">{hotel.rating.toFixed(1)}</span>
          <span>({hotel.reviews.length} reviews)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="col-span-1">
          <Image
            src={hotel.images[0]}
            alt={`Main image of ${hotel.name}`}
            width={800}
            height={600}
            className="rounded-lg object-cover w-full h-full"
            data-ai-hint="hotel room"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {hotel.images.slice(1, 3).map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Image ${i + 2} of ${hotel.name}`}
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-full"
              data-ai-hint="hotel view"
            />
          ))}
           {hotel.images.length < 3 && <div className="bg-muted rounded-lg w-full h-full"></div>}
           {hotel.images.length < 2 && <div className="bg-muted rounded-lg w-full h-full"></div>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>About this hotel</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-foreground/80">{hotel.description}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {hotel.amenities.map(amenity => (
                        <div key={amenity} className="flex items-center gap-2">
                           {amenityIcons[amenity] || <Star className="h-5 w-5" />}
                           <span>{amenity}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <HotelSummary hotelName={hotel.name} reviews={allReviewsText} />
                    <Separator />
                   {hotel.reviews.map((review, index) => (
                       <div key={index}>
                           <div className="flex items-center gap-2">
                               <div className="font-semibold">{review.author}</div>
                               <div className="flex items-center">
                                   {Array.from({length: review.rating}).map((_, i) => (
                                       <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                   ))}
                               </div>
                           </div>
                           <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
                       </div>
                   ))}
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle className="text-2xl">
                         <span className="font-bold">${hotel.pricePerNight}</span>
                         <span className="text-base font-normal text-muted-foreground">/night</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Button size="lg" className="w-full text-lg" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
                        Book Now
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
