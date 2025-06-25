'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { hotels } from '@/lib/mock-data';
import type { Hotel } from '@/lib/types';

import HotelList from '@/components/HotelList';
import FilterSort from '@/components/FilterSort';
import MapView from '@/components/MapView';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { List, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';

function SearchResults() {
  const searchParams = useSearchParams();
  const destination = searchParams.get('destination');

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 500,
    rating: 0,
    amenities: [] as string[],
  });
  const [sort, setSort] = useState('rating-desc');

  const filteredAndSortedHotels = useMemo(() => {
    let filtered = hotels.filter((hotel) => {
      const destinationMatch = destination
        ? hotel.city.toLowerCase().includes(destination.toLowerCase())
        : true;
      const priceMatch =
        hotel.pricePerNight >= filters.minPrice &&
        hotel.pricePerNight <= filters.maxPrice;
      const ratingMatch = hotel.rating >= filters.rating;
      const amenitiesMatch = filters.amenities.every((amenity) =>
        hotel.amenities.includes(amenity)
      );
      return destinationMatch && priceMatch && ratingMatch && amenitiesMatch;
    });

    return filtered.sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.pricePerNight - b.pricePerNight;
        case 'price-desc':
          return b.pricePerNight - a.pricePerNight;
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return b.rating - a.rating;
      }
    });
  }, [destination, filters, sort]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">
          {destination ? `Hotels in ${destination}` : 'Search Results'}
        </h1>
        <p className="text-muted-foreground">
          {filteredAndSortedHotels.length} hotels found
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="hidden lg:block">
           <FilterSort filters={filters} setFilters={setFilters} sort={sort} setSort={setSort} />
        </div>
        
        <div className="lg:col-span-3">
          <Tabs defaultValue="list" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="list"><List className="mr-2 h-4 w-4" />List View</TabsTrigger>
                <TabsTrigger value="map"><Map className="mr-2 h-4 w-4" />Map View</TabsTrigger>
              </TabsList>
              <div className="lg:hidden">
                 <Sheet>
                   <SheetTrigger asChild>
                     <Button variant="outline"><Filter className="mr-2 h-4 w-4" />Filter</Button>
                   </SheetTrigger>
                   <SheetContent>
                     <FilterSort filters={filters} setFilters={setFilters} sort={sort} setSort={setSort} />
                   </SheetContent>
                 </Sheet>
              </div>
            </div>
            <TabsContent value="list">
              {filteredAndSortedHotels.length > 0 ? (
                <HotelList hotels={filteredAndSortedHotels} />
              ) : (
                <div className="text-center py-16 border rounded-lg">
                  <h2 className="text-xl font-semibold">No hotels found</h2>
                  <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="map">
              <MapView hotels={filteredAndSortedHotels} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
