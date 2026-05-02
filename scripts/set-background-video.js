import { supabase } from './lib/supabaseClient';

async function setBackgroundVideo() {
  try {
    // First, get the current user session
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      console.log('❌ Not logged in. Please log in to /studio first');
      return;
    }

    const userId = session.user.id;
    console.log('✅ Logged in as:', userId);

    // Check if site_settings exists
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
      }
    } else {
      // Create new settings
      const { error } = await supabase
        .from('site_settings')
        .insert([{
          profile_id: userId,
          background_video_url: '/videos/bakgt.mp4',
          hero_heading: 'NovQ',
          hero_subheading: 'Music Producer & Artist',
          theme_accent_color: '#e11d48'
        }]);

      if (error) {
        console.error('❌ Error creating settings:', error.message);
      } else {
        console.log('✅ Site settings created with background video URL: /videos/bakgt.mp4');
      }
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

setBackgroundVideo();