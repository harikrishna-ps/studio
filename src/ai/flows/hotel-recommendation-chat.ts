// This is an AI-powered chat flow that recommends hotels based on user preferences and allows booking.
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const bookHotelTool = ai.defineTool(
  {
    name: 'bookHotel',
    description: 'Books a hotel for the user when they have confirmed a choice.',
    inputSchema: z.object({
      hotelId: z.string().describe('The ID of the hotel to book.'),
      hotelName: z.string().describe('The name of the hotel to book.'),
    }),
    outputSchema: z.string().describe('A confirmation message for the booking.'),
  },
  async (input) => {
    // In a real app, this would interact with a booking service.
    console.log(`Booking hotel with ID: ${input.hotelId} named ${input.hotelName}`);
    return `Booking confirmed for ${input.hotelName}! Your confirmation number is FAKE12345.`;
  }
);

const HotelRecommendationChatInputSchema = z.object({
  history: z.array(z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({text: z.string()})),
  })).describe('The conversation history.'),
  hotelList: z.string().describe('A JSON string of available hotels to choose from.'),
});
export type HotelRecommendationChatInput = z.infer<typeof HotelRecommendationChatInputSchema>;

const HotelRecommendationChatOutputSchema = z.object({
  answer: z.string().describe("The chatbot's response."),
});
export type HotelRecommendationChatOutput = z.infer<typeof HotelRecommendationChatOutputSchema>;

export async function hotelRecommendationChat(input: HotelRecommendationChatInput): Promise<HotelRecommendationChatOutput> {
  return hotelRecommendationChatFlow(input);
}

const hotelRecommendationChatFlow = ai.defineFlow(
  {
    name: 'hotelRecommendationChatFlow',
    inputSchema: HotelRecommendationChatInputSchema,
    outputSchema: HotelRecommendationChatOutputSchema,
  },
  async ({ history, hotelList }) => {
    const systemPrompt = `You are a helpful hotel booking assistant named StayAI.
Your goal is to help the user find and book a hotel from the provided list.
Be friendly and conversational.
Analyze the user's request and the conversation history to provide relevant responses.
Use the provided hotel list to answer questions and make recommendations.
When you recommend a hotel, provide its name, price, and key amenities.
The user can see the full details by clicking on a hotel, so keep your descriptions concise.

To find hotels, you have been provided with a list of hotels in JSON format: ${hotelList}

When the user clearly states they want to book a specific hotel, use the 'bookHotel' tool to perform the booking.
You must extract the hotelId and hotelName from the hotel list to use the tool.
You must have the hotelId to use the tool. If you do not have it, ask the user for which hotel they are interested in.
Do not ask for information you can find in the hotel list.
After booking, confirm with the user.`;

    const currentHistory = [...history]; // Make a mutable copy
    const lastMessage = currentHistory.pop();

    if (!lastMessage || lastMessage.role !== 'user') {
        throw new Error('The last message in history must be from the user.');
    }

    const llmResponse = await ai.generate({
        tools: [bookHotelTool],
        system: systemPrompt,
        history: currentHistory, // History without the last message
        prompt: lastMessage.parts.map(p => p.text).join(' '), // The last message is the prompt
    });

    return {
      answer: llmResponse.text,
    };
  }
);
