import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body?.email?.trim?.();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const { error } = await supabase.from('newsletter_subscribers').insert([
      {
        email,
      },
    ]);

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ success: true, message: 'Already subscribed.' });
      }

      console.error('Newsletter insert error:', error);
      return NextResponse.json({ error: 'Unable to subscribe at this time.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter route error:', error);
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
