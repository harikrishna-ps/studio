// This is an AI-powered chat flow that recommends hotels based on user preferences.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HotelRecommendationChatInputSchema = z.object({
  userInput: z.string().describe('The user input query for hotel recommendations.'),
});
export type HotelRecommendationChatInput = z.infer<typeof HotelRecommendationChatInputSchema>;

const HotelRecommendationChatOutputSchema = z.object({
  hotelRecommendations: z
    .string()
    .describe('A list of recommended hotels based on user preferences.'),
});
export type HotelRecommendationChatOutput = z.infer<typeof HotelRecommendationChatOutputSchema>;

export async function hotelRecommendationChat(input: HotelRecommendationChatInput): Promise<HotelRecommendationChatOutput> {
  return hotelRecommendationChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'hotelRecommendationChatPrompt',
  input: {schema: HotelRecommendationChatInputSchema},
  output: {schema: HotelRecommendationChatOutputSchema},
  prompt: `You are a hotel recommendation chatbot. A user is asking for hotel recommendations.

  Based on the user's preferences, provide a list of hotels that match their criteria.

  User input: {{{userInput}}}
  Hotels: `,
});

const hotelRecommendationChatFlow = ai.defineFlow(
  {
    name: 'hotelRecommendationChatFlow',
    inputSchema: HotelRecommendationChatInputSchema,
    outputSchema: HotelRecommendationChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
