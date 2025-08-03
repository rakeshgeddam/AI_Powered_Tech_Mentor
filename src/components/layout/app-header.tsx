

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BrainCircuit,
  Code,
  FlaskConical,
  GitGraph,
  Home,
  Menu,
  Target,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme-toggle';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/overview', label: 'Overview', icon: Target },
  { href: '/journey', label: 'Journey', icon: GitGraph },
  { href: '/learning-hub', label: 'Learning Hub', icon: BookOpen },
  { href: '/code-editor', label: 'Code Editor', icon: Code },
  { href: '/code-analyzer', label: 'Code Analyzer', icon: FlaskConical },
];

export function AppHeader() {
  const pathname = usePathname();

  const navLinks = navItems.map((item) => (
    <Button
      key={item.href}
      asChild
      variant={pathname === item.href ? 'secondary' : 'ghost'}
      className="justify-start"
    >
      <Link href={item.href} className="flex items-center gap-2">
        <item.icon className="h-5 w-5" />
        <span>{item.label}</span>
      </Link>
    </Button>
  ));

  const mobileNavLinks = navItems.map((item) => (
    <SheetClose asChild key={item.href}>
      <Button
        asChild
        variant={pathname === item.href ? 'secondary' : 'ghost'}
        className="justify-start"
      >
        <Link href={item.href} className="flex items-center gap-2">
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      </Button>
    </SheetClose>
  ));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary-foreground"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="m14.5 10.5-4 4L9 13"></path>
              </svg>
            </div>
            <span className="text-lg font-bold font-headline">
              AdaptiveLearn
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-1 md:flex">{navLinks}</nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
           <ThemeToggle />
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 py-6">
                  <Link
                    href="/"
                    className="flex items-center gap-2 px-4 font-bold font-headline text-lg"
                  >
                     <div className="bg-primary p-1.5 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary-foreground"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        <path d="m14.5 10.5-4 4L9 13"></path>
                      </svg>
                    </div>
                    AdaptiveLearn
                  </Link>
                  <nav className="grid gap-2 px-2">{mobileNavLinks}</nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
