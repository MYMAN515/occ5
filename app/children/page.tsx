'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Laugh, Brain, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const cards = [
  {
    href: '/children/body-image',
    icon: <Heart className="w-8 h-8" />,
    color: 'from-pink-400 to-rose-500',
    emoji: '💖',
    titleKey: 'nav.bodyImage',
    descriptionKey: 'bodyImage.intro'
  },
  {
    href: '/children/what-i-like',
    icon: <Laugh className="w-8 h-8" />,
    color: 'from-amber-400 to-orange-500',
    emoji: '📝',
    titleKey: 'nav.selfLove',
    descriptionKey: 'worksheet.intro'
  },
  {
    href: '/quizzes',
    icon: <Brain className="w-8 h-8" />,
    color: 'from-blue-400 to-cyan-500',
    emoji: '🎯',
    titleKey: 'nav.quizzes',
    descriptionKey: 'quizHub.intro'
  }
]

export default function ChildrenPage() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'

  return (
    <div className={`container mx-auto px-4 py-10 ${isRTL ? 'text-right' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 font-semibold mb-4">
          <Sparkles className="w-5 h-5" />
          {t('nav.forChildren')}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {t('nav.forChildren')}
        </h1>
        <p className={`text-lg text-gray-700 max-w-3xl mx-auto ${isRTL ? 'text-right' : 'text-center'}`}>
          {t('bodyImage.intro')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="h-full"
          >
            <Link href={card.href}>
              <div className="glass-effect rounded-3xl p-6 h-full flex flex-col gap-4 card-hover">
                <div className={`bg-gradient-to-r ${card.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white`}>
                  {card.icon}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{card.emoji}</span>
                  <h3 className="text-2xl font-bold text-gray-800">{t(card.titleKey)}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed flex-1">{t(card.descriptionKey)}</p>
                <span className="font-semibold text-blue-600">{t('quizHub.title')} →</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
