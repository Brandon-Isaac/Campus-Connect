'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Save } from 'lucide-react';

interface StudentProfileFormData {
  university?: string;
  major?: string;
  year?: number;
  skills?: string[]; // Store as array, display as comma-separated string
  interests?: string[]; // Store as array, display as comma-separated string
  achievements?: string[]; // Store as array, display as comma-separated string
  mentorshipPreferences?: string;
  bio?: string;
}

interface StudentProfileFormProps {
  initialData: StudentProfileFormData;
  onSubmit: (data: StudentProfileFormData) => void;
}

export default function StudentProfileForm({ initialData, onSubmit }: StudentProfileFormProps) {
  const [formData, setFormData] = useState<StudentProfileFormData>({
    university: initialData.university || '',
    major: initialData.major || '',
    year: initialData.year || 1,
    skills: initialData.skills || [],
    interests: initialData.interests || [],
    achievements: initialData.achievements || [],
    mentorshipPreferences: initialData.mentorshipPreferences || '',
    bio: initialData.bio || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleListChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: 'skills' | 'interests' | 'achievements') => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, [field]: value.split(',').map(s => s.trim()).filter(s => s) }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="university">University</Label>
          <Input id="university" name="university" value={formData.university} onChange={handleChange} placeholder="E.g., Tech University" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="major">Major</Label>
          <Input id="major" name="major" value={formData.major} onChange={handleChange} placeholder="E.g., Computer Science" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Year of Study</Label>
          <Input id="year" name="year" type="number" value={formData.year} onChange={handleChange} placeholder="E.g., 3" min="1" max="8" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio / About Me</Label>
        <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us a bit about yourself, your passions, and goals." rows={4} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Skills (comma-separated)</Label>
        <Input id="skills" name="skills" value={formData.skills?.join(', ')} onChange={(e) => handleListChange(e, 'skills')} placeholder="E.g., React, Python, Project Management" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="interests">Interests (comma-separated)</Label>
        <Input id="interests" name="interests" value={formData.interests?.join(', ')} onChange={(e) => handleListChange(e, 'interests')} placeholder="E.g., AI, Web Development, Robotics" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="achievements">Achievements (comma-separated, or one per line in textarea for better UX)</Label>
        <Textarea id="achievements" name="achievements" value={formData.achievements?.join('\n')} onChange={(e) => setFormData(prev => ({...prev, achievements: e.target.value.split('\n').map(s => s.trim()).filter(s => s)}))} placeholder="E.g., Dean's List, Hackathon Winner" rows={3} />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="mentorshipPreferences">Mentorship Preferences</Label>
        <Textarea id="mentorshipPreferences" name="mentorshipPreferences" value={formData.mentorshipPreferences} onChange={handleChange} placeholder="Describe what you are looking for in a mentorship (e.g., specific industry, skills, career advice)." rows={3} />
      </div>

      <Button type="submit" className="w-full md:w-auto text-lg py-3">
        <Save className="mr-2 h-5 w-5" /> Save Profile
      </Button>
    </form>
  );
}
