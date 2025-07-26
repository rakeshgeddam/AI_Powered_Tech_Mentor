'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  Home,
  BrainCircuit,
  Target,
  GitGraph,
  Code,
  FlaskConical,
  User,
  Settings,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/assessment', label: 'Assessment', icon: BrainCircuit },
  { href: '/goals', label: 'Goals', icon: Target },
  { href: '/journey', label: 'Journey', icon: GitGraph },
  { href: '/code-editor', label: 'Code Editor', icon: Code },
  { href: '/code-analyzer', label: 'Code Analyzer', icon: FlaskConical },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
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
              className="text-primary-foreground"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="m14.5 10.5-4 4L9 13"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold font-headline text-sidebar-foreground">
            AdaptiveLearn
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src="https://placehold.co/40x40"
              alt="User Avatar"
              data-ai-hint="user avatar"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-sidebar-foreground truncate">
              User
            </span>
            <span className="text-xs text-sidebar-foreground/70 truncate">
              user@email.com
            </span>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto flex-shrink-0">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
