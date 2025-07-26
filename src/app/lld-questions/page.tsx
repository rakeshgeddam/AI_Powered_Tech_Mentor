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
const allLldQuestions = [
  'Design a Parking Lot',
  'Design a Vending Machine',
  'Design a Library Management System',
  'Design a Chess Game',
  'Design a URL Shortener',
  'Design a Traffic Control System',
  'Design a Movie Ticket Booking System',
  'Design an ATM',
  'Design a Splitwise/Expense-Sharing App',
  'Design a Ride-Sharing App (like Uber)',
];

export default function AllLldQuestionsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="All Low-Level Design Questions"
        description="Browse all available LLD scenarios."
      />
      <Card>
        <CardHeader>
          <CardTitle>LLD Scenarios</CardTitle>
          <CardDescription>
            Select a scenario to start analyzing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allLldQuestions.map((q) => (
              <li key={q}>
                <Link
                  href={`/code-analyzer?question=${encodeURIComponent(q)}`}
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
