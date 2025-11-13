# 💙 Parenting Hub - Supporting Families Through Puberty

A comprehensive, multilingual Progressive Web App (PWA) designed to help **parents** understand and support their children through puberty. Features expert guidance, interactive games, AI assistance, and more. Built with Next.js, React, TypeScript, and Tailwind CSS.

## ✨ Key Features

### 🎯 **Parent-Focused Design**
This app is designed primarily for **parents** to help them understand and support their children during puberty, with interactive educational content for children as well.

## ✨ Features

### 📱 **Mobile-First Design**
- Progressive Web App (PWA) - Install on your phone like a native app
- Optimized touch interactions and gestures
- Safe area support for notched devices
- Smooth animations and transitions with Framer Motion
- Responsive design that works on all devices

### 🌍 **Multilingual Support**
The app supports three languages with full translations:
- **English** 🇬🇧
- **Arabic** 🇸🇦 (with RTL support)
- **Malay** 🇲🇾

Easily switch between languages using the language switcher in the navigation bar.

### 📚 **Educational Content**

#### 1. **Welcome Experience with Privacy Information**
Beautiful 4-slide onboarding:
- Warm welcome messages for parents
- Explanation of app purpose
- Detailed privacy policy
- Required acceptance before use
- High UX/UI with animations

#### 2. **Comprehensive Parent Guide**
Evidence-based advice across 6 categories:
- Communication strategies
- Emotional support techniques
- Understanding physical changes
- Social development guidance
- Privacy and safety tips
- Professional resources

#### 3. **AI Chat Assistant**
Real-time AI support for parents:
- Instant answers to parenting questions
- Pre-loaded suggested questions
- Context-aware responses
- Available on all pages via floating chat button

#### 4. **Interactive Games for Kids**
Four educational games:
- Emotion Memory Game
- Puberty Knowledge Quiz
- Changes Matching Game
- Understanding Emotions scenarios

#### 5. **Physical & Emotional Changes**
Learn about the natural changes during puberty:
- Growth spurts and body development
- Skin changes and hygiene
- Voice changes
- Emotional and mood changes
- Self-awareness and confidence building

#### 6. **Body Changes Guide**
Gender-sensitive information with expandable sections:
- General changes for everyone
- Female-specific changes
- Male-specific changes
- Detailed tips and advice for each change

#### 7. **Timeline Matching Game**
Interactive learning activity:
- Match changes to "before" or "after" puberty
- Score tracking and accuracy measurement
- Engaging gamification to reinforce learning

#### 8. **Mood Diary for Children**
Personal journal to track feelings:
- Record daily moods with emoji indicators
- Private space for thoughts and reflections
- Track emotional patterns over time
- Local storage - your entries stay private

#### 9. **Practical Guidance for Children**
Practical advice across four categories:
- **Physical Care**: Exercise, nutrition, sleep, managing discomfort
- **Emotional Wellbeing**: Understanding feelings, managing stress, building confidence
- **Social Life**: Friendships, peer pressure, communication, boundaries
- **Personal Hygiene**: Daily routines, managing body odor, skin care

### 🎨 **Modern UI/UX**
- Beautiful gradient designs with glass-morphism effects
- Smooth animations and micro-interactions
- Intuitive navigation with icons
- Card-based layouts for easy scanning
- Accessible color contrasts and typography

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd workspace
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 📂 Project Structure

```
workspace/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── changes/           # Physical & emotional changes
│   ├── timeline/          # Interactive matching game
│   ├── diary/             # Mood diary
│   ├── body-guide/        # Body changes guide
│   ├── guidance/          # Helpful guidance section
│   └── layout.tsx         # Root layout with providers
├── components/            # Reusable React components
│   ├── Navigation.tsx     # Main navigation bar
│   └── LanguageSwitcher.tsx # Language selection dropdown
├── contexts/              # React context providers
│   └── LanguageContext.tsx # i18n language management
├── translations/          # Translation files
│   ├── en.json           # English translations
│   ├── ar.json           # Arabic translations
│   └── ms.json           # Malay translations
├── public/               # Static assets
│   ├── manifest.json     # PWA manifest
│   ├── sw.js            # Service worker
│   └── *.png            # App icons
└── app/globals.css       # Global styles with mobile optimizations
```

## 🌐 Internationalization (i18n)

The app uses a custom translation system with React Context:

1. **Adding a new language:**
   - Create a new JSON file in `/translations/` (e.g., `fr.json`)
   - Add all translation keys following the existing structure
   - Update `LanguageContext.tsx` to include the new language
   - Add the language option to `LanguageSwitcher.tsx`

2. **Using translations in components:**
```tsx
import { useLanguage } from '@/contexts/LanguageContext'

function MyComponent() {
  const { t } = useLanguage()
  return <h1>{t('home.title')}</h1>
}
```

## 📱 PWA Features

The app can be installed on mobile devices:

### iOS (Safari)
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"

### Android (Chrome)
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Select "Add to Home Screen"

### Desktop
1. Look for the install icon in the address bar
2. Click to install

## 🎯 Key Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PWA**: Custom Service Worker
- **Storage**: Local Storage for diary entries and language preferences

## 🔒 Privacy & Safety

✅ **100% Local Storage**: All diary entries and data stay on your device
✅ **No External Servers**: Nothing is sent outside your device
✅ **No Tracking**: Zero analytics or user tracking
✅ **Child Safety First**: Private diary space for children
✅ **Clear Privacy Policy**: Explained in welcome flow with required acceptance
✅ **Age-Appropriate**: Content designed for both parents and children

## 🎨 Customization

### Colors
Main theme colors can be customized in `tailwind.config.ts`:
- `primary`: Purple shades (#9333EA)
- `secondary`: Pink shades (#EC4899)

### Content
Educational content can be updated in each page component:
- Physical/Emotional changes: `/app/changes/page.tsx`
- Body guide content: `/app/body-guide/page.tsx`
- Guidance tips: `/app/guidance/page.tsx`
- Timeline items: `/app/timeline/page.tsx`

## 🤝 Contributing

This is an educational resource designed to help young people. When contributing:
- Ensure content is age-appropriate
- Maintain sensitivity around gender and cultural differences
- Test translations with native speakers
- Follow accessibility best practices
- Prioritize child safety and privacy

## 📄 License

Educational Resource © 2025

## 💙 Support

This app is designed to be a supportive resource. If you or someone you know needs immediate help:
- Talk to a trusted adult (parent, guardian, teacher, counselor)
- Contact local health services
- Reach out to youth helplines in your country

---

**Made with 💙 to help families navigate puberty together with love and confidence**
