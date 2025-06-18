'use client';

import { useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Briefcase, GraduationCap, Lightbulb, Mail, MessageSquare, UserCheck } from 'lucide-react';
import PageTitle from '@/components/shared/page-title';
import Image from 'next/image';

// Mock data - in a real app, this would be fetched based on ID
const mockStudentsData: { [key: string]: any } = {
  '1': { id: '1', name: 'Alice Wonderland', university: 'Tech University', major: 'Computer Science', year: 3, skills: ['React', 'Node.js', 'Python', 'JavaScript', 'SQL'], interests: ['AI', 'Web Development', 'UX Design', 'Open Source'], avatarUrl: 'https://placehold.co/150x150.png?text=AW', dataAiHint:'student portrait', bio: 'Passionate computer science student with a knack for creating innovative web solutions. Eager to learn and contribute to impactful projects.', achievements: ['Dean\'s List 2023', 'Hackathon Winner (Team Lead)', 'Published research paper on AI ethics'], mentorshipPreferences: 'Seeking mentorship in AI/ML product management or full-stack development from industry professionals.' },
  '2': { id: '2', name: 'Bob The Builder', university: 'State College', major: 'Mechanical Engineering', year: 4, skills: ['AutoCAD', 'SolidWorks', 'MATLAB', 'Project Management'], interests: ['Robotics', '3D Printing', 'Sustainable Energy'], avatarUrl: 'https://placehold.co/150x150.png?text=BB', dataAiHint:'student smiling', bio: 'Dedicated mechanical engineering student focused on robotics and sustainable design. Proven ability to manage projects and work in teams.', achievements: ['Captain of Robotics Team', 'Presented at National Engineering Conference'], mentorshipPreferences: 'Interested in guidance on transitioning from academia to industry, particularly in robotics or aerospace.' },
};


export default function StudentProfilePage() {
  const params = useParams();
  const studentId = params.id as string;
  const student = mockStudentsData[studentId]; // Fetch student data based on ID

  if (!student) {
    return (
        <div className="text-center py-10">
            <UserCircle className="mx-auto h-24 w-24 text-muted-foreground" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Student Not Found</h1>
            <p className="mt-6 text-base leading-7 text-muted-foreground">Sorry, we couldn’t find the student profile you’re looking for.</p>
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageTitle title={student.name} description={`${student.major} at ${student.university}`} icon={<GraduationCap className="w-10 h-10 text-primary" />} />

      <Card className="shadow-xl overflow-hidden">
        <div className="md:flex">
            <div className="md:w-1/3 p-6 bg-gradient-to-br from-primary/10 to-accent/10 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r">
                <Avatar className="w-32 h-32 mb-4 border-4 border-background shadow-lg">
                    <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint={student.dataAiHint} />
                    <AvatarFallback className="text-4xl">{student.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold font-headline">{student.name}</h2>
                <p className="text-muted-foreground">{student.major} - Year {student.year}</p>
                <p className="text-sm text-muted-foreground">{student.university}</p>
                <div className="mt-6 space-x-2">
                    <Button><MessageSquare className="mr-2 h-4 w-4" /> Message</Button>
                    <Button variant="outline"><UserCheck className="mr-2 h-4 w-4" /> Request Mentorship</Button>
                </div>
            </div>

            <div className="md:w-2/3 p-6">
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="academics">Academics</TabsTrigger>
                        <TabsTrigger value="skills">Skills & Interests</TabsTrigger>
                        <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <Card>
                            <CardHeader><CardTitle className="font-headline text-lg">Biography</CardTitle></CardHeader>
                            <CardContent><p className="text-muted-foreground">{student.bio}</p></CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="font-headline text-lg">Contact Information (Placeholder)</CardTitle></CardHeader>
                            <CardContent className="space-y-2">
                                <p className="flex items-center text-muted-foreground"><Mail className="mr-2 h-4 w-4 text-primary" /> {student.name.toLowerCase().replace(' ', '.')}@example.com</p>
                                {/* Add more contact details if available */}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="academics" className="space-y-4">
                        <Card>
                            <CardHeader><CardTitle className="font-headline text-lg">Academic Achievements</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                    {student.achievements.map((ach: string, i: number) => <li key={i}>{ach}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle className="font-headline text-lg">Key Courses (Placeholder)</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                    <li>Data Structures & Algorithms</li>
                                    <li>Machine Learning Fundamentals</li>
                                    <li>Software Engineering Principles</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="skills" className="space-y-4">
                        <Card>
                            <CardHeader><CardTitle className="font-headline text-lg">Skills</CardTitle></CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {student.skills.map((skill: string, i: number) => <Badge key={i} variant="secondary" className="text-sm px-3 py-1">{skill}</Badge>)}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="font-headline text-lg">Interests</CardTitle></CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {student.interests.map((interest: string, i: number) => <Badge key={i} variant="outline" className="text-sm px-3 py-1">{interest}</Badge>)}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="mentorship" className="space-y-4">
                         <Card>
                            <CardHeader><CardTitle className="font-headline text-lg">Mentorship Preferences</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{student.mentorshipPreferences}</p>
                                <div className="mt-4">
                                    <h4 className="font-semibold mb-2">Looking for a mentor who can help with:</h4>
                                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                        <li>Career path guidance</li>
                                        <li>Technical skill development</li>
                                        <li>Networking strategies</li>
                                        <li>Interview preparation</li>
                                    </ul>
                                </div>
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

function UserCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
