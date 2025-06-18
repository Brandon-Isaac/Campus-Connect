import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Briefcase, Users, Building, MessageSquare, Lightbulb, ArrowRight, CalendarDays } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Student Profiles",
    description: "Showcase academic achievements, skills, and career aspirations.",
    link: "/students"
  },
  {
    icon: <Building className="h-8 w-8 text-primary" />,
    title: "Company Profiles",
    description: "Highlight your company culture, mentorship programs, and opportunities.",
    link: "/companies"
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: "Smart Matching",
    description: "Discover relevant students or companies based on your preferences.",
    link: "/dashboard" 
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "Direct Messaging",
    description: "Connect and communicate seamlessly with potential mentors or candidates.",
    link: "/messages"
  },
  {
    icon: <CalendarDays className="h-8 w-8 text-primary" />,
    title: "Virtual Events",
    description: "Organize and attend virtual mentorship sessions and career fairs.",
    link: "/events"
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "AI Opportunity Generator",
    description: "Get personalized suggestions for mentorships, events, and jobs.",
    link: "/dashboard"
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-lg shadow-lg">
        <div className="container mx-auto text-center px-4">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            CampusConnect: Your Bridge to Industry Success.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Connect with mentors, discover opportunities, and launch your career. We bridge the gap between university students and the industry.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="shadow-md hover:shadow-lg transition-shadow">
              <Link href="/signup">
                Join as Student <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-md hover:shadow-lg transition-shadow">
              <Link href="/signup?type=company">
                Join as Company <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            How CampusConnect Empowers You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  {feature.icon}
                  <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
                <CardContent>
                   <Button variant="link" asChild className="p-0 h-auto text-primary">
                     <Link href={feature.link || "#"}>
                       Learn More <ArrowRight className="ml-1 h-4 w-4" />
                     </Link>
                   </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Visual Banner Section */}
      <section className="w-full py-16 md:py-24 bg-muted/50 rounded-lg shadow-inner">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6">
              Unlock Your Potential. Build Your Future.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              CampusConnect provides the tools and connections you need to thrive. Whether you're a student seeking guidance or a company looking for fresh talent, our platform is designed for you.
            </p>
            <Button size="lg" asChild className="shadow-md hover:shadow-lg transition-shadow">
              <Link href="/signup">
                Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div>
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="Students and professionals connecting" 
              width={600} 
              height={400} 
              className="rounded-lg shadow-xl"
              data-ai-hint="collaboration network"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-20 md:py-32">
        <div className="container mx-auto text-center px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6">
            Ready to Connect?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join our growing community of ambitious students and forward-thinking companies.
          </p>
          <Button size="xl" asChild className="shadow-lg hover:shadow-xl transition-shadow text-lg px-8 py-6">
            <Link href="/signup">
              Sign Up Now and Make Your Mark!
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
