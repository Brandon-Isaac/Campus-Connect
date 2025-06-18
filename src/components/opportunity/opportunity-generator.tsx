import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, CalendarX, Users } from 'lucide-react'; // Assuming these icons fit types of opportunities

interface OpportunityCardProps {
  title: string;
  description: string;
  type?: 'mentorship' | 'event' | 'job'; // Optional: to show different icons or styling
  link?: string; // Optional: link to the opportunity details
}

export default function OpportunityCard({ title, description, type, link }: OpportunityCardProps) {
  
  const Icon = () => {
    switch(type) {
      case 'mentorship': return <Users className="h-6 w-6 text-primary" />;
      case 'event': return <CalendarX className="h-6 w-6 text-primary" />;
      case 'job': return <Briefcase className="h-6 w-6 text-primary" />;
      default: return <Briefcase className="h-6 w-6 text-primary" />; // Default icon
    }
  }

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex-row items-start gap-4 space-y-0">
        <div className="p-2 bg-primary/10 rounded-md">
         <Icon />
        </div>
        <div>
          <CardTitle className="text-lg font-semibold font-headline">{title}</CardTitle>
          {type && <CardDescription className="capitalize">{type}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter>
        {link ? (
          <Button variant="outline" asChild className="w-full">
            <a href={link} target="_blank" rel="noopener noreferrer">
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        ) : (
           <Button variant="outline" disabled className="w-full">
              More Info Soon
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
