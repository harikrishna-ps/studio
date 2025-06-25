'use server';

/**
 * @fileOverview Provides a flow to summarize user reviews for a specific hotel.
 *
 * - hotelSummary - A function that handles the hotel summary process.
 * - HotelSummaryInput - The input type for the hotelSummary function.
 * - HotelSummaryOutput - The return type for the hotelSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HotelSummaryInputSchema = z.object({
  hotelName: z.string().describe('The name of the hotel to summarize reviews for.'),
  reviews: z.string().describe('User reviews for the hotel.'),
});
export type HotelSummaryInput = z.infer<typeof HotelSummaryInputSchema>;

const HotelSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the user reviews for the hotel.'),
});
export type HotelSummaryOutput = z.infer<typeof HotelSummaryOutputSchema>;

export async function hotelSummary(input: HotelSummaryInput): Promise<HotelSummaryOutput> {
  return hotelSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'hotelSummaryPrompt',
  input: {schema: HotelSummaryInputSchema},
  output: {schema: HotelSummaryOutputSchema},
  prompt: `You are a hotel review summarization expert.

  Summarize the following user reviews for the hotel "{{hotelName}}".
  Reviews: {{{reviews}}}
  `,
});

const hotelSummaryFlow = ai.defineFlow(
  {
    name: 'hotelSummaryFlow',
    inputSchema: HotelSummaryInputSchema,
    outputSchema: HotelSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
