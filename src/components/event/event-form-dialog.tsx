'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle, Save } from "lucide-react";
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';

interface EventData {
  id?: string;
  title: string;
  description: string;
  date: Date | undefined;
  type: string; // E.g., Workshop, Webinar, Career Fair
  virtualLink?: string;
  dataAiHint?: string; // For placeholder image
}

interface EventFormDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  eventToEdit?: EventData | null;
  onEventCreated: (event: EventData & { company: string; companyId: string; id: string; }) => void;
}

export default function EventFormDialog({ isOpen, setIsOpen, eventToEdit, onEventCreated }: EventFormDialogProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState<EventData>({
    title: '',
    description: '',
    date: undefined,
    type: '',
    virtualLink: '',
    dataAiHint: 'event abstract'
  });

  useEffect(() => {
    if (eventToEdit) {
      setFormData(eventToEdit);
    } else {
      // Reset form for new event
      setFormData({ title: '', description: '', date: undefined, type: '', virtualLink: '', dataAiHint: 'event abstract' });
    }
  }, [eventToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.type !== 'company') {
        alert("Only companies can create events."); // Replace with toast
        return;
    }
    if (!formData.date) {
        alert("Please select a date for the event."); // Replace with toast
        return;
    }

    const completeEventData = {
        ...formData,
        id: eventToEdit?.id || Math.random().toString(36).substring(7),
        company: user.name,
        companyId: user.id,
        date: formData.date.toISOString(), // Store date as ISO string
    };
    onEventCreated(completeEventData as any); // Type assertion needed because of date format change
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline flex items-center">
            <PlusCircle className="mr-2 h-6 w-6 text-primary" />
            {eventToEdit ? 'Edit Event' : 'Create New Event'}
          </DialogTitle>
          <DialogDescription>
            Fill in the details for your event. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="E.g., AI Workshop" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Detailed information about the event" rows={4} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="date">Event Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={handleDateChange}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="space-y-2">
                <Label htmlFor="type">Event Type</Label>
                <Input id="type" name="type" value={formData.type} onChange={handleChange} placeholder="E.g., Workshop, Webinar" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="virtualLink">Virtual Meeting Link (Optional)</Label>
            <Input id="virtualLink" name="virtualLink" type="url" value={formData.virtualLink} onChange={handleChange} placeholder="https://meeting.link/event" />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {eventToEdit ? 'Save Changes' : 'Create Event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
