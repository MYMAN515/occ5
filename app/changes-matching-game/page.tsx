'use client'

import { motion } from 'framer-motion'
import { GameContent } from '@/components/GameContent'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ChangesMatchingGamePage() {
  const { t } = useLanguage()

  return (
    <main className="container mx-auto px-4 py-10 md:py-16 space-y-8">
      <div className="space-y-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900"
        >
          {t('games.matching.title')}
        </motion.h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">{t('games.matching.instructions')}</p>
      </div>

      <div className="glass-effect rounded-3xl p-6 md:p-8 max-w-4xl mx-auto">
        <GameContent gameType="matching" />
      </div>
    </main>
  )
}
