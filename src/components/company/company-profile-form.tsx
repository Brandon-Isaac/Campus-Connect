'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';

interface CompanyProfileFormData {
  name?: string; // Already part of User, but might be editable here too
  industry?: string;
  description?: string;
  mentorshipSpecialties?: string[]; // Store as array, display as comma-separated string
  jobOpportunities?: string; // Could be a link or markdown text
  website?: string;
  location?: string;
}

interface CompanyProfileFormProps {
  initialData: CompanyProfileFormData;
  onSubmit: (data: CompanyProfileFormData) => void;
}

export default function CompanyProfileForm({ initialData, onSubmit }: CompanyProfileFormProps) {
  const [formData, setFormData] = useState<CompanyProfileFormData>({
    name: initialData.name || '',
    industry: initialData.industry || '',
    description: initialData.description || '',
    mentorshipSpecialties: initialData.mentorshipSpecialties || [],
    jobOpportunities: initialData.jobOpportunities || '',
    website: initialData.website || '',
    location: initialData.location || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleListChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: 'mentorshipSpecialties') => {
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
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" name="name" value={formData.name} onChange={handleChange} placeholder="E.g., Tech Solutions Inc." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input id="industry" name="industry" value={formData.industry} onChange={handleChange} placeholder="E.g., Technology" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" name="website" type="url" value={formData.website} onChange={handleChange} placeholder="https://example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location / Headquarters</Label>
          <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="E.g., New York, NY or Remote" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Company Description</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Tell us about your company, its mission, and culture." rows={4} />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="mentorshipSpecialties">Mentorship Specialties (comma-separated)</Label>
        <Input id="mentorshipSpecialties" name="mentorshipSpecialties" value={formData.mentorshipSpecialties?.join(', ')} onChange={(e) => handleListChange(e, 'mentorshipSpecialties')} placeholder="E.g., Software Engineering, Product Management, Marketing" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobOpportunities">Job Opportunities / Careers Page Link</Label>
        <Textarea id="jobOpportunities" name="jobOpportunities" value={formData.jobOpportunities} onChange={handleChange} placeholder="Provide a link to your careers page or list key roles. Markdown supported for more detailed listings (mock)." rows={3} />
      </div>
      
      <Button type="submit" className="w-full md:w-auto text-lg py-3">
        <Save className="mr-2 h-5 w-5" /> Save Company Profile
      </Button>
    </form>
  );
}
