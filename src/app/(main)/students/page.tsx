'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Filter, Search, UserCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import PageTitle from '@/components/shared/page-title';

// Mock data for students
const mockStudents = [
  { id: '1', name: 'Alice Wonderland', university: 'Tech University', major: 'Computer Science', year: 3, skills: ['React', 'Node.js', 'Python'], interests: ['AI', 'Web Development'], avatarUrl: 'https://placehold.co/100x100.png?text=AW', dataAiHint: 'student portrait' },
  { id: '2', name: 'Bob The Builder', university: 'State College', major: 'Mechanical Engineering', year: 4, skills: ['AutoCAD', 'SolidWorks'], interests: ['Robotics', '3D Printing'], avatarUrl: 'https://placehold.co/100x100.png?text=BB', dataAiHint: 'student smiling' },
  { id: '3', name: 'Charlie Brown', university: 'Arts Institute', major: 'Graphic Design', year: 2, skills: ['Photoshop', 'Illustrator'], interests: ['UI/UX', 'Branding'], avatarUrl: 'https://placehold.co/100x100.png?text=CB', dataAiHint: 'creative student' },
  { id: '4', name: 'Diana Prince', university: 'Global University', major: 'International Relations', year: 3, skills: ['Diplomacy', 'Spanish', 'French'], interests: ['Global Politics', 'Non-profits'], avatarUrl: 'https://placehold.co/100x100.png?text=DP', dataAiHint: 'professional student' },
];

interface Student {
  id: string;
  name: string;
  university: string;
  major: string;
  year: number;
  skills: string[];
  interests: string[];
  avatarUrl: string;
  dataAiHint: string;
}

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ major: '', university: '', skill: '' });
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(mockStudents);

  // Simulate filtering - in a real app, this would be a backend call
  useEffect(() => {
    let students = mockStudents;
    if (searchTerm) {
      students = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (filters.major) {
      students = students.filter(s => s.major === filters.major);
    }
    if (filters.university) {
      students = students.filter(s => s.university === filters.university);
    }
    if (filters.skill) {
      students = students.filter(s => s.skills.includes(filters.skill));
    }
    setFilteredStudents(students);
  }, [searchTerm, filters]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const uniqueMajors = Array.from(new Set(mockStudents.map(s => s.major)));
  const uniqueUniversities = Array.from(new Set(mockStudents.map(s => s.university)));
  const uniqueSkills = Array.from(new Set(mockStudents.flatMap(s => s.skills)));

  return (
    <div className="space-y-8">
      <PageTitle title="Discover Students" description="Find talented students for mentorship, internships, or employment." icon={<Users className="w-8 h-8 text-primary" />} />

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" /> Search & Filter Students
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search by name..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select onValueChange={(value) => handleFilterChange('major', value)}>
              <SelectTrigger><SelectValue placeholder="Filter by Major" /></SelectTrigger>
              <SelectContent>
                {uniqueMajors.map(major => <SelectItem key={major} value={major}>{major}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange('university', value)}>
              <SelectTrigger><SelectValue placeholder="Filter by University" /></SelectTrigger>
              <SelectContent>
                {uniqueUniversities.map(uni => <SelectItem key={uni} value={uni}>{uni}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange('skill', value)}>
              <SelectTrigger><SelectValue placeholder="Filter by Skill" /></SelectTrigger>
              <SelectContent>
                {uniqueSkills.map(skill => <SelectItem key={skill} value={skill}>{skill}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map(student => (
            <Card key={student.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="items-center text-center">
                <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                  <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint={student.dataAiHint} />
                  <AvatarFallback>{student.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-xl">{student.name}</CardTitle>
                <CardDescription>{student.major} at {student.university} - Year {student.year}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                <div>
                  <h4 className="font-semibold text-sm">Skills:</h4>
                  <p className="text-xs text-muted-foreground">{student.skills.join(', ')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Interests:</h4>
                  <p className="text-xs text-muted-foreground">{student.interests.join(', ')}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="outline">
                  <Link href={`/students/${student.id}`}>
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
            <UserCircle className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-semibold">No Students Found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
