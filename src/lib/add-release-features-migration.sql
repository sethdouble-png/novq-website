-- Migration to add pre-save, pre-order URLs and alert settings to releases table
-- Run this SQL in your Supabase SQL editor

ALTER TABLE releases ADD COLUMN IF NOT EXISTS pre_save_url TEXT;
ALTER TABLE releases ADD COLUMN IF NOT EXISTS pre_order_url TEXT;
ALTER TABLE releases ADD COLUMN IF NOT EXISTS enable_alerts BOOLEAN DEFAULT true;

-- Add comments for documentation
COMMENT ON COLUMN releases.pre_save_url IS 'URL for pre-saving the release (e.g., Spotify pre-save link)';
COMMENT ON COLUMN releases.pre_order_url IS 'URL for pre-ordering the release';
COMMENT ON COLUMN releases.enable_alerts IS 'Whether to send release alerts to subscribers when this track releases';