'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push('/studio');
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/studio');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Set up listener for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/studio');
      }
    });

    return () => subscription?.unsubscribe();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050509] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#e11d48] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
