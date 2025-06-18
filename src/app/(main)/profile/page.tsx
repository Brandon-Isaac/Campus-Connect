'use client';

import { useAuth } from '@/contexts/auth-context';
import StudentProfileForm from '@/components/student/student-profile-form';
import CompanyProfileForm from '@/components/company/company-profile-form';
import PageTitle from '@/components/shared/page-title';
import { UserCircle, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfilePage() {
  const { user, loading, updateUserProfile } = useAuth();

  if (loading) {
    return <div>Loading profile...</div>; // Or a skeleton loader
  }

  if (!user) {
    // This should ideally be handled by the (main) layout redirecting to login
    return <div>Please log in to view your profile.</div>;
  }

  const handleProfileUpdate = (updatedData: any) => {
    updateUserProfile(updatedData);
    // Potentially show a toast message for success
    alert('Profile updated successfully! (Mock)');
  };

  return (
    <div className="space-y-8">
      <PageTitle 
        title={user.type === 'student' ? "My Student Profile" : "My Company Profile"}
        description="Keep your information up-to-date to get the best matches and opportunities."
        icon={user.type === 'student' ? <UserCircle className="w-8 h-8 text-primary" /> : <Building className="w-8 h-8 text-primary" />}
      />

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Edit Your Profile</CardTitle>
          <CardDescription>
            {user.type === 'student' 
              ? "Fill in your academic achievements, skills, and what you're looking for in a mentorship."
              : "Provide details about your company, industry, and the mentorship or job opportunities you offer."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user.type === 'student' ? (
            <StudentProfileForm 
              initialData={user.profile || {}} 
              onSubmit={handleProfileUpdate} 
            />
          ) : (
            <CompanyProfileForm 
              initialData={user.profile || {}}
              onSubmit={handleProfileUpdate} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
