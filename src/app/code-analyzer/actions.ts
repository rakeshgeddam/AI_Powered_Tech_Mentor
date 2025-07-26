'use server';

import { analyzeCodeQuality } from '@/ai/flows/analyze-code-quality';
import { z } from 'zod';

const formSchema = z.object({
  code: z
    .string()
    .min(20, { message: 'Please provide a meaningful code snippet to analyze.' }),
  language: z.string(),
});

interface AnalyzeCodeState {
  analysis?: string;
  suggestions?: string;
  error?: string;
}

export async function analyzeCodeAction(
  prevState: AnalyzeCodeState,
  formData: FormData
): Promise<AnalyzeCodeState> {
  const validatedFields = formSchema.safeParse({
    code: formData.get('code'),
    language: formData.get('language'),
  });

  if (!validatedFields.success) {
    const errorMessage =
      validatedFields.error.flatten().fieldErrors.code?.[0] || 'Invalid input.';
    return {
      error: errorMessage,
    };
  }

  try {
    const result = await analyzeCodeQuality(validatedFields.data);
    return {
      analysis: result.analysis,
      suggestions: result.suggestions,
      error: '',
    };
  } catch (error) {
    console.error(error);
    return {
      error:
        'Failed to analyze code. The model may be unavailable. Please try again later.',
    };
  }
}
