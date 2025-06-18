'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, Building, CalendarDays, MessageSquare, UserCircle, Settings, LogOut, Lightbulb, Briefcase, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const studentNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/profile', label: 'My Profile', icon: <UserCircle /> },
  { href: '/companies', label: 'Companies', icon: <Building /> },
  { href: '/events', label: 'Events', icon: <CalendarDays /> },
  { href: '/messages', label: 'Messages', icon: <MessageSquare /> },
  { href: '/opportunities', label: 'AI Opportunities', icon: <Lightbulb /> },
];

const companyNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/profile', label: 'Company Profile', icon: <Building /> },
  { href: '/students', label: 'Find Students', icon: <Users /> },
  { href: '/events/manage', label: 'Manage Events', icon: <CalendarDays /> },
  { href: '/messages', label: 'Messages', icon: <MessageSquare /> },
];


export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading CampusConnect...</div>
        {/* Could add a spinner here */}
      </div>
    );
  }
  
  const navItems = user.type === 'student' ? studentNavItems : companyNavItems;

  return (
    <SidebarProvider defaultOpen>
        <Sidebar variant="sidebar" collapsible="icon" side="left" className="border-r shadow-md">
          <SidebarHeader className="p-4 items-center justify-center">
              <Link href="/dashboard" className="flex items-center gap-2 text-primary font-semibold text-lg" data-testid="sidebar-logo-link">
                <Image src="https://placehold.co/40x40.png" alt="CampusConnect Logo" width={32} height={32} className="rounded-sm" data-ai-hint="logo abstract" />
                <span className="group-data-[collapsible=icon]:hidden font-headline">CampusConnect</span>
              </Link>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-2 border-t">
             <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Settings">
                    <Link href="/settings">
                      <Settings />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={logout} tooltip="Logout" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                    <LogOut />
                    <span>Log Out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <div className="p-4 flex items-center justify-between border-b">
                <SidebarTrigger />
                {/* Add potential global search or other header elements here */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
                  <span className="text-sm font-medium">Welcome, {user.name}!</span>
                </div>
            </div>
            <div className="p-2 md:p-6">
             {children}
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
