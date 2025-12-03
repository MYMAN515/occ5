'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import RegisterServiceWorker from './register-sw'

export default function Home() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'

  const quickLinks = [
    {
      href: '/diary',
      icon: '📔',
      label: 'Mood Diary for Your Child',
      helper: 'Track feelings with quick daily check-ins.',
    },
    {
      href: '/hygiene',
      icon: '🧼',
      label: 'Hygiene & Self-Care',
      helper: 'Build gentle routines together.',
    },
    {
      href: '/confidence',
      icon: '💪',
      label: 'Confidence & Lifestyle',
      helper: 'Grow healthy habits and self-belief.',
    },
    {
      href: '/timeline',
      icon: '⏳',
      label: 'Timeline Game',
      helper: 'Match changes to before or after puberty.',
    },
    {
      href: '/emotion-memory',
      icon: '🧠',
      label: 'Emotion Memory Game',
      helper: 'Flip cards to match feelings.',
    },
    {
      href: '/puberty-knowledge-quiz',
      icon: '🎯',
      label: 'Puberty Knowledge Quiz',
      helper: 'Test what you know about body changes.',
    },
    {
      href: '/changes-matching-game',
      icon: '🧩',
      label: 'Changes Matching Game',
      helper: 'Pair related changes together.',
    },
    {
      href: '/understanding-emotions',
      icon: '🎈',
      label: 'Understanding Emotions',
      helper: 'Learn to name and sort feelings.',
    },
    {
      href: '/what-i-like-about-me',
      icon: '✨',
      label: 'What I Like About Me',
      helper: 'Celebrate personal strengths.',
    },
    {
      href: '/quizzes',
      icon: '🧪',
      label: 'Quizzes',
      helper: 'Explore wellbeing quizzes together.',
    },
  ]

  return (
    <main className="container mx-auto px-4 py-10 md:py-16" dir={isRTL ? 'rtl' : 'ltr'}>
      <RegisterServiceWorker />
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 shadow-sm w-fit">
            <span role="img" aria-label={t('home.aria.heroSparkles')}>✨</span>
            {t('home.tagline')}
          </div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {t('home.title')}
          </motion.h1>
          <p className="text-lg text-gray-700 max-w-xl">{t('home.subtitle')}</p>

          <div className={`flex flex-wrap gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link href="#quick-links" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-white text-base font-semibold shadow-lg"
              >
                {t('home.heroButtons.play')}
              </motion.button>
            </Link>
            <Link href="/parent-guide" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto rounded-full bg-white px-6 py-3 text-primary-700 text-base font-semibold border border-primary-100 shadow-sm"
              >
                {t('home.heroButtons.parents')}
              </motion.button>
            </Link>
          </div>

          <p className="text-sm text-gray-500">{t('home.note')}</p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex justify-center"
        >
          <div className="relative w-full max-w-md">
            <div className="absolute -top-10 -left-6 w-28 h-28 bg-primary-100/60 rounded-full blur-2xl" aria-hidden="true" />
            <div className="absolute -bottom-10 -right-6 w-32 h-32 bg-secondary-100/60 rounded-full blur-2xl" aria-hidden="true" />
            <div className="relative rounded-[32px] bg-gradient-to-br from-white to-primary-50 shadow-xl overflow-hidden">
              <div className="aspect-[4/3] flex flex-col items-center justify-center gap-4 p-8">
                <div className="text-6xl" role="img" aria-label={t('home.aria.heroFamily')}>
                  👨‍👩‍👧‍👦
                </div>
                <p className="text-lg font-semibold text-gray-800 text-center">
                  {t('home.heroCardTitle')}
                </p>
                <div className="flex gap-2">
                  <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-primary-700 shadow-sm" aria-label={t('home.aria.badgePlay')}>
                    🎯 {t('home.badges.play')}
                  </span>
                  <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-secondary-700 shadow-sm" aria-label={t('home.aria.badgeSafe')}>
                    🔒 {t('home.badges.safe')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <section id="quick-links" className="mt-12 space-y-4">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
          <h2 className="text-2xl font-bold text-gray-900">Quick links crafted for small screens—tap a card to jump right in.</h2>
        </div>
        <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${isRTL ? 'text-right' : ''}`}>
          {quickLinks.map((item) => (
            <Link key={item.href} href={item.href} className="group">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-3xl bg-white shadow-sm border border-gray-100 px-5 py-6 flex flex-col items-start gap-2 transition"
              >
                <span className="text-3xl" role="img" aria-label={item.label}>{item.icon}</span>
                <div>
                  <p className="text-lg font-semibold text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-600">{item.helper}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
