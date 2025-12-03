'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, Moon, Salad } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const quizCards = [
  {
    href: '/quizzes/sleep-and-nutrition',
    icon: <Moon className="w-8 h-8" />,
    color: 'from-blue-500 to-indigo-600',
    emoji: '😴',
    key: 'sleep',
  },
  {
    href: '/quizzes/puberty',
    icon: <Brain className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
    emoji: '🧠',
    key: 'puberty',
  },
]

export default function QuizzesPage() {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 space-y-8">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 font-semibold">
          <Salad className="w-4 h-4" />
          {t('quizzes.badge')}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          {t('quizzes.title')}
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {t('quizzes.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {quizCards.map((card, index) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <Link href={card.href} className="block">
              <div className="rounded-3xl glass-effect p-6 h-full flex flex-col gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} text-white flex items-center justify-center shadow-lg`}>
                  {card.icon}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden>{card.emoji}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{t(`quizzes.cards.${card.key}.title`)}</h2>
                    <p className="text-gray-700">{t(`quizzes.cards.${card.key}.description`)}</p>
                  </div>
                </div>
                <div className="flex gap-2 text-sm text-gray-600">
                  <span className="px-3 py-1 rounded-full bg-blue-50">{t(`quizzes.cards.${card.key}.tag1`)}</span>
                  <span className="px-3 py-1 rounded-full bg-purple-50">{t(`quizzes.cards.${card.key}.tag2`)}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
