/*
  SPOTIFY EMBEDS TABLE
  Add this to your Supabase database
*/

CREATE TABLE IF NOT EXISTS spotify_embeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  embed_code TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE spotify_embeds ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read spotify_embeds" ON spotify_embeds FOR SELECT USING (true);

-- Allow profile owner to manage their embeds
CREATE POLICY "Allow users to manage own embeds" ON spotify_embeds FOR ALL USING (
  profile_id IN (SELECT id FROM profiles WHERE id = auth.uid())
);
