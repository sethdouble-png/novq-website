export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return Response.json(
      {
        status: 'error',
        message: 'Missing Supabase credentials in environment variables',
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
      },
      { status: 500 }
    );
  }

  try {
    // Test connectivity to Supabase
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'HEAD',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
    });

    return Response.json({
      status: 'success',
      message: 'Supabase API is reachable',
      url: supabaseUrl,
      statusCode: response.status,
    });
  } catch (error: any) {
    return Response.json(
      {
        status: 'error',
        message: 'Cannot reach Supabase API',
        url: supabaseUrl,
        error: error.message,
        troubleshooting: [
          '1. Verify NEXT_PUBLIC_SUPABASE_URL in .env.local is correct',
          '2. Check if Supabase project exists and is active',
          '3. Verify internet connection',
          '4. Check if firewall is blocking requests to Supabase',
        ],
      },
      { status: 500 }
    );
  }
}
