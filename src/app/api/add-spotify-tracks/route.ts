import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Test tracks removed - use admin panel to add releases instead
const spotifyTracks: any[] = [];

export async function POST(request: NextRequest) {
  try {
    // Get the auth token from the Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Create Supabase client with the auth token
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    // Get current user from the token
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired auth token' },
        { status: 401 }
      );
    }

    // Get the user's profile (profile_id = user.id)
    const profileId = user.id;

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
      console.error('Insert error:', error);
      return NextResponse.json(
        { error: `Failed to insert tracks: ${error.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Added ${data.length} Spotify tracks`,
      tracks: data,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
