import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from './ui/separator';

interface FilterSortProps {
  filters: {
    minPrice: number;
    maxPrice: number;
    rating: number;
    amenities: string[];
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}

const allAmenities = ['Wifi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Parking', 'Pet Friendly', 'Bar'];
const ratings = [
    { value: 4, label: '4+ stars' },
    { value: 3, label: '3+ stars' },
    { value: 2, label: '2+ stars' },
    { value: 1, label: 'Any' },
]

export default function FilterSort({
  filters,
  setFilters,
  sort,
  setSort,
}: FilterSortProps) {
  const handlePriceChange = (value: number[]) => {
    setFilters((prev: any) => ({ ...prev, minPrice: value[0], maxPrice: value[1] }));
  };

  const handleRatingChange = (value: number) => {
    setFilters((prev: any) => ({ ...prev, rating: value }));
  };
  
  const handleAmenityChange = (amenity: string, checked: boolean | 'indeterminate') => {
    setFilters((prev: any) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter((a: string) => a !== amenity),
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter & Sort</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="sort-by" className='mb-2 block'>Sort by</Label>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger id="sort-by">
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating-desc">Rating (High to Low)</SelectItem>
              <SelectItem value="price-asc">Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Price (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div>
          <Label className='mb-2 block'>Price Range</Label>
          <Slider
            min={0}
            max={500}
            step={10}
            value={[filters.minPrice, filters.maxPrice]}
            onValueChange={handlePriceChange}
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${filters.minPrice}</span>
            <span>${filters.maxPrice}</span>
          </div>
        </div>

        <Separator />
        
        <div>
          <Label className='mb-2 block'>Star Rating</Label>
          <div className="flex flex-wrap gap-2">
            {ratings.map((r) => (
                <Button key={r.value} variant={filters.rating === r.value ? "default": "outline"} size="sm" onClick={() => handleRatingChange(r.value)}>
                    {r.label}
                </Button>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label className='mb-4 block'>Amenities</Label>
          <div className="space-y-2">
            {allAmenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={filters.amenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked)}
                />
                <Label htmlFor={amenity} className="font-normal">{amenity}</Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Dummy button to avoid error
function Button(props: any) {
    return <button {...props} className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        props.variant === 'default' ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        "h-9 px-3"
    )} />
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
