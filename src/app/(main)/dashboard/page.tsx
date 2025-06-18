'use client';

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import OpportunityGenerator from '@/components/opportunity/opportunity-generator';
import { ArrowRight, Briefcase, CalendarDays, Users, Building, UserCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return null; // Or a loading/redirect state
  }

  const quickLinks = user.type === 'student' ? [
    { title: 'Explore Companies', href: '/companies', icon: <Building className="h-6 w-6 text-primary" /> },
    { title: 'Find Events', href: '/events', icon: <CalendarDays className="h-6 w-6 text-primary" /> },
    { title: 'Update Profile', href: '/profile', icon: <UserCircle className="h-6 w-6 text-primary" /> },
  ] : [
    { title: 'Discover Students', href: '/students', icon: <Users className="h-6 w-6 text-primary" /> },
    { title: 'Manage Events', href: '/events/manage', icon: <CalendarDays className="h-6 w-6 text-primary" /> },
    { title: 'Update Company Profile', href: '/profile', icon: <Building className="h-6 w-6 text-primary" /> },
  ];

  return (
    <div className="space-y-8">
      <Card className="shadow-lg bg-gradient-to-r from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Welcome back, {user.name}!</CardTitle>
          <CardDescription className="text-lg">
            {user.type === 'student' 
              ? "Let's find your next opportunity. Check out personalized suggestions below."
              : "Manage your company's presence and connect with talented students."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-8">
           <div className="flex-1">
            <p className="mb-6 text-muted-foreground">
              CampusConnect is here to help you achieve your goals. Explore tailored recommendations, connect with peers and industry leaders, and take the next step in your journey.
            </p>
            <Button size="lg" asChild>
              <Link href={user.type === 'student' ? "/opportunities" : "/students"}>
                {user.type === 'student' ? 'View My Opportunities' : 'Search for Talent'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <Image 
            src="https://placehold.co/300x200.png" 
            alt="Dashboard illustration"
            width={300}
            height={200}
            className="rounded-md shadow-md object-cover"
            data-ai-hint="teamwork success" 
          />
        </CardContent>
      </Card>

      {user.type === 'student' && (
        <OpportunityGenerator />
      )}

      <section>
        <h2 className="text-2xl font-headline font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map(link => (
            <Card key={link.href} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{link.title}</CardTitle>
                {link.icon}
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full">
                  <Link href={link.href}>Go to {link.title} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {user.type === 'company' && (
         <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-xl font-headline">Post an Opportunity</CardTitle>
                <CardDescription>Share internships, jobs, or mentorship programs with students.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="lg" className="w-full md:w-auto">
                    <Briefcase className="mr-2 h-5 w-5" /> Create New Posting
                </Button>
            </CardContent>
         </Card>
      )}

    </div>
  );
}
