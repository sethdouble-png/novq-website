import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase public credentials in environment variables');
}

const createAuthClient = (token: string) =>
  createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

const createPublicClient = () => createClient(supabaseUrl, supabaseAnonKey);


const getUserFromRequest = async (request: NextRequest) => {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  const authClient = createAuthClient(token);
  const { data, error } = await authClient.auth.getUser(token);

  if (error || !data.user) {
    return null;
  }

  return data.user;
};

export async function GET() {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('spotify_embeds')
      .select('id, embed_code, sort_order, created_at')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching spotify embeds:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('GET /api/spotify-embeds error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const embedCode = typeof body.embed_code === 'string' ? body.embed_code.trim() : '';
    if (!embedCode) {
      return NextResponse.json({ error: 'Embed code is required' }, { status: 400 });
    }

    const supabase = createAuthClient(token);
    const { data, error } = await supabase
      .from('spotify_embeds')
      .insert({
        profile_id: user.id,
        embed_code: embedCode,
        sort_order: body.sort_order ?? 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting spotify embed:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('POST /api/spotify-embeds error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const embedId = request.nextUrl.searchParams.get('id');
    if (!embedId) {
      return NextResponse.json({ error: 'Embed ID is required' }, { status: 400 });
    }

    const supabase = createAuthClient(token);

    const { data: existing, error: fetchError } = await supabase
      .from('spotify_embeds')
      .select('profile_id')
      .eq('id', embedId)
      .single();

    if (fetchError) {
      console.error('Error fetching embed before delete:', fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!existing || existing.profile_id !== user.id) {
      return NextResponse.json({ error: 'Not allowed to delete this embed' }, { status: 403 });
    }

    const { error } = await supabase.from('spotify_embeds').delete().eq('id', embedId);
    if (error) {
      console.error('Error deleting spotify embed:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/spotify-embeds error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
