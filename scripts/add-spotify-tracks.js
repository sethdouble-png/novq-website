#!/usr/bin/env node

/**
 * Helper script to add Spotify tracks to the releases table
 * Run with: node scripts/add-spotify-tracks.js
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const tracks = [
  {
    title: 'Track One',
    subtitle: 'Spotify Track 1',
    listen_url: 'https://open.spotify.com/embed/track/2D46uc9ktc2OMBmApdsKuQ?utm_source=generator',
    release_date: new Date().toISOString().split('T')[0],
    sort_order: 1,
    is_featured: true,
  },
  {
    title: 'Track Two',
    subtitle: 'Spotify Track 2',
    listen_url: 'https://open.spotify.com/embed/track/6b8Lrh07NDMc9rHP3JG82e?utm_source=generator',
    release_date: new Date().toISOString().split('T')[0],
    sort_order: 2,
    is_featured: true,
  },
  {
    title: 'Track Three',
    subtitle: 'Spotify Track 3',
    listen_url: 'https://open.spotify.com/embed/track/4kZgn3ORmsigLQZuIiEVpV?utm_source=generator',
    release_date: new Date().toISOString().split('T')[0],
    sort_order: 3,
    is_featured: true,
  },
];

async function addTracks() {
  try {
    // Get the current user (need to be authenticated)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('❌ Not authenticated. Please sign in first.');
      process.exit(1);
    }

    console.log(`✓ Authenticated as: ${user.email}`);

    // Insert tracks for this user's profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      console.error('❌ Profile not found for this user');
      process.exit(1);
    }

    console.log(`✓ Found profile: ${profile.id}`);

    // Add tracks
    const tracksWithProfile = tracks.map((track) => ({
      ...track,
      profile_id: profile.id,
    }));

    const { data, error } = await supabase
      .from('releases')
      .insert(tracksWithProfile)
      .select();

    if (error) {
      console.error('❌ Error adding tracks:', error);
      process.exit(1);
    }

    console.log(`✓ Added ${data.length} tracks successfully!`);
    console.log('Tracks:');
    data.forEach((track) => {
      console.log(`  - ${track.title} (${track.listen_url.includes('spotify') ? 'Spotify' : 'Link'})`);
    });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

addTracks();
