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
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative -mx-4 -mt-8 sm:-mx-6 lg:-mx-8">
        <div className="relative h-[560px] w-full">
          <Image
            src="https://storage.googleapis.com/res-block-studio/images/prompts/86c67d30-b30f-48d6-8488-124b82531e32.png"
            alt="Students learning with joy"
            layout="fill"
            objectFit="cover"
            className="z-0"
            data-ai-hint="students learning"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="relative z-20 flex h-full items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
              <PageHeader
                title="Unlock Your Potential."
                description="Master in-demand tech skills with personalized learning paths, AI-powered feedback, and real-world challenges."
              />
              <div className="mt-8 flex justify-start gap-4">
                <Button asChild size="lg">
                  <Link href="/overview">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent/50 border-primary-foreground/50 hover:bg-transparent/80">
                  <Link href="/journey">Explore Features</Link>
                </Button>
              </div>
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
