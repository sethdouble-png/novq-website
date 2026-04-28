# 🚀 Quick Reference Guide

## Essential Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Install dependencies
npm install
```

---

## Key URLs

```
Public Site:        http://localhost:3000
Admin Login:        http://localhost:3000/studio
Admin Dashboard:    http://localhost:3000/studio/dashboard
```

---

## Admin Credentials

```
Email:              richseth478@gmail.com
Password:           (set in Supabase Auth)
```

---

## Environment Variables

File: `.env.local` (Already configured)

```
NEXT_PUBLIC_SUPABASE_URL=https://amuuotezgxojzolhsaury.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_STORAGE_BUCKET=novq-media
```

---

## Database Setup Checklist

- [ ] Copy SQL from `src/lib/database.sql`
- [ ] Run all snippets in Supabase SQL editor
- [ ] Create `novq-media` storage bucket (Public)
- [ ] Create admin user: richseth478@gmail.com
- [ ] Verify tables exist in Supabase
- [ ] Test login at /studio

---

## Common Tasks

### Add a Social Link
1. Go to /studio → Links tab
2. Enter label (e.g., "Spotify")
3. Paste URL
4. Click "Add Link"

### Upload a Release
1. Go to /studio → Releases tab
2. Fill in title, subtitle, listen URL
3. Set release date (optional)
4. Upload cover image
5. Check "Featured" if needed
6. Click "Add Release"

### Update Hero Text
1. Go to /studio → Site Settings
2. Edit "Hero Heading" and "Hero Subheading"
3. Click "Save Settings"

### Change Accent Color
1. Go to /studio → Site Settings
2. Click the color picker or enter hex code
3. Click "Save Settings"

### Delete Content
1. Click "Delete" button on any item
2. Confirm deletion
3. Page updates automatically

---

## File Locations

### To Edit Theme Colors
```
src/app/globals.css
```

### To Edit Homepage Content
```
src/app/page.tsx
```

### To Add Admin Features
```
src/app/studio/dashboard/
```

### To Add Public Sections
```
src/components/
```

---

## Troubleshooting

### Images not showing?
- [ ] Check Supabase Storage bucket is Public
- [ ] Verify file uploaded successfully
- [ ] Check browser console for errors

### Admin login fails?
- [ ] Confirm user exists in Supabase Auth
- [ ] Check email and password
- [ ] Try signing out and in again

### Build errors?
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Try building again
npm run build
```

### Port 3000 already in use?
```bash
# Use different port
npm run dev -- -p 3001
```

---

## Useful Supabase Links

```
SQL Editor:         https://supabase.com/dashboard
Auth Users:         https://supabase.com/dashboard/auth/users
Storage:            https://supabase.com/dashboard/storage/buckets
Database:           https://supabase.com/dashboard/editor
```

---

## Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test admin features in production build
- [ ] Add environment variables to hosting platform
- [ ] Set up custom domain (if needed)
- [ ] Configure SSL/HTTPS (usually automatic)
- [ ] Test on deployed URL
- [ ] Monitor performance and errors

---

## Component Reference

### Public Site Components
```
Header.tsx           - Navigation bar
Hero.tsx             - Hero section with CTA
ReleaseCard.tsx      - Single release card
PressCard.tsx        - Single press item card
Footer.tsx           - Footer content
```

### Admin Components
```
ProtectedRoute.tsx   - Auth protection wrapper
AdminLayout.tsx      - Sidebar layout
ProfileForm.tsx      - Edit profile
SiteSettingsForm.tsx - Edit settings
LinksManager.tsx     - Manage links
ReleasesManager.tsx  - Manage releases
PressManager.tsx     - Manage press items
ImageUpload.tsx      - Image upload component
```

---

## TypeScript Types

All types are defined in `src/lib/types.ts`:

```typescript
Profile
Link
Release
PressItem
SiteSettings
```

---

## Styling Classes

### Global Classes
```
.btn-primary        - Filled button
.btn-secondary      - Outlined button
.btn-ghost          - Text button
.card               - Card component
.input-field        - Form input
.section-container  - Content container
```

### Tailwind Utilities
```
w-full              - Full width
bg-[#050509]        - Dark background
text-[#f5f5f7]      - Light text
border-[#1a1a2e]    - Border color
gap-4               - Spacing
```

---

## Performance Tips

1. **Images**: Optimize before upload
2. **Releases**: Limit to 20 per page initially
3. **Links**: Keep under 10 active links
4. **Descriptions**: Keep text concise

---

## Security Reminders

✅ Only share `/studio` URL with yourself
✅ Change admin password regularly
✅ Keep .env.local secure
✅ Don't share Supabase credentials
✅ Review RLS policies periodically

---

## Getting Help

- **Documentation**: See README_NOVQ.md
- **Full Summary**: See PROJECT_SUMMARY.md
- **Setup Guide**: See SETUP_GUIDE.md
- **Database Schema**: See src/lib/database.sql

---

## Need More Features?

Common additions:
- [ ] Email contact form
- [ ] Analytics tracking
- [ ] Search functionality
- [ ] Comments/ratings
- [ ] Newsletter signup
- [ ] Custom domain

All easily added with the existing foundation!

---

*Last Updated: April 28, 2026*
*For NovQ Artist Website v1.0*
