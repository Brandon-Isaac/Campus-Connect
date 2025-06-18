'use client';

import PageTitle from '@/components/shared/page-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/auth-context';
import { Bell, Lock, Palette, SettingsIcon, UserCircle } from 'lucide-react'; // Changed Settings to SettingsIcon

export default function SettingsPage() {
  const { user, logout } = useAuth();

  if (!user) return null; // Or loading state

  // Mock form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Settings saved (mock)!');
  };

  return (
    <div className="space-y-8">
      <PageTitle title="Account Settings" description="Manage your account preferences and details." icon={<SettingsIcon className="w-8 h-8 text-primary" />} />

      <div className="grid gap-8 md:grid-cols-3">
        {/* Account Information Card */}
        <Card className="md:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center"><UserCircle className="mr-2 h-5 w-5 text-primary"/> Account Information</CardTitle>
            <CardDescription>Update your personal or company details.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user.name} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} disabled />
                 <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
              </div>
              {/* Add more fields as necessary, e.g., phone, location */}
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </Card>
        
        {/* Security Settings Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center"><Lock className="mr-2 h-5 w-5 text-primary"/> Security</CardTitle>
            <CardDescription>Manage your account security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Button variant="outline" className="w-full">Change Password</Button>
             <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
                <Label htmlFor="two-factor" className="flex flex-col space-y-1">
                  <span>Two-Factor Authentication</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Enhance your account security.
                  </span>
                </Label>
                <Switch id="two-factor" aria-label="Toggle two-factor authentication" />
              </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Notification Settings Card */}
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl font-headline flex items-center"><Bell className="mr-2 h-5 w-5 text-primary"/> Notifications</CardTitle>
                <CardDescription>Choose what updates you receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="new-message-noti">New Messages</Label>
                    <Switch id="new-message-noti" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="event-reminder-noti">Event Reminders</Label>
                    <Switch id="event-reminder-noti" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="opportunity-noti">New Opportunity Alerts</Label>
                    <Switch id="opportunity-noti" />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save Notification Preferences</Button>
            </CardFooter>
        </Card>

        {/* Appearance Settings Card */}
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl font-headline flex items-center"><Palette className="mr-2 h-5 w-5 text-primary"/> Appearance</CardTitle>
                <CardDescription>Customize the look and feel (mock).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <Switch id="dark-mode" />
                </div>
                 <p className="text-xs text-muted-foreground">Theme switching is usually handled at a higher level with `next-themes` or similar.</p>
            </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-destructive">
        <CardHeader>
            <CardTitle className="text-xl font-headline text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
            <Button variant="destructive" onClick={logout}>Log Out of Account</Button>
            <p className="text-sm text-muted-foreground mt-2">This will log you out from your current session.</p>
        </CardContent>
        <CardFooter>
             <Button variant="link" className="text-destructive hover:text-destructive/80">Deactivate Account (Not Implemented)</Button>
        </CardFooter>
      </Card>

    </div>
  );
}
