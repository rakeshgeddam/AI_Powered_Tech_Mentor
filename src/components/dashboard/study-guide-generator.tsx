'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generatePersonalizedStudyGuideAction } from '@/app/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState = {
  studyGuide: undefined,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Wand2 className="mr-2 h-4 w-4" />
      )}
      Generate Guide
    </Button>
  );
}

export function StudyGuideGenerator() {
  const [state, formAction] = useFormState(
    generatePersonalizedStudyGuideAction,
    initialState
  );

  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <CardTitle>AI Study Guide Generator</CardTitle>
          <CardDescription>
            Let our AI create a personalized study guide based on your
            knowledge, goals, and performance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="knowledgeGraph">Knowledge Graph</Label>
            <Textarea
              placeholder="Describe your current knowledge. e.g., 'Proficient in Python, intermediate in JavaScript, beginner in databases.'"
              id="knowledgeGraph"
              name="knowledgeGraph"
              required
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="goals">Learning Goals</Label>
            <Textarea
              placeholder="What do you want to achieve? e.g., 'Prepare for a senior software engineer interview.'"
              id="goals"
              name="goals"
              required
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="assessmentPerformance">
              Assessment Performance
            </Label>
            <Textarea
              placeholder="Summarize your recent assessment results. e.g., 'Strong in pattern recognition, but weak in memory retention.'"
              id="assessmentPerformance"
              name="assessmentPerformance"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>

      {(state?.error || state?.studyGuide) && (
        <CardContent className="pt-4">
          {state.error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {state.studyGuide && (
            <Alert>
              <AlertTitle>Your Personalized Study Guide</AlertTitle>
              <AlertDescription>
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                  {state.studyGuide}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      )}
    </Card>
  );
}
