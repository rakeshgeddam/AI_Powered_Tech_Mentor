'use client';

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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  ArrowRight,
  Code,
  FlaskConical,
  GitGraph,
  Layers,
  BrainCircuit,
  Target,
} from 'lucide-react';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import * as React from 'react';
import Image from 'next/image';

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
  <Card className="flex flex-col h-full text-center items-center">
    <CardHeader>
      <div className="bg-primary/10 p-4 rounded-full">{icon}</div>
    </CardHeader>
    <CardContent className="flex-grow">
      <CardTitle className="font-headline text-xl">{title}</CardTitle>
      <CardDescription className="mt-2">{description}</CardDescription>
    </CardContent>
    <CardFooter>
      <Button asChild variant="outline">
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
      'Visualize your progress on a customized knowledge graph tailored to your goals.',
    href: '/journey',
    cta: 'View Your Journey',
  },
  {
    title: 'AI-Powered Code Analyzer',
    description:
      'Receive instant, intelligent feedback on your low-level design solutions.',
    href: '/code-analyzer',
    cta: 'Analyze Code',
  },
  {
    title: 'Cognitive Assessment',
    description:
      'Identify your cognitive strengths and weaknesses with targeted exercises.',
    href: '/overview',
    cta: 'Assess Yourself',
  },
];

const icons = [
  <GitGraph key="journey" className="h-8 w-8 text-primary" />,
  <FlaskConical key="analyzer" className="h-8 w-8 text-primary" />,
  <BrainCircuit key="assessment" className="h-8 w-8 text-primary" />,
];

export default function LandingPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center">
        <PageHeader
          title="Unlock Your Potential."
          description="Master in-demand tech skills with personalized learning paths, AI-powered feedback, and real-world challenges."
        />
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/overview">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/journey">Explore Features</Link>
          </Button>
        </div>
      </section>

      {/* Features Carousel Section */}
      <section>
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {features.map((feature, index) => (
              <CarouselItem key={feature.title}>
                <div className="p-1">
                  <FeatureCard {...feature} icon={icons[index]} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* LLD Questions Section */}
      <section className="grid grid-cols-1 lg:grid-cols-1 gap-8 pt-8">
        <Card>
          <CardHeader>
            <CardTitle>Top LLD Questions</CardTitle>
            <CardDescription>
              Practice your low-level system design knowledge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                'Design a Parking Lot',
                'Design a Vending Machine',
                'Design a Library Management System',
                'Design a Chess Game',
                'Design a URL Shortener',
                'Design a Traffic Control System',
              ].map((q) => (
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
      </section>
    </div>
  );
}
