# NovQ Responsive Design System

## Overview
This document outlines the complete responsive design implementation for the NovQ artist website, covering all breakpoints from mobile to ultrawide displays.

---

## Breakpoint Reference

| Breakpoint | Screen Size | Use Case |
|-----------|-----------|----------|
| `default` | < 640px | Mobile phones |
| `sm` | ≥ 640px | Large phones / small tablets |
| `md` | ≥ 768px | Tablets |
| `lg` | ≥ 1024px | Laptops / small desktops |
| `xl` | ≥ 1280px | Desktops |
| `2xl` | ≥ 1536px | Large monitors / ultrawide |

---

## Responsive Patterns Used

### 1. **Container Pattern**
```tsx
// Mobile-first container that grows with screen size
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content scales within max-width */}
</div>
```
- `max-w-7xl`: Max width caps at 80rem (1280px)
- `mx-auto`: Centers container
- `px-4`: 1rem padding on mobile
- `sm:px-6`: 1.5rem on small screens
- `lg:px-8`: 2rem on larger screens

### 2. **Typography Scaling**
```tsx
// Mobile-first text sizing
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
  {heading}
</h1>

<p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
  {description}
</p>
```
Progression:
- Mobile: `text-4xl` (2.25rem)
- Small: `sm:text-5xl` (3rem)
- Tablet: `md:text-6xl` (3.75rem)
- Laptop: `lg:text-7xl` (4.5rem)
- Desktop: `xl:text-8xl` (6rem)

### 3. **Spacing & Gap Pattern**
```tsx
// Mobile-first gap scaling
<div className="gap-4 sm:gap-6 md:gap-8 lg:gap-12">
  {/* Gap: 1rem → 1.5rem → 2rem → 3rem */}
</div>

// Responsive margins
<section className="py-8 sm:py-12 md:py-16 lg:py-24">
  {/* Padding: 2rem → 3rem → 4rem → 6rem */}
</section>
```

### 4. **Grid Layout Pattern**
```tsx
// Mobile-first responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
  {/* 1 col → 2 cols → 3 cols → 4 cols → 5 cols */}
</div>
```

### 5. **Flexbox Pattern**
```tsx
// Mobile stacks vertically, spreads horizontally on larger screens
<div className="flex flex-col sm:flex-row gap-4 md:gap-6">
  {/* Stacks on mobile, rows on sm+ */}
</div>
```

### 6. **Two-Column Layout Pattern**
```tsx
// Mobile-first column ordering
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
  <div className="order-2 md:order-1">Text content</div>
  <div className="order-1 md:order-2">Image content</div>
</div>
```

### 7. **Image Sizing Pattern**
```tsx
// Responsive image with aspect ratio
<div className="relative w-full aspect-square rounded-lg lg:rounded-2xl overflow-hidden">
  <Image
    src={url}
    alt="description"
    fill
    className="w-full h-full object-cover"
  />
</div>

// Or responsive height
<div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-screen">
  <Image src={url} alt="description" fill className="object-cover" />
</div>
```

### 8. **Button/CTA Pattern**
```tsx
// Mobile-first responsive button
<button className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg">
  {/* Width: 1rem → 1.5rem → 2rem */}
  {/* Height: 0.5rem → 0.75rem → 1rem */}
  {/* Font: sm → base → lg */}
</button>
```

### 9. **Card/Component Pattern**
```tsx
// Responsive card padding
<div className="bg-[#0f0f15] p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg border">
  {/* Padding: 1rem → 1.25rem → 1.5rem → 2rem */}
</div>
```

### 10. **Hidden/Visible Pattern**
```tsx
// Show/hide based on screen size
<div className="hidden sm:block">
  {/* Hidden on mobile, visible sm+ */}
</div>

<div className="block md:hidden">
  {/* Visible on mobile, hidden md+ */}
</div>
```

---

## Sections Implementation

### Hero Section
```tsx
<section className="relative w-full min-h-screen flex items-center justify-center">
  {/* Background video/image - fills entire section */}
  <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 text-center">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Heading</h1>
    <p className="text-base sm:text-lg md:text-xl lg:text-2xl">Subheading</p>
  </div>
</section>
```
✓ Fills viewport on all sizes
✓ Content centered and responsive
✓ Maintains aspect ratio

### About Section
```tsx
<section className="w-full bg-[#050509]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-24">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
      <div>Text content stacks on mobile</div>
      <div>Image stacks on mobile</div>
    </div>
  </div>
</section>
```
✓ Stacks on mobile (1 column)
✓ Spreads on tablet+ (2 columns)
✓ Responsive gap and padding

### Music/Releases Section
```tsx
<section className="w-full bg-[#050509]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-24">
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8 md:mb-12 lg:mb-16">
      Latest Releases
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
      {/* Cards */}
    </div>
  </div>
</section>
```
✓ 1 column on mobile
✓ 2 columns on small screens
✓ 3 columns on laptops
✓ 4 columns on large displays

### Footer
```tsx
<footer className="border-t border-[#1a1a2e] bg-[#050509]/50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
      {/* Content */}
    </div>
  </div>
</footer>
```
✓ Stacks on mobile
✓ Spreads on tablet+
✓ Responsive text sizes

---

## Mobile-First Development Checklist

- ✅ Start with mobile styles (no breakpoint)
- ✅ Add `sm:` for 640px+
- ✅ Add `md:` for 768px+
- ✅ Add `lg:` for 1024px+
- ✅ Add `xl:` for 1280px+
- ✅ Add `2xl:` for 1536px+
- ✅ Test at each breakpoint
- ✅ Use `px-4` base padding, scale up
- ✅ Use `gap-4` base gap, scale up
- ✅ Use `text-base` base font size, scale up
- ✅ Verify no overflow on mobile
- ✅ Verify no excessive whitespace on desktop

---

## Testing Breakpoints (Chrome DevTools)

1. **Mobile (320px)**: Text reads, no overflow, buttons tap-able
2. **Tablet (768px)**: Content spreads naturally, grids show 2 cols
3. **Laptop (1024px)**: Full layout, grids show 3+ cols
4. **Desktop (1280px)**: Content capped, balanced spacing
5. **Ultrawide (1920px+)**: Max-width respected, no stretching

---

## Common Issues & Solutions

### Issue: Text too big on mobile
**Solution**: Use smaller base size, scale up: `text-base md:text-xl lg:text-2xl`

### Issue: Grid too cramped
**Solution**: Use responsive gaps: `gap-4 md:gap-6 lg:gap-8`

### Issue: Images break layout
**Solution**: Use `w-full h-auto` or `aspect-ratio` with `object-cover`

### Issue: Container too wide on desktop
**Solution**: Use `max-w-7xl mx-auto` to cap width

### Issue: Mobile menu too cramped
**Solution**: Use `hidden md:block` to swap layouts

---

## Color & Brand Reference

```tsx
// Background
--background: #050509
--secondary: #1a1a2e

// Text
--foreground: #f5f5f7
--accent: #e11d48
--accent-light: #fb7185

// Borders
--border: #1a1a2e
```

---

## Final Notes

- **Mobile First**: Always start with mobile styles
- **Progressive Enhancement**: Add features as screen grows
- **Performance**: Smaller mobile bundles, optimize images for each size
- **Accessibility**: Ensure tap targets are 44px+ on mobile
- **Testing**: Test real devices, not just Chrome DevTools