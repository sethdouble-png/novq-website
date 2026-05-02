'use client';

import { useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: string;
}

export default function AdminLayout({ children, activeTab }: AdminLayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      router.push('/studio');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { label: 'Profile', href: '/studio/dashboard?tab=profile', id: 'profile' },
    { label: 'Site Settings', href: '/studio/dashboard?tab=settings', id: 'settings' },
    { label: 'Links', href: '/studio/dashboard?tab=links', id: 'links' },
    { label: 'Releases', href: '/studio/dashboard?tab=releases', id: 'releases' },
    { label: 'Spotify Embeds', href: '/studio/dashboard?tab=embeds', id: 'embeds' },
    { label: 'Press / EPK', href: '/studio/dashboard?tab=press', id: 'press' },
  ];

  return (
    <div className="min-h-screen bg-[#050509] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f0f15] border-r border-[#1a1a2e] flex flex-col">
        <div className="p-6 border-b border-[#1a1a2e]">
          <h1 className="text-2xl font-bold text-[#e11d48]">NovQ Studio</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`block px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-[#e11d48] text-white'
                  : 'text-gray-300 hover:bg-[#1a1a2e]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1a1a2e]">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full btn-secondary disabled:opacity-50"
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
