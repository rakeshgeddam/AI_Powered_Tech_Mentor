import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// This is a placeholder. In a real app, you'd fetch this from your backend.
const allCodingQuestions = [
  'Two Sum',
  'Reverse a Linked List',
  'Valid Palindrome',
  'Binary Tree Inorder Traversal',
  'Kth Smallest Element in a BST',
  'Merge Two Sorted Lists',
  'Valid Anagram',
  'Lowest Common Ancestor of a Binary Tree',
  'Product of Array Except Self',
  'Container With Most Water',
  'Top K Frequent Elements',
  'Group Anagrams',
];

export default function AllCodingQuestionsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="All Coding Questions"
        description="Browse all available coding challenges."
      />
      <Card>
        <CardHeader>
          <CardTitle>Coding Challenges</CardTitle>
          <CardDescription>
            Select a problem to start solving.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCodingQuestions.map((q) => (
              <li key={q}>
                <Link
                  href={`/code-editor?question=${encodeURIComponent(q)}`}
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted/50"
                >
                  <ArrowRight className="mr-2 h-4 w-4 text-primary/70 flex-shrink-0" />
                  <span className="flex-grow">{q}</span>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
