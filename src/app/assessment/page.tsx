import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrainCircuit, MemoryStick, Target, Gauge } from 'lucide-react';

const assessments = [
  {
    title: 'Pattern Recognition',
    description:
      'Assess your ability to identify underlying patterns and logical rules in abstract sequences.',
    icon: BrainCircuit,
    cta: 'Start Assessment',
  },
  {
    title: 'Memory Retention',
    description:
      'Test your short-term and long-term memory recall with a series of challenging exercises.',
    icon: MemoryStick,
    cta: 'Start Assessment',
  },
  {
    title: 'Focus Sustainability',
    description:
      'Measure your ability to maintain concentration on a single task over an extended period.',
    icon: Target,
    cta: 'Start Assessment',
  },
  {
    title: 'Information Processing Speed',
    description:
      'Evaluate how quickly you can perceive, understand, and respond to new information.',
    icon: Gauge,
    cta: 'Start Assessment',
  },
];

export default function AssessmentPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Cognitive Assessment"
        description="Sharpen your mind and identify your cognitive strengths and weaknesses."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {assessments.map((assessment) => (
          <Card key={assessment.title} className="flex flex-col">
            <CardHeader className="flex-grow">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <assessment.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="font-headline">
                    {assessment.title}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {assessment.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">{assessment.cta}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
