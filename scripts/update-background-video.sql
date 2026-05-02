-- Update background video URL for existing site settings
-- Replace 'your-user-id-here' with your actual Supabase user ID

UPDATE site_settings
SET background_video_url = '/videos/bakgt.mp4'
WHERE profile_id = (
  SELECT id FROM profiles LIMIT 1
);

-- If no site_settings exists, create one
INSERT INTO site_settings (profile_id, background_video_url, hero_heading, hero_subheading, theme_accent_color)
SELECT
  p.id,
  '/videos/bakgt.mp4',
  'NovQ',
  'Music Producer & Artist',
  '#e11d48'
FROM profiles p
WHERE NOT EXISTS (
  SELECT 1 FROM site_settings WHERE profile_id = p.id
);