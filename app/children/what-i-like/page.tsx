'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, RefreshCcw, Printer, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { safeLocalStorage } from '@/utils/storage'

const STORAGE_KEY = 'worksheet-what-i-like'

type WorksheetKey = 'skills' | 'friends' | 'self' | 'family' | 'proud' | 'unique'

export default function WhatILikePage() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'
  const [active, setActive] = useState<WorksheetKey | null>('skills')
  const [responses, setResponses] = useState<Record<WorksheetKey, string>>({
    skills: '',
    friends: '',
    self: '',
    family: '',
    proud: '',
    unique: ''
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedData = safeLocalStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setResponses((prev) => ({ ...prev, ...parsed }))
      } catch (err) {
        console.error('Failed to parse saved worksheet', err)
      }
    }
  }, [])

  useEffect(() => {
    safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(responses))
    setSaved(true)
    const timer = setTimeout(() => setSaved(false), 1500)
    return () => clearTimeout(timer)
  }, [responses])

  const sections: { key: WorksheetKey; emoji: string }[] = useMemo(() => ([
    { key: 'skills', emoji: '🎯' },
    { key: 'friends', emoji: '🤝' },
    { key: 'self', emoji: '💖' },
    { key: 'family', emoji: '🏠' },
    { key: 'proud', emoji: '🌟' },
    { key: 'unique', emoji: '✨' }
  ]), [])

  const reset = () => {
    if (confirm(t('worksheet.actions.clearConfirm'))) {
      setResponses({ skills: '', friends: '', self: '', family: '', proud: '', unique: '' })
    }
  }

  const handleExport = () => {
    window.print()
  }

  return (
    <div className={`container mx-auto px-4 py-10 ${isRTL ? 'text-right' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 font-semibold mb-4">
          <Sparkles className="w-5 h-5" />
          {t('nav.selfLove')}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          {t('worksheet.title')}
        </h1>
        <p className={`text-lg text-gray-700 max-w-4xl mx-auto ${isRTL ? 'text-right' : 'text-center'}`}>
          {t('worksheet.intro')}
        </p>
        <p className="text-sm text-gray-500 mt-2">{t('worksheet.saveNotice')}</p>
        {language === 'ar' && <p className="text-xs text-gray-500 mt-1">{t('worksheet.rtlNotice')}</p>}
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 space-y-3">
          {sections.map((section) => {
            const isActive = active === section.key
            return (
              <motion.button
                key={section.key}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setActive(section.key)}
                className={`w-full text-left px-4 py-3 rounded-2xl border-2 flex items-center gap-3 transition-all ${isActive ? 'border-amber-300 bg-amber-50 shadow-md' : 'border-gray-200 bg-white hover:border-amber-200'}`}
              >
                <span className="text-xl">{section.emoji}</span>
                <div>
                  <p className="font-bold text-gray-800">{t(`worksheet.sections.${section.key}`)}</p>
                  <p className="text-xs text-gray-600">{t(`worksheet.tips.${section.key}`)}</p>
                </div>
              </motion.button>
            )
          })}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-3 rounded-full border-2 border-red-200 text-red-600 hover:bg-red-50"
            >
              <RefreshCcw className="w-4 h-4" /> {t('worksheet.reset')}
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-3 rounded-full border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              <Printer className="w-4 h-4" /> {t('worksheet.export')}
            </button>
          </div>
          {saved && (
            <div className="text-sm text-emerald-700 bg-emerald-50 rounded-xl px-3 py-2">
              {t('worksheet.saved')}
              <span className="ml-2 text-xs text-gray-500">{t('worksheet.actions.printHint')}</span>
            </div>
          )}
        </div>

        <motion.section
          key={active || 'skills'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 glass-effect rounded-3xl p-6 md:p-8"
        >
          <div className="flex items-start gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-amber-500" />
            <div>
              <p className="text-sm uppercase tracking-wide text-amber-600 font-semibold">{t('worksheet.sections.' + active)}</p>
              <p className="text-sm text-gray-600">{t('worksheet.tips.' + active)}</p>
            </div>
          </div>
          <textarea
            value={active ? responses[active] : ''}
            onChange={(e) => active && setResponses({ ...responses, [active]: e.target.value })}
            className={`w-full min-h-[240px] rounded-2xl border-2 border-amber-200 bg-amber-50/50 p-4 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}
            placeholder={t('worksheet.placeholder')}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </motion.section>
      </div>
    </div>
  )
}
