'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, Sparkles, MoonStar, HeartHandshake } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function QuizzesPage() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'

  const items = [
    {
      href: '/quizzes/puberty',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      emoji: '🧠',
      title: t('quizHub.items.puberty.title'),
      description: t('quizHub.items.puberty.description'),
      cta: t('quizHub.items.puberty.cta')
    },
    {
      href: '/quizzes/wellness',
      icon: <MoonStar className="w-8 h-8" />,
      color: 'from-purple-500 to-amber-500',
      emoji: '🌙',
      title: t('quizHub.items.wellness.title'),
      description: t('quizHub.items.wellness.description'),
      cta: t('quizHub.items.wellness.cta')
    }
  ]

  return (
    <div className={`container mx-auto px-4 py-10 ${isRTL ? 'text-right' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 font-semibold mb-4">
          <Sparkles className="w-5 h-5" />
          {t('nav.quizzes')}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {t('quizHub.title')}
        </h1>
        <p className={`text-lg text-gray-700 max-w-3xl mx-auto ${isRTL ? 'text-right' : 'text-center'}`}>
          {t('quizHub.intro')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -6, scale: 1.01 }}
          >
            <Link href={item.href}>
              <div className="glass-effect rounded-3xl p-6 h-full card-hover flex flex-col gap-4">
                <div className={`bg-gradient-to-r ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white`}>
                  {item.icon}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.emoji}</span>
                  <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed flex-1">{item.description}</p>
                <span className="font-semibold text-blue-600 flex items-center gap-2">{item.cta} →</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 glass-effect rounded-3xl p-6 flex items-start gap-3 bg-gradient-to-r from-blue-50 to-emerald-50">
        <HeartHandshake className="w-6 h-6 text-emerald-600" />
        <p className="text-gray-700 text-sm">{t('wellnessQuiz.encouragement')}</p>
      </div>
    </div>
  )
}
