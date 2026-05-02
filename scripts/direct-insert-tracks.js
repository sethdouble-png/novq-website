#!/usr/bin/env node

/**
 * Direct insert script using raw SQL
 * This bypasses RLS by using service role
 */

const https = require('https');

async function makeRequest(url, method, data = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            body: JSON.parse(body),
          });
        } catch {
          resolve({
            status: res.statusCode,
            body,
          });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function addTracks() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    console.error('❌ SUPABASE_SERVICE_ROLE_KEY environment variable not set');
    console.log('\nTo get your service role key:');
    console.log('1. Go to https://app.supabase.com');
    console.log('2. Select your project');
    console.log('3. Settings > API > Service Role Key');
    console.log('4. Copy and add to .env: SUPABASE_SERVICE_ROLE_KEY=your_key');
    process.exit(1);
  }

  try {
    // Get profiles
    const profilesUrl = 'https://amuuotezgxojzolhsauy.supabase.co/rest/v1/profiles?select=id&limit=1';
    const profileRes = await makeRequest(profilesUrl, 'GET');

    if (profileRes.status !== 200 || !profileRes.body || profileRes.body.length === 0) {
      console.error('❌ No profiles found or error fetching profiles');
      console.error('Response:', profileRes);
      process.exit(1);
    }

    const profileId = profileRes.body[0].id;
    console.log(`✓ Found profile: ${profileId}`);

    const tracks = [
      {
        profile_id: profileId,
        title: 'Spotify Track 1',
        subtitle: 'Featured Release',
        listen_url: 'https://open.spotify.com/embed/track/2D46uc9ktc2OMBmApdsKuQ?utm_source=generator',
        release_date: new Date().toISOString().split('T')[0],
        sort_order: 1,
        is_featured: true,
      },
      {
        profile_id: profileId,
        title: 'Spotify Track 2',
        subtitle: 'Featured Release',
        listen_url: 'https://open.spotify.com/embed/track/6b8Lrh07NDMc9rHP3JG82e?utm_source=generator',
        release_date: new Date().toISOString().split('T')[0],
        sort_order: 2,
        is_featured: true,
      },
      {
        profile_id: profileId,
        title: 'Spotify Track 3',
        subtitle: 'Featured Release',
        listen_url: 'https://open.spotify.com/embed/track/4kZgn3ORmsigLQZuIiEVpV?utm_source=generator',
        release_date: new Date().toISOString().split('T')[0],
        sort_order: 3,
        is_featured: true,
      },
    ];

    // Insert tracks
    const releasesUrl = 'https://amuuotezgxojzolhsauy.supabase.co/rest/v1/releases';
    const insertRes = await makeRequest(releasesUrl, 'POST', tracks);

    if (insertRes.status === 201) {
      console.log(`✅ Successfully added ${tracks.length} Spotify tracks!`);
      insertRes.body.forEach((track, i) => {
        console.log(`   ${i + 1}. ${track.title}`);
      });
      process.exit(0);
    } else {
      console.error('❌ Error inserting tracks:');
      console.error('Status:', insertRes.status);
      console.error('Response:', insertRes.body);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addTracks();
