import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import AppHeader from '@/components/layout/app-header';
import AppFooter from '@/components/layout/app-footer';
import { AuthProvider } from '@/contexts/auth-context';

export const metadata: Metadata = {
  title: 'CampusConnect',
  description: 'Bridging students and industry for mentorship and job opportunities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased flex flex-col")}>
        <AuthProvider>
          <AppHeader />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <AppFooter />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
