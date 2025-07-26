'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { analyzeCodeAction } from './actions';
import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FlaskConical, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'c++', label: 'C++' },
  { value: 'go', label: 'Go' },
];

const initialState = {
  analysis: undefined,
  suggestions: undefined,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <FlaskConical className="mr-2 h-4 w-4" />
      )}
      Analyze Code
    </Button>
  );
}

export default function CodeAnalyzerPage() {
  const [state, formAction] = useFormState(analyzeCodeAction, initialState);

  return (
    <div className="space-y-8">
      <PageHeader
        title="AI Code Analyzer"
        description="Get instant feedback on code quality, efficiency, and potential issues."
      />

      <form
        action={formAction}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
      >
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Your Code</CardTitle>
              <CardDescription>
                Paste your code below and select the language.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select name="language" defaultValue="javascript">
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                name="code"
                placeholder="Paste your code snippet here..."
                className="font-mono h-[400px] min-h-[200px]"
                required
              />
            </CardContent>
          </Card>
          <SubmitButton />
        </div>

        <div className="space-y-4">
          {state.error && (
            <Alert variant="destructive">
              <AlertTitle>Analysis Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {!state.analysis && !state.error && (
            <Card className="flex flex-col items-center justify-center h-full min-h-[200px] border-dashed">
              <CardContent className="text-center text-muted-foreground p-6">
                <FlaskConical className="h-12 w-12 mx-auto mb-4" />
                <p>Your AI-powered analysis will appear here.</p>
              </CardContent>
            </Card>
          )}

          {state.analysis && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Code Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                  {state.analysis}
                </div>
              </CardContent>
            </Card>
          )}

          {state.suggestions && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">
                  Improvement Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                  {state.suggestions}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </form>
    </div>
  );
}
