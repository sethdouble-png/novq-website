import { supabase } from '../src/lib/supabaseClient.js';

async function updateBackgroundVideo() {
  try {
    console.log('🔄 Updating background video URL...');

    // First, check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      console.log('❌ Not authenticated. Please log in to /studio first, then run this script.');
      return;
    }

    const userId = session.user.id;
    console.log('✅ Authenticated as user:', userId);

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
        .update({ background_video_url: '/videos/bakgt.mp4' })
        .eq('id', existingSettings.id);

      if (error) {
        console.error('❌ Error updating settings:', error.message);
      } else {
        console.log('✅ Background video URL updated to /videos/bakgt.mp4');
        console.log('📺 Current settings:', { ...existingSettings, background_video_url: '/videos/bakgt.mp4' });
      }
    } else {
      // Create new settings
      const { data, error } = await supabase
        .from('site_settings')
        .insert([{
          profile_id: userId,
          background_video_url: '/videos/bakgt.mp4',
          hero_heading: 'NovQ',
          hero_subheading: 'Music Producer & Artist',
          theme_accent_color: '#e11d48'
        }])
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating settings:', error.message);
      } else {
        console.log('✅ Site settings created with background video URL: /videos/bakgt.mp4');
        console.log('📺 New settings:', data);
      }
    }

    console.log('🎉 Update complete! Refresh your homepage to see the video.');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

updateBackgroundVideo();