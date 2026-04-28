/*
  SUPABASE DATABASE SCHEMA FOR NOVQ ARTIST WEBSITE
  
  Run these SQL snippets in your Supabase SQL editor to set up the database.
  Ensure Row Level Security (RLS) is enabled for production use.
  
  ========================================
  1. PROFILES TABLE
  ========================================
*/

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT 'NovQ',
  tagline TEXT NOT NULL DEFAULT 'Music Producer & Artist',
  bio TEXT,
  hero_image_url TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read" ON profiles FOR SELECT USING (true);

-- Allow authenticated users to update their own profile
CREATE POLICY "Allow users to update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

/*
  ========================================
  2. LINKS TABLE (Social/Streaming)
  ========================================
*/

CREATE TABLE IF NOT EXISTS links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- Allow public read active links only
CREATE POLICY "Allow public read active links" ON links FOR SELECT USING (is_active = true);

-- Allow profile owner to manage links
CREATE POLICY "Allow profile owner to manage links" ON links FOR ALL USING (
  profile_id IN (SELECT id FROM profiles WHERE id = auth.uid())
);

/*
  ========================================
  3. RELEASES TABLE
  ========================================
*/

CREATE TABLE IF NOT EXISTS releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  cover_image_url TEXT,
  listen_url TEXT NOT NULL,
  release_date DATE,
  sort_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE releases ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read releases" ON releases FOR SELECT USING (true);

-- Allow profile owner to manage releases
CREATE POLICY "Allow profile owner to manage releases" ON releases FOR ALL USING (
  profile_id IN (SELECT id FROM profiles WHERE id = auth.uid())
);

/*
  ========================================
  4. PRESS ITEMS TABLE
  ========================================
*/

CREATE TABLE IF NOT EXISTS press_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE press_items ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read press items" ON press_items FOR SELECT USING (true);

-- Allow profile owner to manage press items
CREATE POLICY "Allow profile owner to manage press items" ON press_items FOR ALL USING (
  profile_id IN (SELECT id FROM profiles WHERE id = auth.uid())
);

/*
  ========================================
  5. SITE SETTINGS TABLE
  ========================================
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  hero_heading TEXT DEFAULT 'NovQ',
  hero_subheading TEXT DEFAULT 'Music Producer & Artist',
  background_video_url TEXT,
  theme_accent_color TEXT DEFAULT '#e11d48',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read site settings" ON site_settings FOR SELECT USING (true);

-- Allow profile owner to update settings
CREATE POLICY "Allow profile owner to update settings" ON site_settings FOR UPDATE USING (
  profile_id IN (SELECT id FROM profiles WHERE id = auth.uid())
);

/*
  ========================================
  STORAGE SETUP
  ========================================
  
  Create a public storage bucket named "novq-media" in your Supabase project:
  
  1. Go to Storage in Supabase dashboard
  2. Click "New bucket"
  3. Name it "novq-media"
  4. Make it Public (or configure RLS policies as needed)
  5. Files will be stored with paths like: images/{uuid}-{filename}
  
  Note: The application uses public URLs via:
  supabase.storage.from('novq-media').getPublicUrl(path)
*/
