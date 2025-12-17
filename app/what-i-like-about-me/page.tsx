'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, RefreshCcw, Printer, Smile, Sparkles, Heart } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { safeLocalStorage } from '@/utils/storage'

type Section = {
  id: string
  title: string
  hint: string
}

type WhatILikeContent = {
  title: string
  subtitle: string
  helperCta: string
  placeholder: string
  saveMessage: string
  restoreMessage: string
  reset: string
  print: string
  inputLabel: string
  encourageTitle: string
  encourageDescription: string
  savedBadge: string
  printBadge: string
  sections: Section[]
}

const STORAGE_KEY = 'what-i-like-progress'

export default function WhatILikeAboutMePage() {
  const { t, language } = useLanguage()
  const content = t('whatILike') as WhatILikeContent
  const sections = useMemo(() => content?.sections ?? [], [content])
  const [entries, setEntries] = useState<Record<string, string>>({})
  const [openId, setOpenId] = useState<string | null>(null)
  const [restored, setRestored] = useState(false)

  useEffect(() => {
    const saved = safeLocalStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setEntries(parsed)
        setRestored(true)
      } catch (e) {
        setRestored(false)
      }
    }
  }, [])

  useEffect(() => {
    safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  useEffect(() => {
    if (sections.length && !openId) {
      setOpenId(sections[0].id)
    }
  }, [sections, openId])

  const handleChange = (id: string, value: string) => {
    setEntries((prev) => ({ ...prev, [id]: value }))
  }

  const handleReset = () => {
    setEntries({})
    safeLocalStorage.removeItem(STORAGE_KEY)
  }

  const handlePrint = () => {
    window.print()
  }

  const isRTL = language === 'ar'

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-pink-50 text-amber-700 font-semibold">
            <Sparkles className="w-4 h-4" /> {content?.helperCta}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {content?.title}
          </h1>
          <p className="text-gray-700 text-base md:text-lg">{content?.subtitle}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <Smile className="w-4 h-4" />
            <span>{content?.saveMessage}</span>
            {restored && <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">{content?.restoreMessage}</span>}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-200 text-amber-700 bg-white hover:bg-amber-50 font-semibold"
          >
            <RefreshCcw className="w-4 h-4" /> {content?.reset}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-200 text-blue-700 bg-white hover:bg-blue-50 font-semibold"
          >
            <Printer className="w-4 h-4" /> {content?.print}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sections.map((section, index) => {
          const isOpen = openId === section.id
          return (
            <motion.article
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-effect rounded-3xl p-5 md:p-6 h-full flex flex-col gap-3 border border-amber-100"
            >
              <button
                className="flex items-start justify-between gap-3 text-left"
                onClick={() => setOpenId(isOpen ? null : section.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-100 to-pink-100 flex items-center justify-center text-2xl">
                    {['⭐','🤝','💖','🏠','🚀','🌈'][index]}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                    <p className="text-sm text-gray-600">{section.hint}</p>
                  </div>
                </div>
                <Lightbulb className={`w-5 h-5 ${isOpen ? 'text-amber-600' : 'text-gray-400'}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <label className="block text-sm font-semibold text-gray-700">
                      {content?.inputLabel}
                    </label>
                    <textarea
                      dir={isRTL ? 'rtl' : 'ltr'}
                      value={entries[section.id] ?? ''}
                      onChange={(e) => handleChange(section.id, e.target.value)}
                      className="w-full min-h-[120px] rounded-2xl border border-amber-200 bg-white/90 px-4 py-3 text-gray-800 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                      placeholder={content?.placeholder}
                    />
                    <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-pink-50 border border-amber-100 p-3 text-sm text-gray-700 flex items-start gap-2">
                      <Heart className="w-4 h-4 text-amber-600 mt-0.5" />
                      <span>{section.hint}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          )
        })}
      </div>

      <div className="glass-effect rounded-3xl p-5 md:p-6 mt-8 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 text-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-700">{content?.encourageTitle}</p>
            <p className="text-sm text-gray-700">{content?.encourageDescription}</p>
          </div>
        </div>
        <div className="flex gap-2 text-sm text-gray-700">
          <div className="px-3 py-2 rounded-xl bg-white/80 border border-blue-100">{content?.savedBadge}</div>
          <div className="px-3 py-2 rounded-xl bg-white/80 border border-blue-100">{content?.printBadge}</div>
        </div>
      </div>
    </div>
  )
}
