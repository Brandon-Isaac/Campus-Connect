'use client';

import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function AppFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold font-headline">CampusConnect</span>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </nav>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-8">
          &copy; {new Date().getFullYear()} CampusConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
