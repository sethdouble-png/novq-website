'use client';

import { useEffect, useState } from 'react';

export default function DiagnosticsPage() {
  const [supabaseUrl] = useState(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const [supabaseKey] = useState(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const [connectivity, setConnectivity] = useState<'checking' | 'error' | 'success'>('checking');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        if (!supabaseUrl) {
          setConnectivity('error');
          setErrorMessage('NEXT_PUBLIC_SUPABASE_URL not found in environment');
          return;
        }

        const response = await fetch(`${supabaseUrl}/rest/v1/`, {
          method: 'GET',
          headers: {
            'apikey': supabaseKey || '',
          },
        });

        if (response.ok || response.status === 401 || response.status === 403) {
          // 401/403 means the server is reachable but auth failed (expected)
          setConnectivity('success');
        } else {
          setConnectivity('error');
          setErrorMessage(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (err: any) {
        setConnectivity('error');
        setErrorMessage(err.message);
      }
    };

    testConnection();
  }, [supabaseUrl, supabaseKey]);

  return (
    <div className="min-h-screen bg-[#050509] text-[#f5f5f7] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-[#e11d48] mb-8">🔍 Supabase Diagnostics</h1>

        <div className="space-y-6">
          {/* Environment Variables */}
          <div className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e]">
            <h2 className="text-xl font-semibold mb-4">📝 Environment Variables</h2>
            <div className="space-y-3 font-mono text-sm">
              <div>
                <span className="text-gray-400">NEXT_PUBLIC_SUPABASE_URL:</span>
                <span className={supabaseUrl ? ' text-green-400' : ' text-red-400'}>
                  {supabaseUrl ? supabaseUrl : '❌ NOT SET'}
                </span>
              </div>
              <div>
                <span className="text-gray-400">NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
                <span className={supabaseKey ? ' text-green-400' : ' text-red-400'}>
                  {supabaseKey ? supabaseKey.substring(0, 20) + '...' : '❌ NOT SET'}
                </span>
              </div>
            </div>
          </div>

          {/* Connectivity Test */}
          <div className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e]">
            <h2 className="text-xl font-semibold mb-4">🌐 Connectivity Test</h2>
            <div className="space-y-3">
              {connectivity === 'checking' && (
                <div className="text-yellow-400">⏳ Testing connection...</div>
              )}
              {connectivity === 'success' && (
                <div className="text-green-400">✓ Supabase API is reachable</div>
              )}
              {connectivity === 'error' && (
                <>
                  <div className="text-red-400">❌ Cannot reach Supabase API</div>
                  <div className="text-red-300 text-sm mt-2">{errorMessage}</div>
                </>
              )}
            </div>
          </div>

          {/* Troubleshooting */}
          {connectivity === 'error' && (
            <div className="bg-red-950/30 rounded-lg p-6 border border-red-800">
              <h2 className="text-xl font-semibold mb-4 text-red-400">🔧 Troubleshooting Steps</h2>
              <ol className="space-y-3 text-sm">
                <li>
                  <strong>1. Verify Supabase Project Exists</strong>
                  <p className="text-gray-300 mt-1">
                    Go to{' '}
                    <a
                      href="https://supabase.com/dashboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#e11d48] hover:underline"
                    >
                      supabase.com/dashboard
                    </a>
                    {' '}and check if your project &quot;amuuotezgxojzolhsaury&quot; exists
                  </p>
                </li>
                <li>
                  <strong>2. Check .env.local File</strong>
                  <p className="text-gray-300 mt-1">
                    Verify the file contains the correct NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
                  </p>
                </li>
                <li>
                  <strong>3. Network Connectivity</strong>
                  <p className="text-gray-300 mt-1">
                    Check your internet connection. Try opening{' '}
                    <a
                      href={supabaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#e11d48] hover:underline"
                    >
                      {supabaseUrl}
                    </a>
                    {' '}in your browser
                  </p>
                </li>
                <li>
                  <strong>4. Firewall/VPN</strong>
                  <p className="text-gray-300 mt-1">
                    If using a VPN or behind a firewall, it may be blocking Supabase. Try disabling temporarily to test.
                  </p>
                </li>
                <li>
                  <strong>5. Restart Dev Server</strong>
                  <p className="text-gray-300 mt-1">
                    After fixing .env.local, restart with <code className="bg-[#050509] px-2 py-1 rounded">npm run dev</code>
                  </p>
                </li>
              </ol>
            </div>
          )}

          {/* If Successful */}
          {connectivity === 'success' && (
            <div className="bg-green-950/30 rounded-lg p-6 border border-green-800">
              <h2 className="text-xl font-semibold mb-4 text-green-400">✓ All Good!</h2>
              <p className="text-gray-300">
                Your Supabase project is reachable. Try signing in at <a href="/studio" className="text-[#e11d48] hover:underline">/studio</a>
              </p>
              <p className="text-gray-300 mt-3 text-sm">
                If you still see errors, check your:
                <ul className="list-disc list-inside mt-2 ml-2">
                  <li>Admin user email in Supabase Auth</li>
                  <li>Database tables and RLS policies</li>
                  <li>Browser console (F12) for more details</li>
                </ul>
              </p>
            </div>
          )}

          {/* Quick Links */}
          <div className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2a2a3e]">
            <h2 className="text-xl font-semibold mb-4">🔗 Quick Links</h2>
            <div className="space-y-2">
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#e11d48] hover:underline"
              >
                → Supabase Dashboard
              </a>
              <a
                href="/studio"
                className="block text-[#e11d48] hover:underline"
              >
                → Try Login Again
              </a>
              <a
                href="/"
                className="block text-[#e11d48] hover:underline"
              >
                → Back to Homepage
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
