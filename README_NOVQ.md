# NovQ - Artist Website & Admin Panel

A production-ready artist website and admin panel for NovQ, built with Next.js 14, Supabase, and Tailwind CSS.

## Features

- **Public Website**: Cinematic, dark-themed artist portfolio
- **Admin Panel**: Hidden at `/studio` - manage profile, releases, links, press items, and site settings
- **Supabase Integration**: Real-time database and authentication
- **Image Management**: Secure image uploads to Supabase Storage
- **TypeScript**: Fully typed for production readiness
- **Responsive Design**: Mobile-first design approach
- **Authentication**: Email/password admin login

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Public homepage
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── studio/
│       ├── page.tsx              # Admin login page
│       └── dashboard/
│           ├── page.tsx          # Dashboard wrapper
│           └── DashboardContent.tsx # Dashboard content
├── components/
│   ├── Header.tsx                # Public site header
│   ├── Hero.tsx                  # Hero section
│   ├── Footer.tsx                # Footer
│   ├── ReleaseCard.tsx           # Release card component
│   ├── PressCard.tsx             # Press item card
│   ├── ImageWithFallback.tsx     # Image handling
│   ├── ProtectedRoute.tsx        # Auth protection wrapper
│   ├── AdminLayout.tsx           # Admin sidebar layout
│   ├── ImageUpload.tsx           # Image upload component
│   ├── ProfileForm.tsx           # Profile editor
│   ├── SiteSettingsForm.tsx      # Site settings editor
│   ├── LinksManager.tsx          # Links CRUD
│   ├── ReleasesManager.tsx       # Releases CRUD
│   └── PressManager.tsx          # Press items CRUD
└── lib/
    ├── supabaseClient.ts         # Supabase client
    ├── types.ts                  # TypeScript types
    ├── storageUtils.ts           # Storage utilities
    └── database.sql              # Schema reference
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Database

1. Go to [Supabase](https://supabase.com) and create a project
2. Copy the provided SQL schema from `src/lib/database.sql`
3. Run all SQL snippets in your Supabase SQL editor:
   - Create tables: `profiles`, `links`, `releases`, `press_items`, `site_settings`
   - Enable Row Level Security (RLS)
   - Create RLS policies (see database.sql)

### 3. Create Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Create a new bucket named `novq-media`
3. Make it **Public** (for simplicity) or configure signed URLs as preferred

### 4. Set Up Authentication

1. In Supabase, go to **Authentication > Users**
2. Create a user with email: `richseth478@gmail.com`
3. Set a password for admin login

### 5. Environment Variables

The `.env.local` file is pre-configured with:

```
NEXT_PUBLIC_SUPABASE_URL=https://amuuotezgxojzolhsaury.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_STORAGE_BUCKET=novq-media
```

**These are already set.** No secrets are exposed - only the public anonymous key.

### 6. Run Development Server

```bash
npm run dev
```

Visit:
- **Public site**: [http://localhost:3000](http://localhost:3000)
- **Admin panel**: [http://localhost:3000/studio](http://localhost:3000/studio)

## Usage

### Public Website

The homepage automatically displays:
- Hero section with artist name and tagline
- About section with biography and avatar
- Latest releases with cover art
- Links to streaming platforms
- Press/EPK section
- Footer

All content is fetched from Supabase in real-time.

### Admin Panel

Access at `/studio` (hidden from navigation):

1. **Login**: Use `richseth478@gmail.com` and your password
2. **Profile**: Edit artist name, tagline, bio, avatar, and hero image
3. **Site Settings**: Customize hero heading, subheading, background video, and accent color
4. **Links**: Add/edit/delete links to Spotify, Apple Music, Instagram, etc.
5. **Releases**: Manage music releases with cover art and listen URLs
6. **Press/EPK**: Add press items, articles, and media for the EPK

### Image Upload

- Click "Choose Image" in any upload field
- Images are stored in Supabase Storage (`novq-media` bucket)
- Public URLs are automatically generated
- Delete images to remove them from storage

## Deployment

### Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel project settings
4. Deploy automatically

### Other Platforms

- **Netlify**: Use Next.js runtime
- **AWS Amplify**: Configure with Next.js build settings
- **Self-hosted**: Run `npm run build` then `npm start`

## Database Schema

### profiles
```sql
id (uuid, PK)
display_name (text)
tagline (text)
bio (text)
hero_image_url (text, nullable)
avatar_url (text, nullable)
updated_at (timestamp)
```

### links
```sql
id (uuid, PK)
profile_id (uuid, FK)
label (text)
url (text)
sort_order (int)
is_active (boolean)
created_at (timestamp)
```

### releases
```sql
id (uuid, PK)
profile_id (uuid, FK)
title (text)
subtitle (text, nullable)
cover_image_url (text, nullable)
listen_url (text)
release_date (date, nullable)
sort_order (int)
is_featured (boolean)
created_at (timestamp)
```

### press_items
```sql
id (uuid, PK)
profile_id (uuid, FK)
title (text)
description (text, nullable)
image_url (text, nullable)
link_url (text, nullable)
sort_order (int)
created_at (timestamp)
```

### site_settings
```sql
id (uuid, PK)
profile_id (uuid, FK)
hero_heading (text)
hero_subheading (text)
background_video_url (text, nullable)
theme_accent_color (text)
updated_at (timestamp)
```

## Customization

### Change Accent Color

Edit the accent color in `/src/app/globals.css`:

```css
--accent: #e11d48; /* Change to your color */
```

Or update via admin panel > Site Settings

### Modify Hero Section

Edit `/src/components/Hero.tsx` to customize animation or layout

### Add New Sections

Create new components in `/src/components/` and add to `/src/app/page.tsx`

## Security Notes

- **Anon Key Only**: The public SUPABASE_ANON_KEY is safe to expose (intended for public use)
- **RLS Policies**: Supabase RLS ensures users can only modify their own data
- **Admin Access**: Only authenticated users can access `/studio`
- **Images**: Store sensitive files in private storage bucket

## Troubleshooting

### Images not showing
- Check Supabase Storage bucket is public or has proper RLS policies
- Verify file paths are correct
- Check browser console for CORS errors

### Admin login not working
- Confirm user exists in Supabase Auth
- Check email/password combination
- Verify environment variables are loaded

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

## Support

For Supabase issues: [Supabase Docs](https://supabase.com/docs)
For Next.js questions: [Next.js Docs](https://nextjs.org/docs)

## License

Licensed for NovQ use only.
