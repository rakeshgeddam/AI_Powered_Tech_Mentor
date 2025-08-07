import type { NextApiRequest, NextApiResponse } from 'next';
import { InferenceClient } from '@huggingface/inference'; // Use InferenceClient as suggested by deprecation

const HF_ACCESS_TOKEN = 'XXXXXXXXXXXXXXX' ; // || process.env.HF_API_TOKEN Ensure this environment variable is set
const hf = new InferenceClient(HF_ACCESS_TOKEN);

// System prompts for each role
const TEAM_LEAD_PROMPT = `You're a senior engineer reviewing code for readability. Identify 2-3 specific issues with explanations. Focus on:
- Code smells
- Readability
- Maintainability
- Complexity
Format as bullet points.`;

const MANAGER_PROMPT = `You're a technical manager reviewing code for scalability. Identify 2-3 specific issues regarding:
- Design patterns
- Scalability
- Concurrency
- Architecture
Format as bullet points.`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, language } = req.body;

  // Validate input
  if (!code || typeof code !== 'string' || code.length > 5000) {
    return res.status(400).json({ error: 'Invalid code input' });
  }

  try {
    // Generate both feedbacks in parallel
    const [teamLeadResponse, managerResponse] = await Promise.all([
      hf.textGeneration({
        model: 'codellama/CodeLlama-13b-hf',
        inputs: `[CODE]\n${code}\n\n[REVIEW]\n${TEAM_LEAD_PROMPT}`,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.2
        }
      }),
      hf.textGeneration({
        model: 'codellama/CodeLlama-13b-hf', // Model can be passed as the first argument to textGeneration
        inputs: `[CODE]\n${code}\n\n[REVIEW]\n${MANAGER_PROMPT}`,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.2
        }
      })
    ]);

    res.status(200).json({
      teamLeadFeedback: cleanResponse(teamLeadResponse.generated_text),
      managerFeedback: cleanResponse(managerResponse.generated_text)
    });
  } catch (error) {
    console.error('Hugging Face error:', error);
    res.status(500).json({ error: 'Analysis service unavailable' });
  }
}

// Helper to clean LLM output
function cleanResponse(text: string): string {
  return text
    .replace(/<\/?s>/g, '') // Remove special tokens
    .replace(/(\n\s*){2,}/g, '\n\n') // Reduce excessive newlines
    .trim();
}
