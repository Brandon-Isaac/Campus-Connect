'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Building, Filter, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import PageTitle from '@/components/shared/page-title';
import { Badge } from '@/components/ui/badge';

// Mock data for companies
const mockCompanies = [
  { id: '1', name: 'Tech Solutions Inc.', industry: 'Technology', description: 'Leading provider of innovative tech solutions.', logoUrl: 'https://placehold.co/100x100.png?text=TS', dataAiHint: 'modern office', specialties: ['Software Development', 'Cloud Computing'] },
  { id: '2', name: 'Green Energy Co.', industry: 'Renewable Energy', description: 'Pioneering sustainable energy alternatives.', logoUrl: 'https://placehold.co/100x100.png?text=GE', dataAiHint: 'wind turbine', specialties: ['Solar Power', 'Wind Energy'] },
  { id: '3', name: 'HealthFirst Group', industry: 'Healthcare', description: 'Dedicated to improving patient care through technology.', logoUrl: 'https://placehold.co/100x100.png?text=HF', dataAiHint: 'medical research', specialties: ['Telemedicine', 'Medical Devices'] },
  { id: '4', name: 'EduGrowth Platforms', industry: 'Education Technology', description: 'Transforming learning with digital tools.', logoUrl: 'https://placehold.co/100x100.png?text=EP', dataAiHint: 'online learning', specialties: ['E-learning', 'AI Tutoring'] },
];

interface Company {
  id: string;
  name: string;
  industry: string;
  description: string;
  logoUrl: string;
  dataAiHint: string;
  specialties: string[];
}

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ industry: '', specialty: '' });
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(mockCompanies);

  // Simulate filtering
  useEffect(() => {
    let companies = mockCompanies;
    if (searchTerm) {
      companies = companies.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (filters.industry) {
      companies = companies.filter(c => c.industry === filters.industry);
    }
    if (filters.specialty) {
      companies = companies.filter(c => c.specialties.includes(filters.specialty));
    }
    setFilteredCompanies(companies);
  }, [searchTerm, filters]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const uniqueIndustries = Array.from(new Set(mockCompanies.map(c => c.industry)));
  const uniqueSpecialties = Array.from(new Set(mockCompanies.flatMap(c => c.specialties)));

  return (
    <div className="space-y-8">
      <PageTitle title="Explore Companies" description="Discover companies offering mentorship and job opportunities." icon={<Building className="w-8 h-8 text-primary" />} />

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" /> Search & Filter Companies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search by company name..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select onValueChange={(value) => handleFilterChange('industry', value)}>
              <SelectTrigger><SelectValue placeholder="Filter by Industry" /></SelectTrigger>
              <SelectContent>
                {uniqueIndustries.map(industry => <SelectItem key={industry} value={industry}>{industry}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange('specialty', value)}>
              <SelectTrigger><SelectValue placeholder="Filter by Mentorship Specialty" /></SelectTrigger>
              <SelectContent>
                {uniqueSpecialties.map(spec => <SelectItem key={spec} value={spec}>{spec}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map(company => (
            <Card key={company.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="items-center text-center">
                <Image 
                  src={company.logoUrl} 
                  alt={`${company.name} logo`} 
                  width={80} 
                  height={80} 
                  className="rounded-md mb-4 border bg-card p-1"
                  data-ai-hint={company.dataAiHint}
                />
                <CardTitle className="font-headline text-xl">{company.name}</CardTitle>
                <CardDescription>{company.industry}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-3">{company.description}</p>
                <div>
                  <h4 className="font-semibold text-xs mt-2">Mentorship Specialties:</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {company.specialties.map(spec => <Badge key={spec} variant="secondary" className="text-xs">{spec}</Badge>)}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="outline">
                  <Link href={`/companies/${company.id}`}>
                    View Profile <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
         <Card className="text-center py-12 shadow-md">
          <CardContent className="space-y-4">
            <Building className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-semibold">No Companies Found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters, or check back later for new company listings.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
