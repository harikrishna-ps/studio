'use client';

import { useState } from 'react';
import { hotelSummary } from '@/ai/flows/hotel-summary';
import { Button } from './ui/button';
import { LoaderCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HotelSummaryProps {
  hotelName: string;
  reviews: string;
}

export default function HotelSummary({ hotelName, reviews }: HotelSummaryProps) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsLoading(true);
    try {
      const result = await hotelSummary({ hotelName, reviews });
      setSummary(result.summary);
    } catch (error) {
      console.error('Failed to get summary:', error);
      toast({
        variant: 'destructive',
        title: 'Summarization Failed',
        description: 'Could not generate AI summary. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (summary) {
    return (
        <div className="p-4 bg-secondary/50 rounded-lg">
            <h4 className="font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> AI Summary</h4>
            <p className="text-sm text-secondary-foreground/80 mt-2">{summary}</p>
        </div>
    );
  }

  return (
    <Button onClick={handleSummarize} disabled={isLoading} variant="outline" className="w-full">
      {isLoading ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Generating Summary...
        </>
      ) : (
        <>
         <Sparkles className="mr-2 h-4 w-4" />
          Summarize Reviews with AI
        </>
      )}
    </Button>
  );
}
