import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import type { FC } from 'react';

const journeyNodes = [
  {
    id: 'html',
    title: 'HTML',
    progress: 100,
    status: 'completed',
  },
  { id: 'css', title: 'CSS', progress: 100, status: 'completed' },
  {
    id: 'js',
    title: 'JavaScript',
    progress: 90,
    status: 'in-progress',
  },
  {
    id: 'react',
    title: 'React',
    progress: 75,
    status: 'in-progress',
  },
  {
    id: 'node',
    title: 'Node.js',
    progress: 60,
    status: 'in-progress',
  },
  { id: 'db', title: 'Databases', progress: 20, status: 'todo' },
  {
    id: 'sys-design',
    title: 'System Design',
    progress: 0,
    status: 'todo',
  },
];

const NodeStatusIcon: FC<{ status: string }> = ({ status }) => {
  if (status === 'completed')
    return <CheckCircle2 className="h-5 w-5 text-green-500" />;
  if (status === 'in-progress')
    return <Clock className="h-5 w-5 text-blue-500" />;
  return <Circle className="h-5 w-5 text-muted-foreground/50" />;
};

const JourneyNode: FC<(typeof journeyNodes)[0]> = ({
  title,
  progress,
  status,
}) => (
  <Card className="w-full hover:shadow-lg transition-shadow duration-300">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="font-headline">{title}</CardTitle>
        <NodeStatusIcon status={status} />
      </div>
    </CardHeader>
    <CardContent>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-muted-foreground mt-2">{progress}% mastered</p>
    </CardContent>
  </Card>
);

export default function JourneyPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Your Learning Journey"
        description="Visualize your progress through the Full-Stack Development knowledge graph."
      />
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {journeyNodes.map((node) => (
            <JourneyNode key={node.id} {...node} />
          ))}
        </div>
      </div>
    </div>
  );
}
