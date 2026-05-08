-- Migration to add is_upcoming column to releases table
-- Run this SQL in your Supabase SQL editor

ALTER TABLE releases ADD COLUMN IF NOT EXISTS is_upcoming BOOLEAN DEFAULT false;

-- Update existing releases to be not upcoming (they are already released)
UPDATE releases SET is_upcoming = false WHERE is_upcoming IS NULL;

-- Add a comment for documentation
COMMENT ON COLUMN releases.is_upcoming IS 'Whether this release is upcoming (not yet available) or already released';