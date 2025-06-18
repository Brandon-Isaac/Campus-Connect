'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    // In a real app, you'd validate credentials against a backend
    const userType = email.includes('company') ? 'company' : 'student';
    const userName = email.split('@')[0];
    
    login({ 
      id: Math.random().toString(36).substring(7), 
      name: userName.charAt(0).toUpperCase() + userName.slice(1), 
      email, 
      type: userType,
      profile: userType === 'student' ? 
        { university: 'Tech University', major: 'Computer Science', year: 3, skills: ['React', 'Node.js'], interests: ['AI', 'Web Dev'], achievements:['Dean\'s List'], mentorshipPreferences: 'AI field' } :
        { industry: 'Technology', description: 'A leading tech company.', mentorshipSpecialties: ['Software Engineering'], jobOpportunities: ['Internships available'] }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline flex items-center justify-center">
            <LogIn className="mr-2 h-7 w-7" /> Login to CampusConnect
          </CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <Button type="submit" className="w-full text-lg py-6">
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <Link href="/forgot-password" passHref>
             <Button variant="link" className="text-sm">Forgot password?</Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
