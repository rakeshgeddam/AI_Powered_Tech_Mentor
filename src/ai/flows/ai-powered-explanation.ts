// Implements the Genkit flow for the getAiPoweredExplanation story.

'use server';

/**
 * @fileOverview An AI-powered explanation agent for code.
 *
 * - getAiPoweredExplanation - A function that handles the code explanation process.
 * - AiPoweredExplanationInput - The input type for the getAiPoweredExplanation function.
 * - AiPoweredExplanationOutput - The return type for the getAiPoweredExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPoweredExplanationInputSchema = z.object({
  code: z
    .string()
    .describe('The code to be explained.'),
});
export type AiPoweredExplanationInput = z.infer<typeof AiPoweredExplanationInputSchema>;

const AiPoweredExplanationOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the code.'),
});
export type AiPoweredExplanationOutput = z.infer<typeof AiPoweredExplanationOutputSchema>;

export async function getAiPoweredExplanation(input: AiPoweredExplanationInput): Promise<AiPoweredExplanationOutput> {
  return aiPoweredExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredExplanationPrompt',
  input: {schema: AiPoweredExplanationInputSchema},
  output: {schema: AiPoweredExplanationOutputSchema},
  prompt: `You are an expert software engineer. Explain the following code in detail:\n\n{{code}}`,
});

const aiPoweredExplanationFlow = ai.defineFlow(
  {
    name: 'aiPoweredExplanationFlow',
    inputSchema: AiPoweredExplanationInputSchema,
    outputSchema: AiPoweredExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
