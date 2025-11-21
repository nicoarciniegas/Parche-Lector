# Screenshots Directory

This directory contains screenshots for the Parche Lector frontend documentation.

## Required Screenshots

### Welcome View
- [ ] `welcome-view.png` - Main welcome screen with branding and CTAs

### Login View
- [ ] `login-view.png` - Login form empty state
- [ ] `login-errors.png` - Login form with validation errors
- [ ] `login-loading.png` - Login form during submission

### Register View
- [ ] `register-view.png` - Registration form empty state
- [ ] `register-errors.png` - Registration form with validation errors
- [ ] `register-success.png` - Successful registration state

### Home View
- [ ] `home-view.png` - Main dashboard with trending books
- [ ] `home-search.png` - Search results display
- [ ] `home-menu.png` - User menu dropdown expanded
- [ ] `home-book-menu.png` - Book action menu (add to lists)
- [ ] `home-loading.png` - Loading state with spinner
- [ ] `home-error.png` - Error state with retry button
- [ ] `home-mobile-nav.png` - Mobile bottom navigation
- [ ] `home-book-card.png` - Individual book card detail

### Profile View
- [ ] `profile-view.png` - Full profile page with user info
- [ ] `profile-edit.png` - Edit profile modal opened
- [ ] `profile-lists.png` - Reading lists section detail
- [ ] `profile-empty.png` - Empty reading list state
- [ ] `profile-mobile.png` - Mobile profile layout

## Screenshot Guidelines

### Specifications
- **Format**: PNG (preferred) or WebP
- **Resolution**: Minimum 1280x720 for desktop views
- **Mobile Resolution**: 375x812 (iPhone standard)
- **Quality**: High quality, no compression artifacts
- **File Size**: Keep under 500KB when possible

### Capture Instructions

1. **Browser**: Use latest Chrome or Firefox
2. **Window Size**: 
   - Desktop: 1440px width minimum
   - Mobile: Use responsive mode at 375px width
3. **Clean State**: Remove any development tools or browser extensions from view
4. **Realistic Data**: Use realistic names, books, and content
5. **Consistent Theme**: Ensure all screenshots use same color scheme

### Content Guidelines

#### User Data
- Username: "Ana" or "Sebastian"
- Email: "ana@email.com"
- Avatar: Use DiceBear avatars with seed "Ana"

#### Book Data
- Use real books from Google Books API
- Ensure cover images are visible
- Show variety of ratings (3.5 - 5.0 stars)

#### States to Capture
1. **Empty States**: Show helpful empty messages
2. **Populated States**: Show realistic amounts of data (3-6 books per category)
3. **Error States**: Show user-friendly error messages
4. **Loading States**: Show spinners or skeletons

### Naming Convention

Follow the naming pattern:
```
<view>-<state>.png
```

Examples:
- `home-view.png` (default state)
- `home-search.png` (specific feature)
- `login-errors.png` (error state)

### How to Take Screenshots

#### Desktop Screenshots
1. Open the application in your browser
2. Set window width to 1440px
3. Navigate to the desired view/state
4. Use browser DevTools: `Cmd/Ctrl + Shift + P` → "Capture screenshot"
5. Or use OS screenshot tool (crop to content area)
6. Save to this directory

#### Mobile Screenshots
1. Open browser DevTools (F12)
2. Toggle device toolbar (Cmd/Ctrl + Shift + M)
3. Select "iPhone 12 Pro" or custom 375x812
4. Navigate to desired state
5. Capture screenshot
6. Save with `-mobile` suffix

### Image Optimization

After capturing screenshots:
1. Crop to relevant content area
2. Remove unnecessary whitespace
3. Optimize file size using tools like:
   - [TinyPNG](https://tinypng.com/)
   - [ImageOptim](https://imageoptim.com/)
   - `pngquant` command-line tool

### Placeholder Images

Until actual screenshots are captured, the documentation references placeholder paths. Replace these systematically as you capture each screenshot.

---

## Screenshot Checklist

Use this checklist when capturing screenshots:

### Pre-Capture
- [ ] Browser window at correct resolution
- [ ] Dev tools closed (except for mobile simulation)
- [ ] Realistic data loaded
- [ ] UI in desired state (menu open, form filled, etc.)
- [ ] No browser extensions visible

### Post-Capture
- [ ] Image cropped appropriately
- [ ] File size optimized
- [ ] Named according to convention
- [ ] Saved in this directory
- [ ] Visually reviewed for quality

### Documentation Update
- [ ] Referenced in README.md
- [ ] Referenced in architecture.md
- [ ] Referenced in components.md
- [ ] Referenced in user-guide.md

---

**Last Updated**: 2025-11-21
