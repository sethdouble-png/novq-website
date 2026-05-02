# Spotify Integration & Responsive Design Update

## Changes Made

### 1. ✅ Spotify Embed Component Created
- **File**: [src/components/SpotifyEmbed.tsx](src/components/SpotifyEmbed.tsx)
- **Features**:
  - Automatically extracts track ID from Spotify URLs
  - Renders responsive Spotify iframe embeds
  - Fully responsive with customizable height
  - Handles invalid URLs gracefully

### 2. ✅ Enhanced ReleaseCard Component
- **File**: [src/components/ReleaseCard.tsx](src/components/ReleaseCard.tsx)
- **Updates**:
  - Auto-detects Spotify URLs in `listen_url` field
  - Shows "Play on Spotify" button for Spotify tracks
  - Toggles between cover art view and embedded player
  - Maintains original link behavior for non-Spotify URLs
  - Spotify player uses green accent (#1DB954) matching Spotify branding

### 3. ✅ Background Video Support in Hero
- **File**: [src/components/Hero.tsx](src/components/Hero.tsx)
- **Updates**:
  - Added `backgroundVideo` prop for HTML5 video element
  - Supports MP4 and other standard video formats
  - Falls back to background image, then gradient if no video/image
  - Proper autoplay, muted, loop settings for seamless playback
  - Videos will stretch to fill the hero section

### 4. ✅ Page Component Updated
- **File**: [src/app/page.tsx](src/app/page.tsx)
- **Updates**:
  - Passes `background_video_url` from siteSettings to Hero component
  - Automatically displays video if URL exists in database

### 5. ✅ Responsive Design Verified
- **Mobile (375px)**: ✓ Buttons stack vertically, text readable, hero scales properly
- **Tablet (768px)**: ✓ Hero image displays, layout adjusts correctly
- **Desktop (1920px)**: ✓ Full hero section with image, buttons display side-by-side

## How to Use Spotify Embeds

### Option 1: Use Admin Panel (Recommended)
1. Go to `/studio` and log in
2. Navigate to "Releases Manager" tab
3. Add a new release with Spotify URL format:
   ```
   https://open.spotify.com/embed/track/TRACK_ID?utm_source=generator
   ```
4. The component automatically detects it's Spotify and shows the player

### Option 2: Manual Database Insert
The three Spotify tracks provided:
- Track 1: `https://open.spotify.com/embed/track/2D46uc9ktc2OMBmApdsKuQ?utm_source=generator`
- Track 2: `https://open.spotify.com/embed/track/6b8Lrh07NDMc9rHP3JG82e?utm_source=generator`
- Track 3: `https://open.spotify.com/embed/track/4kZgn3ORmsigLQZuIiEVpV?utm_source=generator`

To add them manually, go to [Supabase Dashboard](https://app.supabase.com) > releases table > Insert these rows with:
- `profile_id`: your profile ID (from profiles table)
- `title`: Track title
- `listen_url`: Spotify URL from above
- `release_date`: today's date
- `sort_order`: 1, 2, 3
- `is_featured`: true

### Option 3: Use Helper Script (requires auth token)
```bash
node scripts/add-spotify-tracks.js
```
This script requires you to be authenticated via Supabase CLI.

## Background Video Feature

### How to Upload a Video
1. Go to `/studio` > Settings Manager tab
2. Paste video URL in "Background Video URL" field
3. Video must be:
   - MP4 format (H.264 codec)
   - Hosted on CORS-enabled server (e.g., Supabase Storage, Cloudinary, S3)
   - Example: `https://your-storage.supabase.co/storage/v1/object/public/videos/hero.mp4`

### Supported Video Formats
- MP4 (H.264/AVC)
- WebM (VP8/VP9)
- Ogg (Theora)

### Video Behavior
- Autoplays (muted) on load
- Loops continuously
- Works on mobile and desktop
- Falls back to hero image if video fails to load
- Video always maintains aspect ratio and fills the hero section

## Testing Checklist

- [x] **Mobile (375px)**: Responsive hero, buttons stack correctly
- [x] **Tablet (768px)**: Hero image displays, layout adapts
- [x] **Desktop (1920px)**: Full viewport hero, side-by-side buttons
- [ ] **Spotify Embeds**: Test by adding tracks to database (follow instructions above)
- [ ] **Background Video**: Test by uploading video URL in Settings Manager
- [ ] **Mobile Video Performance**: Verify video loads quickly on 4G
- [ ] **Accessibility**: Test with keyboard navigation (Tab/Enter)

## Build Status
✅ Production build successful (npm run build)
✅ Dev server running on localhost:3000
✅ TypeScript compilation successful
✅ No console errors (except expected 401 auth errors on unauthenticated pages)

## Next Steps
1. **Add Spotify Tracks**: Use admin panel or helper script to add the three tracks
2. **Test Background Video**: Upload a test MP4 to Supabase Storage and use its URL
3. **Verify On Mobile**: Test on actual device or browser dev tools to ensure responsiveness
4. **Deploy**: When ready, push to production and verify all features work

## Environment Variables (Verify in .env.local)
```
NEXT_PUBLIC_SUPABASE_URL=https://amuuotezgxojzolhsauy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
NEXT_PUBLIC_STORAGE_BUCKET=novq-media
```

## Files Modified
- ✅ Created: `src/components/SpotifyEmbed.tsx`
- ✅ Modified: `src/components/ReleaseCard.tsx`
- ✅ Modified: `src/components/Hero.tsx`
- ✅ Modified: `src/app/page.tsx`
- ✅ Created: `scripts/add-spotify-tracks.js`

## Troubleshooting

**Q: Spotify embed not showing?**
- A: Ensure listen_url contains "spotify.com" and is a valid Spotify track URL
- Check browser console for errors

**Q: Background video not playing?**
- A: Check video URL is accessible (test in browser address bar)
- Ensure video format is MP4 (H.264)
- Check network tab in dev tools for 404/CORS errors

**Q: Responsive design looks wrong on specific device?**
- A: Open Dev Tools (F12) > Toggle Device Toolbar (Ctrl+Shift+M)
- Test at specific breakpoints: 375px, 768px, 1024px, 1920px
- Zoom browser to 100% for accurate testing

