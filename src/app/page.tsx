import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowRight,
  BrainCircuit,
  Code,
  FlaskConical,
  GitGraph,
  Target,
} from 'lucide-react';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';

// This is a placeholder. In a real app, you'd fetch this from your backend.
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

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  cta: string;
}

const FeatureCard: FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  href,
  cta,
}) => (
  <Card className="flex flex-col">
    <CardHeader className="flex-row items-center gap-4">
      <div className="bg-primary/10 p-3 rounded-lg">{icon}</div>
      <CardTitle className="font-headline">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <CardDescription>{description}</CardDescription>
    </CardContent>
    <CardFooter>
      <Button asChild className="w-full">
        <Link href={href}>
          {cta} <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

const features: Omit<FeatureCardProps, 'icon'>[] = [
  {
    title: 'Personalized Learning Journey',
    description:
      'Visualize your progress and navigate through a customized knowledge graph tailored to your learning goals, from fundamentals to advanced topics.',
    href: '/journey',
    cta: 'View Your Journey',
  },
  {
    title: 'Interactive Code Editor',
    description:
      'Sharpen your coding skills by solving a wide range of algorithmic challenges in a feature-rich, interactive development environment.',
    href: '/code-editor',
    cta: 'Start Coding',
  },
  {
    title: 'AI-Powered Code Analyzer',
    description:
      'Receive instant, intelligent feedback on your low-level design solutions. Improve code quality, efficiency, and architectural patterns.',
    href: '/code-analyzer',
    cta: 'Analyze Code',
  },
  {
    title: 'Comprehensive Question Banks',
    description:
      'Access an extensive library of coding problems and low-level design scenarios, filterable by topic and difficulty to match your skill level.',
    href: '/coding-questions',
    cta: 'Browse Questions',
  },
  {
    title: 'Goal Setting & Tracking',
    description:
      'Define your career ambitions, from interview prep to full-stack mastery. Let AdaptiveLearn create a personalized roadmap for your success.',
    href: '/overview',
    cta: 'Set Your Goals',
  },
  {
    title: 'Cognitive Assessments',
    description:
      'Identify your cognitive strengths and weaknesses through a series of targeted assessments designed to help you learn more effectively.',
    href: '/overview',
    cta: 'Take an Assessment',
  },
];

const icons = [
  <GitGraph key="journey" className="h-6 w-6 text-primary" />,
  <Code key="editor" className="h-6 w-6 text-primary" />,
  <FlaskConical key="analyzer" className="h-6 w-6 text-primary" />,
  <BrainCircuit key="questions" className="h-6 w-6 text-primary" />,
  <Target key="goals" className="h-6 w-6 text-primary" />,
  <BrainCircuit key="assessments" className="h-6 w-6 text-primary" />,
];

export default function LandingPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Welcome to AdaptiveLearn"
        description="Your all-in-one platform for mastering software engineering skills, from algorithms to system design."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Coding Questions</CardTitle>
            <CardDescription>
              Sharpen your algorithm and data structure skills.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {codingQuestions.map((q) => (
                <li key={q}>
                  <Link
                    href={`/code-editor?question=${encodeURIComponent(q)}`}
                    className="flex items-center text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted/50"
                  >
                    <ArrowRight className="mr-2 h-4 w-4 text-primary/70" />
                    {q}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/coding-questions">View All Coding Questions</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top LLD Questions</CardTitle>
            <CardDescription>
              Practice your low-level system design knowledge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {lldQuestions.map((q) => (
                <li key={q}>
                  <Link
                    href={`/code-analyzer?question=${encodeURIComponent(q)}`}
                    className="flex items-center text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted/50"
                  >
                    <ArrowRight className="mr-2 h-4 w-4 text-primary/70" />
                    {q}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/lld-questions">View All LLD Questions</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <section>
        <h2 className="text-2xl font-bold font-headline mb-6 text-center">
          Explore Our Features
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              icon={icons[index]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
