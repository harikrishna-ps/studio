// This is a server-side file.
'use server';

/**
 * @fileOverview This file defines a Genkit flow for answering user queries about hotel bookings.
 *
 * The flow uses a prompt to generate responses based on the user's question and available data.
 * @interface BookingQueryAnsweringInput - The input type for the booking query answering flow.
 * @interface BookingQueryAnsweringOutput - The output type for the booking query answering flow.
 * @function bookingQueryAnswering - The main function to answer booking queries.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BookingQueryAnsweringInputSchema = z.object({
  query: z.string().describe('The user query about the hotel booking.'),
  hotelDetails: z.string().optional().describe('Hotel details to answer user question'),
});
export type BookingQueryAnsweringInput = z.infer<
  typeof BookingQueryAnsweringInputSchema
>;

const BookingQueryAnsweringOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type BookingQueryAnsweringOutput = z.infer<
  typeof BookingQueryAnsweringOutputSchema
>;

export async function bookingQueryAnswering(
  input: BookingQueryAnsweringInput
): Promise<BookingQueryAnsweringOutput> {
  return bookingQueryAnsweringFlow(input);
}

const bookingQueryAnsweringPrompt = ai.definePrompt({
  name: 'bookingQueryAnsweringPrompt',
  input: {schema: BookingQueryAnsweringInputSchema},
  output: {schema: BookingQueryAnsweringOutputSchema},
  prompt: `You are a hotel booking assistant. Answer the following question about the hotel booking:

Question: {{{query}}}

Hotel Details: {{{hotelDetails}}}

Answer:`, 
});

const bookingQueryAnsweringFlow = ai.defineFlow(
  {
    name: 'bookingQueryAnsweringFlow',
    inputSchema: BookingQueryAnsweringInputSchema,
    outputSchema: BookingQueryAnsweringOutputSchema,
  },
  async input => {
    const {output} = await bookingQueryAnsweringPrompt(input);
    return output!;
  }
);
