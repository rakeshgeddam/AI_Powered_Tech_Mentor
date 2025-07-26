'use server';

/**
 * @fileOverview A personalized study guide generation AI agent.
 *
 * - generatePersonalizedStudyGuide - A function that generates a personalized study guide.
 * - GeneratePersonalizedStudyGuideInput - The input type for the generatePersonalizedStudyGuide function.
 * - GeneratePersonalizedStudyGuideOutput - The return type for the generatePersonalizedStudyGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedStudyGuideInputSchema = z.object({
  knowledgeGraph: z
    .string()
    .describe('The user current knowledge graph as a string.'),
  goals: z.string().describe('The user learning goals.'),
  assessmentPerformance: z.string().describe('The user cognitive assessment performance data.'),
});
export type GeneratePersonalizedStudyGuideInput = z.infer<
  typeof GeneratePersonalizedStudyGuideInputSchema
>;

const GeneratePersonalizedStudyGuideOutputSchema = z.object({
  studyGuide: z.string().describe('The generated personalized study guide.'),
});
export type GeneratePersonalizedStudyGuideOutput = z.infer<
  typeof GeneratePersonalizedStudyGuideOutputSchema
>;

export async function generatePersonalizedStudyGuide(
  input: GeneratePersonalizedStudyGuideInput
): Promise<GeneratePersonalizedStudyGuideOutput> {
  return generatePersonalizedStudyGuideFlow(input);
}

const generatePersonalizedStudyGuidePrompt = ai.definePrompt({
  name: 'generatePersonalizedStudyGuidePrompt',
  input: {schema: GeneratePersonalizedStudyGuideInputSchema},
  output: {schema: GeneratePersonalizedStudyGuideOutputSchema},
  prompt: `You are an AI learning assistant that specializes in creating personalized study guides.

  Based on the user's current knowledge graph, their goals, and their performance in cognitive assessments, generate a study guide that will help them focus their learning efforts efficiently.

  Knowledge Graph: {{{knowledgeGraph}}}
  Goals: {{{goals}}}
  Assessment Performance: {{{assessmentPerformance}}}

  Study Guide:`,
});

const generatePersonalizedStudyGuideFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedStudyGuideFlow',
    inputSchema: GeneratePersonalizedStudyGuideInputSchema,
    outputSchema: GeneratePersonalizedStudyGuideOutputSchema,
  },
  async input => {
    const {output} = await generatePersonalizedStudyGuidePrompt(input);
    return output!;
  }
);
