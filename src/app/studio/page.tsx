'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function StudioLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        setError('Please enter both email and password');
        setLoading(false);
        return;
      }

      const { error, data } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error('Auth error:', error);
        
        // Provide specific error messages
        if (error.message.includes('Failed to fetch')) {
          console.error('Network/Connectivity Issue:');
          console.error('1. Check .env.local has correct NEXT_PUBLIC_SUPABASE_URL');
          console.error('2. Verify Supabase project URL is valid');
          console.error('3. Check internet connection');
          console.error('4. Open browser DevTools (F12) → Network tab to see failed requests');
          setError('Cannot connect to Supabase API. Check console (F12) for details.');
        } else if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials.');
        } else {
          setError(error.message || 'Failed to sign in. Please check your credentials.');
        }
        setLoading(false);
        return;
      }

      if (data?.session) {
        router.push('/studio/dashboard');
      } else {
        setError('Login successful but session not created. Please try again.');
        setLoading(false);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Handle network errors specifically
      if (err.message && err.message.includes('Failed to fetch')) {
        console.error('Network Error - Unable to reach Supabase API');
        setError('Network error: Cannot reach Supabase. Check your connection and .env.local.');
      } else {
        setError(err?.message || 'An error occurred during login');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050509] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#e11d48] mb-2">NovQ Studio</h1>
          <p className="text-gray-400">Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-950/50 border border-red-800 rounded-lg p-4 text-red-200 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-[#e11d48] hover:bg-[#fb7185] text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#e11d48]"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          NovQ Studio v1.0
        </p>
      </div>
    </div>
  );
}
