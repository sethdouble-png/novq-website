#!/usr/bin/env node

/**
 * Quick script to add the three Spotify tracks to releases table
 * This uses the Supabase SDK to insert records directly
 */

const { createClient } = require('@supabase/supabase-js');

// Load from .env.local manually
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const spotifyTracks = [
  {
    title: 'Spotify Track 1',
    subtitle: 'Featured Release',
    listen_url: 'https://open.spotify.com/embed/track/2D46uc9ktc2OMBmApdsKuQ?utm_source=generator',
    release_date: new Date().toISOString().split('T')[0],
    sort_order: 1,
    is_featured: true,
  },
  {
    title: 'Spotify Track 2',
    subtitle: 'Featured Release',
    listen_url: 'https://open.spotify.com/embed/track/6b8Lrh07NDMc9rHP3JG82e?utm_source=generator',
    release_date: new Date().toISOString().split('T')[0],
    sort_order: 2,
    is_featured: true,
  },
  {
    title: 'Spotify Track 3',
    subtitle: 'Featured Release',
    listen_url: 'https://open.spotify.com/embed/track/4kZgn3ORmsigLQZuIiEVpV?utm_source=generator',
    release_date: new Date().toISOString().split('T')[0],
    sort_order: 3,
    is_featured: true,
  },
];

async function insertTracks() {
  try {
    // Get the first profile (assuming there's one for this user)
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (profilesError || !profiles || profiles.length === 0) {
      console.error('❌ No profiles found in database');
      process.exit(1);
    }

    const profileId = profiles[0].id;
    console.log(`✓ Using profile ID: ${profileId}`);

    // Add profile_id to each track
    const tracksWithProfile = spotifyTracks.map((track) => ({
      ...track,
      profile_id: profileId,
    }));

    // Insert the tracks
    const { data, error } = await supabase
      .from('releases')
      .insert(tracksWithProfile)
      .select();

    if (error) {
      console.error('❌ Error inserting tracks:', error.message);
      process.exit(1);
    }

    console.log(`✅ Successfully added ${data.length} Spotify tracks!`);
    data.forEach((track, i) => {
      console.log(`   ${i + 1}. ${track.title}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

insertTracks();
