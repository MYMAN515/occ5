# ⚡ Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Run Development Server
```bash
npm run dev
```

### 3️⃣ Open Your Browser
Visit: **http://localhost:3000**

That's it! The app is running! 🎉

---

## 📱 Key Features to Try

### 🌍 Change Language
1. Look for the **🌐 globe icon** in the top navigation
2. Click it to open language menu
3. Choose from:
   - 🇬🇧 English
   - 🇸🇦 العربية (Arabic with RTL)
   - 🇲🇾 Melayu (Malay)

### 💪 New Guidance Section
1. Click **"Guidance"** in navigation (💡 icon)
2. Explore 4 categories:
   - Physical Care 💗
   - Emotional Wellbeing ✨
   - Social Life 👥
   - Personal Hygiene 💧
3. Click any card to see helpful tips!

### 📝 Try the Diary
1. Go to **"Diary"** page
2. Add a new entry
3. Select your mood
4. Write your thoughts
5. Entries save automatically!

### 🎮 Play the Timeline Game
1. Visit **"Timeline"** page
2. Click a card with a change
3. Choose "Before Puberty" or "After Puberty"
4. Track your score!

### 📱 Install as App
**On Mobile:**
- iOS: Safari → Share → Add to Home Screen
- Android: Chrome → Menu → Add to Home Screen

**On Desktop:**
- Look for install icon in address bar
- Click to install!

---

## 🔨 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for linting errors
npm run lint
```

---

## 📁 Main Files to Know

```
app/
├── page.tsx              # Home page
├── changes/page.tsx      # Physical & Emotional changes
├── timeline/page.tsx     # Timeline game
├── diary/page.tsx        # Mood diary
├── body-guide/page.tsx   # Body changes guide
└── guidance/page.tsx     # 🆕 Helpful guidance

components/
├── Navigation.tsx        # Main nav bar
└── LanguageSwitcher.tsx  # 🆕 Language selector

translations/             # 🆕 Translation files
├── en.json              # English
├── ar.json              # Arabic
└── ms.json              # Malay
```

---

## ✨ What's New?

✅ **Multilingual** - English, Arabic, Malay
✅ **PWA** - Install as phone app
✅ **Offline** - Works without internet
✅ **Guidance** - New helpful tips section
✅ **Mobile-First** - Optimized for phones
✅ **RTL Support** - Arabic right-to-left

---

## 🎯 Production Build

```bash
# Build the app
npm run build

# Test the build locally
npm start

# Visit http://localhost:3000
```

---

## 📖 More Documentation

- **README.md** - Complete feature overview
- **FEATURES.md** - Detailed feature descriptions
- **INSTALLATION.md** - Full setup guide
- **CHANGES_SUMMARY.md** - What changed

---

## 🆘 Common Issues

**Port already in use?**
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9
# Or use a different port
npm run dev -- -p 3001
```

**Dependencies not installing?**
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build failing?**
```bash
# Check Node version (need 18+)
node --version

# Update if needed, then:
npm install
npm run build
```

---

## 🎉 Ready!

Your puberty awareness app is ready to help kids! All features work, the build succeeds, and it's ready for deployment. 🚀

**Happy coding!** 💜
