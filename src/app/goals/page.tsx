import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Layers, Network, Binary } from 'lucide-react';

const goals = [
  {
    title: 'Software Engineer Interview Prep',
    description:
      'Master data structures, algorithms, and system design concepts for top-tier interviews.',
    icon: Briefcase,
  },
  {
    title: 'Full-Stack Development Mastery',
    description:
      'Become proficient in both front-end and back-end technologies, from UI to databases.',
    icon: Layers,
  },
  {
    title: 'System Design Expertise',
    description:
      'Learn to design scalable, reliable, and maintainable large-scale distributed systems.',
    icon: Network,
  },
  {
    title: 'Algorithm Proficiency',
    description:
      'Deepen your understanding of core algorithms and their practical applications.',
    icon: Binary,
  },
];

export default function GoalsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Goal Setting"
        description="Define your learning objectives to generate a personalized path to success."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {goals.map((goal) => (
          <Card key={goal.title} className="flex flex-col">
            <CardHeader className="flex-1">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <goal.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline">{goal.title}</CardTitle>
              </div>
              <CardDescription className="mt-4">
                {goal.description}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Set as Goal
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
