import HotelCard from './HotelCard';
import type { Hotel } from '@/lib/types';

interface HotelListProps {
  hotels: Hotel[];
}

export default function HotelList({ hotels }: HotelListProps) {
  return (
    <div className="space-y-4">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}
