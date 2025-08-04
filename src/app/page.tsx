'use client';

import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  ArrowRight,
  FlaskConical,
  GitGraph,
  BrainCircuit,
  Code,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import * as React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
  <Card className="flex flex-col h-full text-center items-center border-0 shadow-lg bg-card/80 backdrop-blur-sm">
    <CardHeader>
      <div className="bg-primary/10 p-4 rounded-full">{icon}</div>
    </CardHeader>
    <CardContent className="flex-grow">
      <CardTitle className="font-headline text-xl">{title}</CardTitle>
      <CardDescription className="mt-2">{description}</CardDescription>
    </CardContent>
    <CardFooter>
      <Button asChild variant="secondary">
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
    title: 'Interactive Code Editor',
    description:
      'Sharpen your problem-solving skills in a real-time coding environment.',
    href: '/code-editor',
    cta: 'Start Coding',
  },
  {
    title: 'AI Learning Hub',
    description:
      'Explore topics with AI-generated content that adapts to your knowledge level.',
    href: '/learning-hub',
    cta: 'Start Learning',
  },
];

const icons = [
  <GitGraph key="journey" className="h-8 w-8 text-primary" />,
  <FlaskConical key="analyzer" className="h-8 w-8 text-primary" />,
  <Code key="editor" className="h-8 w-8 text-primary" />,
  <BookOpen key="hub" className="h-8 w-8 text-primary" />,
];

export default function LandingPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-lg bg-secondary/50 py-24 sm:py-36 lg:py-48 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="absolute inset-0">
            <svg
              className="absolute inset-0 h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              style={{
                top: '-10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200%',
                height: '120%',
                minWidth: '800px',
              }}
            >
              <defs>
                <radialGradient
                  id="swoosh-gradient"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="25%"
                  fy="25%"
                >
                  <stop offset="0%" stopColor="hsl(var(--primary) / 0.1)" />
                  <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
                </radialGradient>
              </defs>
              <ellipse
                cx="50%"
                cy="40%"
                rx="60%"
                ry="50%"
                fill="url(#swoosh-gradient)"
                transform="rotate(-15, 50, 50)"
              />
            </svg>
          </div>

          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <PageHeader
                title="Unlock Your Potential. Today."
                description="Master in-demand tech skills with personalized learning paths, AI-powered feedback, and real-world challenges."
              />
              <div className="mt-8 flex justify-center gap-4 lg:justify-start">
                <Button asChild size="lg">
                  <Link href="/overview">Start Learning Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/journey">Explore Features</Link>
                </Button>
              </div>
            </div>

            <div className="relative h-64 w-full lg:h-96">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Students learning with joy"
                fill
                className="rounded-xl object-cover shadow-2xl"
                data-ai-hint="students learning"
              />
            </div>
          </div>
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
              <CarouselItem
                key={feature.title}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1 h-full">
                  <FeatureCard {...feature} icon={icons[index]} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </section>
    </div>
  );
}
