'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import RegisterServiceWorker from './register-sw'
import { GameModal, type GameType } from '@/components/games/GameModals'

type QuickLink = {
  icon: string
  label: string
  helper: string
  href?: string
  action?: () => void
}

export default function Home() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null)

  const quickLinks: QuickLink[] = [
    {
      href: '/diary',
      icon: '📔',
      label: t('home.quickLinksCards.diary.label'),
      helper: t('home.quickLinksCards.diary.helper'),
    },
    {
      href: '/hygiene',
      icon: '🧼',
      label: t('home.quickLinksCards.hygiene.label'),
      helper: t('home.quickLinksCards.hygiene.helper'),
    },
    {
      href: '/confidence',
      icon: '🌟',
      label: t('home.quickLinksCards.confidence.label'),
      helper: t('home.quickLinksCards.confidence.helper'),
    },
    {
      href: '/timeline',
      icon: '⏳',
      label: t('home.quickLinksCards.timeline.label'),
      helper: t('home.quickLinksCards.timeline.helper'),
    },
    {
      action: () => setSelectedGame('memory'),
      icon: '🧠',
      label: t('home.quickLinksCards.memory.label'),
      helper: t('home.quickLinksCards.memory.helper'),
    },
    {
      action: () => setSelectedGame('quiz'),
      icon: '📝',
      label: t('home.quickLinksCards.quiz.label'),
      helper: t('home.quickLinksCards.quiz.helper'),
    },
    {
      action: () => setSelectedGame('matching'),
      icon: '🧩',
      label: t('home.quickLinksCards.matching.label'),
      helper: t('home.quickLinksCards.matching.helper'),
    },
    {
      action: () => setSelectedGame('emotions'),
      icon: '🎈',
      label: t('home.quickLinksCards.emotions.label'),
      helper: t('home.quickLinksCards.emotions.helper'),
    },
    {
      href: '/what-i-like-about-me',
      icon: '💫',
      label: t('home.quickLinksCards.whatILike.label'),
      helper: t('home.quickLinksCards.whatILike.helper'),
    },
    {
      href: '/quizzes',
      icon: '❓',
      label: t('home.quickLinksCards.quizzes.label'),
      helper: t('home.quickLinksCards.quizzes.helper'),
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
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {t('home.title')}
          </motion.h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-xl text-balance">{t('home.subtitle')}</p>

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

      <section className="mt-12" id="quick-links">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-primary-700">{t('home.quickLinksSection.label')}</p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-balance">
              {t('home.quickLinksSection.title')}
            </h2>
          </div>
        </div>
        <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${isRTL ? 'text-right' : ''}`}>
          {quickLinks.map((item) => {
            const CardContent = (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-3xl bg-white shadow-sm border border-gray-100 px-5 py-6 flex flex-col items-start gap-2 transition"
              >
                <span className="text-3xl" role="img" aria-label={item.label}>{item.icon}</span>
                <div>
                  <p className="text-base sm:text-lg font-semibold text-gray-900 text-balance">{item.label}</p>
                  <p className="text-sm text-gray-600 text-balance">{item.helper}</p>
                </div>
              </motion.div>
            )

            if (item.href) {
              return (
                <Link key={item.label} href={item.href} className="group">
                  {CardContent}
                </Link>
              )
            }

            return (
              <button key={item.label} type="button" onClick={item.action} className="text-left">
                {CardContent}
              </button>
            )
          })}
        </div>
      </section>

      <GameModal selectedGame={selectedGame} onClose={() => setSelectedGame(null)} />
    </main>
  )
}
