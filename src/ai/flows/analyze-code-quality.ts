'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing code quality and providing suggestions for improvement.
 *
 * - analyzeCodeQuality - A function that takes code as input and returns code quality analysis and suggestions.
 * - AnalyzeCodeQualityInput - The input type for the analyzeCodeQuality function.
 * - AnalyzeCodeQualityOutput - The return type for the analyzeCodeQuality function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCodeQualityInputSchema = z.object({
  code: z.string().describe('The code to be analyzed.'),
  language: z.string().describe('The programming language of the code.'),
});
export type AnalyzeCodeQualityInput = z.infer<typeof AnalyzeCodeQualityInputSchema>;

const AnalyzeCodeQualityOutputSchema = z.object({
  analysis: z.string().describe('The code quality analysis.'),
  suggestions: z.string().describe('Suggestions for improving the code.'),
});
export type AnalyzeCodeQualityOutput = z.infer<typeof AnalyzeCodeQualityOutputSchema>;

export async function analyzeCodeQuality(input: AnalyzeCodeQualityInput): Promise<AnalyzeCodeQualityOutput> {
  return analyzeCodeQualityFlow(input);
}

const analyzeCodeQualityPrompt = ai.definePrompt({
  name: 'analyzeCodeQualityPrompt',
  input: {schema: AnalyzeCodeQualityInputSchema},
  output: {schema: AnalyzeCodeQualityOutputSchema},
  prompt: `You are a code quality analysis expert.

You will be provided with code and the programming language it is written in. You will analyze the code for potential issues, such as code smells, inefficiencies, and security vulnerabilities. You will then provide suggestions for improving the code's quality, efficiency, and security.

Language: {{{language}}}
Code: {{{code}}}

Analysis and Suggestions:
`, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const analyzeCodeQualityFlow = ai.defineFlow(
  {
    name: 'analyzeCodeQualityFlow',
    inputSchema: AnalyzeCodeQualityInputSchema,
    outputSchema: AnalyzeCodeQualityOutputSchema,
  },
  async input => {
    const {output} = await analyzeCodeQualityPrompt(input);
    return output!;
  }
);
