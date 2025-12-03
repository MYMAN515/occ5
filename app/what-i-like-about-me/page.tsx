'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookHeart, Download, RefreshCcw, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { safeLocalStorage } from '@/utils/storage'

interface ReflectionPrompt {
  id: string
  title: string
  helper: string
  icon: string
}

type ReflectionMap = Record<string, string>

export default function WhatILikeAboutMePage() {
  const { t, language } = useLanguage()
  const prompts = useMemo(() => (t('selfReflection.prompts') as ReflectionPrompt[]) || [], [t])
  const [entries, setEntries] = useState<ReflectionMap>({})
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const saved = safeLocalStorage.getItem('self-reflection')
    if (saved) {
      try {
        setEntries(JSON.parse(saved))
      } catch (error) {
        console.warn('Failed to parse saved reflections', error)
      }
    }
  }, [])

  useEffect(() => {
    if (Object.keys(entries).length) {
      safeLocalStorage.setItem('self-reflection', JSON.stringify(entries))
    }
  }, [entries])

  const handleChange = (id: string, value: string) => {
    setEntries((prev) => ({ ...prev, [id]: value }))
  }

  const handleReset = () => {
    setEntries({})
    setActive(null)
    safeLocalStorage.removeItem('self-reflection')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 space-y-6">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-blue-50 text-emerald-700 font-semibold">
          <Sparkles className="w-4 h-4" />
          {t('selfReflection.badge')}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t('selfReflection.title')}
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {t('selfReflection.subtitle')}
        </p>
        <div className="flex justify-center gap-2 flex-wrap text-sm text-gray-600">
          <span className="px-3 py-1 rounded-full bg-emerald-50">{t('selfReflection.features.save')}</span>
          <span className="px-3 py-1 rounded-full bg-blue-50">{t('selfReflection.features.rtl')}</span>
          <span className="px-3 py-1 rounded-full bg-purple-50">{t('selfReflection.features.print')}</span>
        </div>
      </header>

      <section className="glass-effect rounded-3xl p-6 md:p-8 space-y-4">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex items-center gap-3 text-gray-700">
            <BookHeart className="w-6 h-6 text-emerald-600" />
            <p className="font-semibold">{t('selfReflection.instructions')}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              {t('selfReflection.reset')}
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {t('selfReflection.print')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prompts.map((prompt, index) => {
            const isActive = active === prompt.id
            return (
              <motion.article
                key={prompt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-3xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow ${language === 'ar' ? 'text-right' : ''}`}
              >
                <button
                  className="w-full flex items-center justify-between gap-3"
                  onClick={() => setActive(isActive ? null : prompt.id)}
                  aria-expanded={isActive}
                >
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-2xl" aria-hidden>{prompt.icon}</span>
                    <div>
                      <p className="font-bold text-gray-900">{prompt.title}</p>
                      <p className="text-sm text-gray-600">{prompt.helper}</p>
                    </div>
                  </div>
                  <span className="text-xl" aria-hidden>{isActive ? '➖' : '➕'}</span>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="mt-3"
                    >
                      <label className="text-sm font-semibold text-gray-700 block mb-2">
                        {t('selfReflection.promptLabel')}
                      </label>
                      <textarea
                        value={entries[prompt.id] || ''}
                        onChange={(e) => handleChange(prompt.id, e.target.value)}
                        className="w-full h-32 rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                        placeholder={t('selfReflection.placeholder') as string}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
