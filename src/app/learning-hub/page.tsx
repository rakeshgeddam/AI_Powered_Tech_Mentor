'use client';

import { PageHeader } from '@/components/layout/page-header';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Placeholder data for prerequisites
const prerequisites = [
  {
    topic: 'Data Structures',
    confidence: 80,
    subTopics: ['Arrays', 'Linked Lists', 'Trees'],
  },
  {
    topic: 'Big O Notation',
    confidence: 95,
    subTopics: ['Time Complexity', 'Space Complexity'],
  },
  {
    topic: 'Recursion',
    confidence: 70,
    subTopics: ['Base Cases', 'Recursive Step'],
  },
];

export default function LearningHubPage() {
  const currentTopic = 'Advanced Algorithms'; // This would be dynamic

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Learning Hub"
        description={`Generating content for "${currentTopic}"`}
      />
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 rounded-lg border mt-4"
      >
        <ResizablePanel defaultSize={75}>
          <ScrollArea className="h-[calc(100vh-12rem)] p-6">
            <h2 className="text-2xl font-bold font-headline mb-4">
              {currentTopic}
            </h2>
            <div className="prose prose-stone dark:prose-invert max-w-none">
              <p>
                Your AI-generated content for the topic will appear here. This area
                will be populated by the Qwen-30B model after checking for
                prerequisites.
              </p>
              <p>
                For now, this is a placeholder. In a real implementation, you
                would make an API call to your backend, which in turn would
                contact the Hugging Face API to get the content for "
                {currentTopic}".
              </p>
              
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>
              
              <pre>
                <code>
{`// Example code block
function exampleAlgorithm(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  // Further implementation...
  return arr;
}`}
                </code>
              </pre>

              <p>Curabitur sit amet magna quam. Praesent in libero vel turpis pellentesque egestas sit amet vel nunc. Nunc lobortis dui neque, quis viverra enim auctor eget. Sed quis nibh laoreet, sodales libero vitae, scelerisque turpis. Integer eget ex vitae sapien efficitur faucibus. Curabitur vitae purus ac turpis euismod sinon.</p>

            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25}>
          <ScrollArea className="h-[calc(100vh-12rem)] p-4">
            <h3 className="text-lg font-semibold font-headline mb-4">
              Prerequisites
            </h3>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start text-sm">
                  <AlertCircle className="h-4 w-4 mr-2 mt-0.5" />
                  <div>
                    This data would be dynamically fetched from your Neo4j graph database.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Accordion type="single" collapsible className="w-full mt-4">
              {prerequisites.map((prereq) => (
                <AccordionItem value={prereq.topic} key={prereq.topic}>
                  <AccordionTrigger>
                    <div className="flex items-center justify-between w-full">
                      <span>{prereq.topic}</span>
                      <Badge
                        variant={
                          prereq.confidence > 80
                            ? 'default'
                            : 'secondary'
                        }
                        className={prereq.confidence < 75 ? 'bg-destructive/80' : ''}
                      >
                        {prereq.confidence}%
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 text-muted-foreground">
                      {prereq.subTopics.map((sub) => (
                        <li key={sub}>{sub}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}