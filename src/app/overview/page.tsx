import { PageHeader } from '@/components/layout/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Activity,
  Binary,
  BrainCircuit,
  Briefcase,
  Gauge,
  Layers,
  MemoryStick,
  Network,
  Target,
} from 'lucide-react';

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

export default function OverviewPage() {
  return (
    <div className="space-y-12">
      {/* Dashboard Section */}
      <section>
        <PageHeader
          title="Dashboard"
          description="Welcome back! Here's your personalized learning overview."
        />
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Goal</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">
                Full-Stack Mastery
              </div>
              <p className="text-xs text-muted-foreground">75% complete</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Time Spent This Week
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">8h 45m</div>
              <p className="text-xs text-muted-foreground">
                +12% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cognitive Score
              </CardTitle>
              <BrainCircuit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">8.2 / 10</div>
              <p className="text-xs text-muted-foreground">
                Focus Sustainability: 9.1
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Goals Section */}
      <section>
        <PageHeader
          title="Goal Setting"
          description="Define your learning objectives to generate a personalized path to success."
        />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
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
      </section>

      {/* Assessment Section */}
      <section>
        <PageHeader
          title="Cognitive Assessment"
          description="Sharpen your mind and identify your cognitive strengths and weaknesses."
        />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
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
      </section>
    </div>
  );
}
