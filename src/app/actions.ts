'use server';

import { generatePersonalizedStudyGuide } from '@/ai/flows/generate-study-guide';
import { z } from 'zod';

const formSchema = z.object({
  knowledgeGraph: z
    .string()
    .min(10, { message: 'Please provide more detail about your knowledge.' }),
  goals: z.string().min(10, { message: 'Please provide more detail about your goals.' }),
  assessmentPerformance: z
    .string()
    .min(10, {
      message: 'Please provide more detail about your assessment performance.',
    }),
});

interface StudyGuideState {
  studyGuide?: string;
  error?: string;
}

export async function generatePersonalizedStudyGuideAction(
  prevState: StudyGuideState,
  formData: FormData
): Promise<StudyGuideState> {
  const validatedFields = formSchema.safeParse({
    knowledgeGraph: formData.get('knowledgeGraph'),
    goals: formData.get('goals'),
    assessmentPerformance: formData.get('assessmentPerformance'),
  });

  if (!validatedFields.success) {
    const errorMessages = Object.values(
      validatedFields.error.flatten().fieldErrors
    )
      .map((errors) => errors?.join(', '))
      .filter(Boolean)
      .join(' ');
    return {
      error: errorMessages || 'Invalid input provided.',
    };
  }

  try {
    const result = await generatePersonalizedStudyGuide(validatedFields.data);
    return { studyGuide: result.studyGuide, error: '' };
  } catch (error) {
    console.error(error);
    return {
      error:
        'Failed to generate study guide. The AI model might be temporarily unavailable. Please try again later.',
    };
  }
}
