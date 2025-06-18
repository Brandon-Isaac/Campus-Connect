'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, CalendarDays, Filter, PlusCircle, Search } from 'lucide-react';
import Link from 'next/link';
import PageTitle from '@/components/shared/page-title';
import { useAuth } from '@/contexts/auth-context';
import EventFormDialog from '@/components/event/event-form-dialog';
import Image from 'next/image';

// Mock data for events
const mockEvents = [
  { id: '1', title: 'AI & Machine Learning Workshop', company: 'Tech Solutions Inc.', companyId: '1', date: '2024-09-20', type: 'Workshop', description: 'An interactive workshop on the fundamentals of AI and ML.', dataAiHint: 'AI workshop' },
  { id: '2', title: 'Career Fair: Green Energy', company: 'Green Energy Co.', companyId: '2', date: '2024-10-05', type: 'Career Fair', description: 'Meet recruiters and learn about careers in renewable energy.', dataAiHint: 'career fair' },
  { id: '3', title: 'Networking Night: Healthcare Tech', company: 'HealthFirst Group', companyId: '3', date: '2024-09-28', type: 'Networking', description: 'Connect with professionals in the healthcare technology sector.', dataAiHint: 'networking event' },
  { id: '4', title: 'Intro to EdTech Innovations', company: 'EduGrowth Platforms', companyId: '4', date: '2024-10-12', type: 'Webinar', description: 'Discover the latest trends and tools in education technology.', dataAiHint: 'online webinar' },
];

interface Event {
  id: string;
  title: string;
  company: string;
  companyId: string;
  date: string;
  type: string;
  description: string;
  dataAiHint: string;
}

export default function EventsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: '', company: '' });
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

  // Simulate filtering
  useEffect(() => {
    let events = mockEvents;
    if (searchTerm) {
      events = events.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (filters.type) {
      events = events.filter(e => e.type === filters.type);
    }
    if (filters.company) {
      events = events.filter(e => e.company === filters.company);
    }
    setFilteredEvents(events);
  }, [searchTerm, filters]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };
  
  const handleEventCreated = (newEvent: Event) => {
    // In a real app, you would refetch or update state from backend
    setFilteredEvents(prev => [newEvent, ...prev]); // Add to start for visibility
    mockEvents.unshift(newEvent); // Add to mock data source as well for consistency if filters change
  };

  const uniqueTypes = Array.from(new Set(mockEvents.map(e => e.type)));
  const uniqueCompanies = Array.from(new Set(mockEvents.map(e => e.company)));

  return (
    <div className="space-y-8">
      <PageTitle title="Upcoming Events" description="Find workshops, webinars, career fairs, and networking opportunities." icon={<CalendarDays className="w-8 h-8 text-primary" />}>
        {user?.type === 'company' && (
          <Button onClick={() => setIsCreateEventOpen(true)} className="shadow-md">
            <PlusCircle className="mr-2 h-5 w-5" /> Create Event
          </Button>
        )}
      </PageTitle>
      
      <EventFormDialog 
        isOpen={isCreateEventOpen} 
        setIsOpen={setIsCreateEventOpen} 
        onEventCreated={handleEventCreated} 
      />

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" /> Search & Filter Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search by event title..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select onValueChange={(value) => handleFilterChange('type', value)}>
              <SelectTrigger><SelectValue placeholder="Filter by Event Type" /></SelectTrigger>
              <SelectContent>
                {uniqueTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange('company', value)}>
              <SelectTrigger><SelectValue placeholder="Filter by Company" /></SelectTrigger>
              <SelectContent>
                {uniqueCompanies.map(company => <SelectItem key={company} value={company}>{company}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <Card key={event.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow">
              <Image 
                src={`https://placehold.co/400x200.png`} 
                alt={event.title}
                width={400}
                height={200}
                className="rounded-t-lg object-cover"
                data-ai-hint={event.dataAiHint}
              />
              <CardHeader>
                <CardTitle className="font-headline text-xl line-clamp-2">{event.title}</CardTitle>
                <CardDescription>
                  {event.company} - {new Date(event.date).toLocaleDateString()} ({event.type})
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="outline">
                  {/* In a real app, this would link to /events/[id] */}
                  <Link href={`#`}> 
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12 shadow-md">
          <CardContent className="space-y-4">
            <CalendarDays className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-semibold">No Events Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters, or check back later for new events.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
