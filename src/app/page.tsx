import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const codingQuestions = [
  'Two Sum',
  'Reverse a Linked List',
  'Valid Palindrome',
  'Binary Tree Inorder Traversal',
  'Kth Smallest Element in a BST',
];

const lldQuestions = [
  'Design a Parking Lot',
  'Design a Vending Machine',
  'Design a Library Management System',
  'Design a Chess Game',
  'Design a URL Shortener',
];

export default function LandingPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Welcome to AdaptiveLearn"
        description="Your personalized learning platform for mastering coding and system design."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-headline">
            Practice Problems
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Coding Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {codingQuestions.map((q) => (
                  <li key={q}>
                    <Link
                      href={`/code-editor?question=${encodeURIComponent(q)}`}
                      className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ArrowRight className="mr-2 h-4 w-4 text-primary/70" />
                      <span>{q}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Low-Level Design (LLD)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lldQuestions.map((q) => (
                  <li key={q}>
                    <Link
                      href={`/code-analyzer?question=${encodeURIComponent(q)}`}
                      className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ArrowRight className="mr-2 h-4 w-4 text-primary/70" />
                      <span>{q}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-headline">Get Started</h2>
          <Card className="flex flex-col items-center justify-center p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Code Editor</h3>
            <p className="mb-4 text-muted-foreground">
              Solve challenges and hone your coding skills in our interactive
              environment.
            </p>
            <Button asChild>
              <Link href="/code-editor">
                Go to Editor <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </Card>
          <Card className="flex flex-col items-center justify-center p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Code Analyzer</h3>
            <p className="mb-4 text-muted-foreground">
              Get instant feedback on code quality, efficiency, and potential
              issues.
            </p>
            <Button asChild>
              <Link href="/code-analyzer">
                Go to Analyzer <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
