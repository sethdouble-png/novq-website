import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials:', {
    url: supabaseUrl ? '✓' : '✗ (NEXT_PUBLIC_SUPABASE_URL not set)',
    key: supabaseAnonKey ? '✓' : '✗ (NEXT_PUBLIC_SUPABASE_ANON_KEY not set)',
  });
  console.warn('Check .env.local file - credentials required!');
} else {
  console.log('✓ Supabase credentials loaded');
  console.log('✓ API URL:', supabaseUrl);
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Test Supabase connectivity
if (typeof window !== 'undefined' && supabaseUrl && supabaseAnonKey) {
  // Test connection silently on client load
  fetch(`${supabaseUrl}/rest/v1/`)
    .then(() => console.log('✓ Supabase API is reachable'))
    .catch((err) => {
      console.error('❌ Cannot reach Supabase API at:', supabaseUrl);
      console.error('Error details:', err.message);
      console.error('Troubleshooting:');
      console.error('1. Check .env.local has correct NEXT_PUBLIC_SUPABASE_URL');
      console.error('2. Verify Supabase project exists and is active');
      console.error('3. Check network connectivity');
      console.error('4. Try restarting dev server: npm run dev');
    });
}
