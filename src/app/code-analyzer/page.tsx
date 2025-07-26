'use client';

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
import { FlaskConical } from 'lucide-react';

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'c++', label: 'C++' },
  { value: 'go', label: 'Go' },
];

export default function CodeAnalyzerPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="AI Code Analyzer"
        description="Get instant feedback on code quality, efficiency, and potential issues."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
          <Button disabled className="w-full">
            <FlaskConical className="mr-2 h-4 w-4" />
            Analyze Code
          </Button>
        </div>

        <div className="space-y-4">
          <Card className="flex flex-col items-center justify-center h-full min-h-[200px] border-dashed">
            <CardContent className="text-center text-muted-foreground p-6">
              <FlaskConical className="h-12 w-12 mx-auto mb-4" />
              <p>Your AI-powered analysis will appear here.</p>
              <p className="text-sm">
                You can now integrate your own Hugging Face API logic.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
