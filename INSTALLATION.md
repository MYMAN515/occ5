# 📱 Installation Guide

## Quick Start (Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open in Browser
Visit: http://localhost:3000

## Production Build

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## Installing as a Mobile App

### iPhone/iPad (iOS)
1. Open Safari (must use Safari, not Chrome)
2. Navigate to your app URL
3. Tap the Share button (square with arrow pointing up)
4. Scroll down and tap "Add to Home Screen"
5. Name the app (default: "Puberty Guide")
6. Tap "Add" in top right
7. App icon appears on home screen!

**Features on iOS:**
- Runs in full screen
- App icon on home screen
- Works offline
- Splash screen when opening

### Android Phone/Tablet
1. Open Google Chrome
2. Navigate to your app URL
3. Tap the three-dot menu (top right)
4. Tap "Add to Home Screen"
5. OR look for the install banner at bottom
6. Tap "Install"
7. Confirm installation

**Features on Android:**
- Native app experience
- Works offline
- Appears in app drawer
- Can share like any app

### Desktop (Windows/Mac/Linux)
1. Open Chrome, Edge, or compatible browser
2. Navigate to your app URL
3. Look for install icon in address bar
4. Click the install icon
5. Or go to menu → "Install [App Name]"
6. App opens in its own window

## Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Static Export
```bash
npm run build
# Deploy the 'out' folder to any static host
```

## Requirements

- Node.js 18 or higher
- npm 9 or higher
- Modern browser (Chrome, Safari, Firefox, Edge)

## Troubleshooting

### "npm install" fails
```bash
# Clear cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
# Check Node version
node --version  # Should be 18+

# Update dependencies
npm update
```

### PWA not installing
- Ensure you're on HTTPS (or localhost)
- Check manifest.json is accessible
- Clear browser cache
- Try incognito/private mode

### Language not switching
- Clear browser local storage
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors

## Testing PWA Features

### Service Worker
1. Open DevTools (F12)
2. Go to Application tab
3. Check Service Workers section
4. Should show "activated and running"

### Offline Mode
1. Install the app
2. Open DevTools → Network tab
3. Select "Offline" from dropdown
4. Reload page - should still work!

### Manifest
1. Open DevTools
2. Application tab → Manifest
3. Should show all app details
4. Check icons are loading

## Browser Support

✅ **Fully Supported:**
- Chrome 90+
- Safari 15+
- Firefox 88+
- Edge 90+

⚠️ **Partial Support:**
- Safari 13-14 (PWA features limited)
- Older browsers (no PWA, but works as website)

## Environment Variables

Create `.env.local` for custom configuration:
```bash
# No environment variables required for basic setup
# App works out of the box!
```

## Next Steps

After installation:
1. ✅ Test all pages work
2. ✅ Try changing language
3. ✅ Test offline mode
4. ✅ Check mobile responsiveness
5. ✅ Review translations
6. ✅ Share with users!

---

Need help? Check the main README.md for more details.
