'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Baby, HeartPulse, Library, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const cards = [
  {
    href: '/body-guide',
    icon: <HeartPulse className="w-8 h-8" />,
    color: 'from-pink-500 to-rose-500',
    key: 'body',
  },
  {
    href: '/changes',
    icon: <Baby className="w-8 h-8" />,
    color: 'from-purple-500 to-indigo-500',
    key: 'timeline',
  },
  {
    href: '/timeline',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
    key: 'activity',
  },
]

export default function DevelopmentalChangesPage() {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 space-y-8">
      <header className="text-center space-y-3">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 font-semibold">
          <Library className="w-4 h-4" />
          {t('developmental.badge')}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-500 bg-clip-text text-transparent">
          {t('developmental.title')}
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {t('developmental.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card, index) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={card.href} className="block">
              <div className="glass-effect rounded-3xl p-6 h-full space-y-3">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} text-white flex items-center justify-center shadow-lg`}>
                  {card.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{t(`developmental.cards.${card.key}.title`)}</h2>
                <p className="text-gray-700">{t(`developmental.cards.${card.key}.description`)}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
