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
      <section className="relative -mx-8 -mt-8">
        <div className="absolute inset-0 bg-secondary/30 bg-gradient-to-b from-secondary/50 to-background z-0">
           <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div
          className="absolute inset-0 z-[-1] overflow-hidden"
          style={{
            clipPath: 'ellipse(150% 80% at 50% 100%)',
          }}
        >
          <div className="absolute inset-0 bg-secondary" />
        </div>
        <div className="container mx-auto px-4 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary font-headline tracking-tight">
                Unlock Your Potential.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
                Master in-demand tech skills with personalized learning paths, AI-powered feedback, and real-world challenges.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="text-lg">
                  <Link href="/overview">Start Learning Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link href="/journey">Explore Features</Link>
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden shadow-2xl bg-background/50 backdrop-blur-sm">
                <Image
                  src="https://placehold.co/600x600.png"
                  alt="Students learning with joy"
                  data-ai-hint="students learning joy"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center space-y-2 mb-12">
           <h2 className="text-3xl font-bold font-headline">Why TechCoach?</h2>
           <p className="text-muted-foreground text-lg">Your all-in-one platform for mastering software engineering.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <FeatureCard key={feature.title} {...feature} icon={icons[index]} />
            ))}
        </div>
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
