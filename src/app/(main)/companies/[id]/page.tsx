'use client';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Briefcase, Building, CalendarDays, Mail, MessageSquare, Users } from 'lucide-react';
import PageTitle from '@/components/shared/page-title';
import Image from 'next/image';

// Mock data - in a real app, this would be fetched based on ID
const mockCompanyData: { [key: string]: any } = {
  '1': { id: '1', name: 'Tech Solutions Inc.', industry: 'Technology', description: 'Leading provider of innovative tech solutions focusing on AI, cloud computing, and enterprise software. We are committed to fostering talent and driving technological advancement.', logoUrl: 'https://placehold.co/150x150.png?text=TS', dataAiHint: 'modern office', mentorshipSpecialties: ['Software Development', 'Cloud Computing', 'AI/ML', 'Product Management'], jobOpportunities: [{title: 'Software Engineer Intern', type: 'Internship', location: 'Remote'}, {title: 'Junior Cloud Architect', type: 'Full-time', location: 'New York, NY'}], events: [{id: 'evt1', title: 'Intro to Cloud Careers Webinar', date: '2024-09-15', type: 'Webinar'}] },
  '2': { id: '2', name: 'Green Energy Co.', industry: 'Renewable Energy', description: 'Pioneering sustainable energy alternatives for a greener future. Our work spans solar, wind, and geothermal energy projects globally.', logoUrl: 'https://placehold.co/150x150.png?text=GE', dataAiHint: 'wind turbine', mentorshipSpecialties: ['Solar Power Engineering', 'Wind Energy Systems', 'Project Management (Energy)', 'Environmental Policy'], jobOpportunities: [{title: 'Renewable Energy Analyst', type: 'Full-time', location: 'Austin, TX'}], events: [{id: 'evt2', title: 'Future of Green Tech Talk', date: '2024-10-05', type: 'Virtual Talk'}]},
};


export default function CompanyProfilePage() {
  const params = useParams();
  const companyId = params.id as string;
  const company = mockCompanyData[companyId];

  if (!company) {
    return (
      <div className="text-center py-10">
          <Building className="mx-auto h-24 w-24 text-muted-foreground" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Company Not Found</h1>
          <p className="mt-6 text-base leading-7 text-muted-foreground">Sorry, we couldn’t find the company profile you’re looking for.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
       <PageTitle title={company.name} description={company.industry} icon={<Building className="w-10 h-10 text-primary" />} />
      
      <Card className="shadow-xl overflow-hidden">
        <div className="md:flex">
            <div className="md:w-1/3 p-6 bg-gradient-to-br from-primary/10 to-accent/10 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r">
                <Image 
                    src={company.logoUrl} 
                    alt={`${company.name} logo`} 
                    width={128} 
                    height={128} 
                    className="rounded-lg mb-4 border-4 border-background bg-card p-2 shadow-lg"
                    data-ai-hint={company.dataAiHint}
                />
                <h2 className="text-2xl font-bold font-headline">{company.name}</h2>
                <p className="text-muted-foreground">{company.industry}</p>
                <div className="mt-6 space-x-2">
                    <Button><MessageSquare className="mr-2 h-4 w-4" /> Contact Us</Button>
                    <Button variant="outline"><Briefcase className="mr-2 h-4 w-4" /> View Jobs</Button>
                </div>
            </div>

            <div className="md:w-2/3 p-6">
                <Tabs defaultValue="about" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
                        <TabsTrigger value="about">About</TabsTrigger>
                        <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                        <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
                        <TabsTrigger value="events">Events</TabsTrigger>
                    </TabsList>

                    <TabsContent value="about" className="space-y-4">
                        <Card>
                            <CardHeader><CardTitle className="font-headline text-lg">Company Overview</CardTitle></CardHeader>
                            <CardContent><p className="text-muted-foreground">{company.description}</p></CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle className="font-headline text-lg">Contact (Placeholder)</CardTitle></CardHeader>
                            <CardContent className="space-y-2">
                                <p className="flex items-center text-muted-foreground"><Mail className="mr-2 h-4 w-4 text-primary" /> careers@{company.name.toLowerCase().replace(/[^a-z0-9]/gi, '')}.com</p>
                                {/* Add website, address etc. */}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="opportunities" className="space-y-4">
                        <Card>
                            <CardHeader><CardTitle className="font-headline text-lg">Job Openings</CardTitle></CardHeader>
                            <CardContent>
                                {company.jobOpportunities.length > 0 ? (
                                    <ul className="space-y-3">
                                    {company.jobOpportunities.map((job: any, i: number) => (
                                        <li key={i} className="p-3 border rounded-md hover:bg-muted/50">
                                            <h4 className="font-semibold">{job.title}</h4>
                                            <p className="text-sm text-muted-foreground">{job.type} - {job.location}</p>
                                            <Button variant="link" className="p-0 h-auto mt-1 text-primary">Apply Now</Button>
                                        </li>
                                    ))}
                                    </ul>
                                ) : <p className="text-muted-foreground">No current job openings listed.</p>}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="mentorship" className="space-y-4">
                        <Card>
                            <CardHeader><CardTitle className="font-headline text-lg">Mentorship Programs</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-2">We offer mentorship in the following areas:</p>
                                <div className="flex flex-wrap gap-2">
                                    {company.mentorshipSpecialties.map((spec: string, i: number) => <Badge key={i} variant="secondary" className="text-sm px-3 py-1">{spec}</Badge>)}
                                </div>
                                <p className="mt-4 text-sm text-muted-foreground">Interested students can reach out to learn more about our mentorship initiatives.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                    <TabsContent value="events" className="space-y-4">
                        <Card>
                            <CardHeader><CardTitle className="font-headline text-lg">Upcoming Events</CardTitle></CardHeader>
                            <CardContent>
                                {company.events.length > 0 ? (
                                    <ul className="space-y-3">
                                    {company.events.map((event: any, i: number) => (
                                        <li key={i} className="p-3 border rounded-md hover:bg-muted/50">
                                            <h4 className="font-semibold">{event.title}</h4>
                                            <p className="text-sm text-muted-foreground">{event.type} - {new Date(event.date).toLocaleDateString()}</p>
                                            <Button variant="link" className="p-0 h-auto mt-1 text-primary">Event Details</Button>
                                        </li>
                                    ))}
                                    </ul>
                                ) : <p className="text-muted-foreground">No upcoming events posted.</p>}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
      </Card>
    </div>
  );
}
