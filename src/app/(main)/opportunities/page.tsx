'use client';

import OpportunityGenerator from '@/components/opportunity/opportunity-generator';
import PageTitle from '@/components/shared/page-title';
import { Lightbulb } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OpportunitiesPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
        <Card className="w-full max-w-md text-center p-8 shadow-lg">
          <CardHeader>
            <Lightbulb className="mx-auto h-16 w-16 text-primary mb-4" />
            <CardTitle className="text-2xl font-headline">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg mb-6">
              Please log in to discover personalized opportunities.
            </CardDescription>
            <Button asChild size="lg">
              <Link href="/login">Log In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (user.type !== 'student') {
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
        <Card className="w-full max-w-md text-center p-8 shadow-lg">
          <CardHeader>
            <Lightbulb className="mx-auto h-16 w-16 text-primary mb-4" />
            <CardTitle className="text-2xl font-headline">Feature Not Available</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg mb-6">
              The AI Opportunity Generator is currently available for student accounts.
            </CardDescription>
            <Button asChild size="lg">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }


  return (
    <div className="space-y-8">
      <PageTitle 
        title="Your AI-Powered Opportunities" 
        description="Leverage AI to find mentorships, events, and job openings tailored to your profile and activities."
        icon={<Lightbulb className="w-8 h-8 text-primary" />}
      />
      <OpportunityGenerator />
    </div>
  );
}
