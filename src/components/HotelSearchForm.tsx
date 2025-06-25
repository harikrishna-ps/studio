'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { CalendarIcon, MapPin, Users, Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const formSchema = z.object({
  destination: z.string().min(2, {
    message: 'Destination must be at least 2 characters.',
  }),
  dates: z.object({
    from: z.date({
      required_error: 'A check-in date is required.',
    }),
    to: z.date({
      required_error: 'A check-out date is required.',
    }),
  }),
  guests: z.number().min(1, { message: 'Must have at least 1 guest.' }),
});

export default function HotelSearchForm() {
  const router = useRouter();
  const [guests, setGuests] = useState(2);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: '',
      guests: 2,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams();
    params.append('destination', values.destination);
    params.append('from', format(values.dates.from, 'yyyy-MM-dd'));
    params.append('to', format(values.dates.to, 'yyyy-MM-dd'));
    params.append('guests', String(values.guests));
    router.push(`/search?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-end"
      >
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <FormControl>
                <div className="relative">
                   <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                   <Input placeholder="e.g. Paris" {...field} className="pl-10" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dates"
          render={({ field }) => (
            <FormItem className="flex flex-col md:pt-[2px]">
              <FormLabel>Check-in - Check-out</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, 'LLL dd, y')} -{' '}
                            {format(field.value.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(field.value.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                    disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
               <FormLabel>Guests</FormLabel>
               <FormControl>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input type="number" {...field} className="pl-10 text-center" />
                   <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => field.onChange(Math.max(1, (field.value || 1) - 1))} >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => field.onChange((field.value || 0) + 1)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                   </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="h-10 text-base" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
          Search Hotels
        </Button>
      </form>
    </Form>
  );
}
