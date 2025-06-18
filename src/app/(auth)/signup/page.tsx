'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter} from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from '@/contexts/auth-context';
import { UserPlus } from 'lucide-react';
import { Suspense } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const initialAccountType = 'company'; // Default to 'company' for initial state
  const [accountType, setAccountType] = useState<'student' | 'company'>(initialAccountType);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!"); // Replace with Toaster
      return;
    }
    // Mock signup logic
    login({ 
      id: Math.random().toString(36).substring(7), 
      name, 
      email, 
      type: accountType,
      profile: accountType === 'student' ? 
        { university: '', major: '', year: 1, skills: [], interests: [], achievements:[], mentorshipPreferences: '' } :
        { industry: '', description: '', mentorshipSpecialties: [], jobOpportunities: [] }
    });
    router.push('/profile'); // Redirect to profile setup page
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-8">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline flex items-center justify-center">
            <UserPlus className="mr-2 h-7 w-7" /> Create Your CampusConnect Account
          </CardTitle>
          <CardDescription>Join our community of students and companies.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>I am a:</Label>
              <RadioGroup 
                defaultValue={accountType} 
                onValueChange={(value: 'student' | 'company') => setAccountType(value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="r1" />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company" id="r2" />
                  <Label htmlFor="r2">Company / Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">{accountType === 'student' ? 'Full Name' : 'Company Name'}</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder={accountType === 'student' ? 'John Doe' : 'Tech Solutions Inc.'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
            </div>
            
            <Button type="submit" className="w-full text-lg py-6">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
