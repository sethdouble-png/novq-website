import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    // Get the current session
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await request.json();

    // Check if site_settings exists for this user
    const { data: existingSettings } = await supabase
      .from('site_settings')
      .select('*')
      .eq('profile_id', userId)
      .maybeSingle();

    if (existingSettings) {
      // Update existing settings
      const { error } = await supabase
        .from('site_settings')
        .update(body)
        .eq('id', existingSettings.id);

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Site settings updated',
        data: { ...existingSettings, ...body }
      });
    } else {
      // Create new settings
      const { data, error } = await supabase
        .from('site_settings')
        .insert([{
          profile_id: userId,
          ...body
        }])
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Site settings created',
        data
      });
    }

  } catch (error) {
    console.error('Site settings API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get the current session
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Get site settings
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('profile_id', userId)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || null
    });

  } catch (error) {
    console.error('Site settings GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}