'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'company'; // User can be a student or a company representative
  profile?: StudentProfile | CompanyProfile; // Optional: Store full profile data
}

interface StudentProfile {
  university: string;
  major: string;
  year: number;
  skills: string[];
  interests: string[];
  achievements: string[];
  mentorshipPreferences: string;
}

interface CompanyProfile {
  industry: string;
  description: string;
  mentorshipSpecialties: string[];
  jobOpportunities: string[];
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
  updateUserProfile: (profileData: Partial<StudentProfile> | Partial<CompanyProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Try to load user from localStorage to persist login (mock)
    const storedUser = localStorage.getItem('campusConnectUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('campusConnectUser', JSON.stringify(userData));
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campusConnectUser');
    router.push('/login');
  };
  
  const updateUserProfile = (profileData: Partial<StudentProfile> | Partial<CompanyProfile>) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      let updatedProfile: StudentProfile | CompanyProfile | undefined;

      if (currentUser.type === 'student' && currentUser.profile && 'university' in currentUser.profile) {
        updatedProfile = { ...currentUser.profile, ...profileData } as StudentProfile;
      } else if (currentUser.type === 'company' && currentUser.profile && 'industry' in currentUser.profile) {
        updatedProfile = { ...currentUser.profile, ...profileData } as CompanyProfile;
      } else {
        updatedProfile = currentUser.profile;
      }

      const updatedUser: User = {
        ...currentUser,
        profile: updatedProfile,
      };
      localStorage.setItem('campusConnectUser', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
