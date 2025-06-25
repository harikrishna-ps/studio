import type { Hotel } from './types';

export const hotels: Hotel[] = [
  {
    id: '1',
    name: 'The Azure Palace',
    city: 'Paris',
    location: { lat: 48.8566, lng: 2.3522 },
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    description:
      'Experience Parisian luxury at its finest. The Azure Palace offers stunning views of the Eiffel Tower and world-class service.',
    amenities: ['Wifi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Parking'],
    pricePerNight: 450,
    rating: 4.8,
    reviews: [
      { author: 'Jane Doe', rating: 5, comment: 'Absolutely breathtaking! The service was impeccable.' },
      { author: 'John Smith', rating: 4, comment: 'Great location and beautiful rooms, but the restaurant was a bit pricey.' },
    ],
  },
  {
    id: '2',
    name: 'Metropolis Grand',
    city: 'New York',
    location: { lat: 40.7128, lng: -74.0060 },
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    description:
      'Located in the heart of Manhattan, Metropolis Grand is the perfect hub for your Big Apple adventure. Modern amenities and spacious rooms await.',
    amenities: ['Wifi', 'Gym', 'Bar', 'Pet Friendly'],
    pricePerNight: 320,
    rating: 4.5,
    reviews: [
      { author: 'Emily White', rating: 5, comment: 'Perfect location for exploring the city. The room was clean and modern.' },
    ],
  },
  {
    id: '3',
    name: 'Sakura Ryokan',
    city: 'Tokyo',
    location: { lat: 35.6895, lng: 139.6917 },
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    description:
      'A blend of traditional Japanese hospitality and modern comfort. Sakura Ryokan offers a peaceful retreat from the bustling city.',
    amenities: ['Wifi', 'Spa', 'Onsen', 'Restaurant'],
    pricePerNight: 280,
    rating: 4.9,
    reviews: [
      { author: 'Ken Watanabe', rating: 5, comment: 'An authentic and unforgettable experience. The onsen was fantastic.' },
    ],
  },
  {
    id: '4',
    name: 'The Londoner',
    city: 'London',
    location: { lat: 51.5074, lng: -0.1278 },
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    description:
      'Chic and sophisticated, The Londoner is situated in the vibrant West End, moments away from theatres, shopping, and dining.',
    amenities: ['Wifi', 'Bar', 'Restaurant', 'Room Service'],
    pricePerNight: 400,
    rating: 4.6,
    reviews: [
      { author: 'David Beckham', rating: 5, comment: 'Smashing hotel, brilliant staff!' },
    ],
  },
    {
    id: '5',
    name: 'The Grand Parisian',
    city: 'Paris',
    location: { lat: 48.86, lng: 2.33 },
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    description:
      'Classic Parisian elegance with a modern twist. Enjoy the charm of Paris from our centrally located hotel.',
    amenities: ['Wifi', 'Restaurant', 'Bar', 'Pet Friendly'],
    pricePerNight: 380,
    rating: 4.7,
    reviews: [
      { author: 'Sophie Marceau', rating: 5, comment: 'Très magnifique! I felt like royalty.' },
    ],
  },
];
