export interface Hotel {
  id: string;
  name: string;
  city: string;
  location: {
    lat: number;
    lng: number;
  };
  images: string[];
  description: string;
  amenities: string[];
  pricePerNight: number;
  rating: number;
  reviews: {
    author: string;
    comment: string;
    rating: number;
  }[];
}
