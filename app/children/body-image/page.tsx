'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Lightbulb, ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const emotionStyles: Record<string, string> = {
  happy: 'bg-green-100 text-green-800 border-green-200',
  proud: 'bg-amber-100 text-amber-800 border-amber-200',
  curious: 'bg-sky-100 text-sky-800 border-sky-200',
  anxious: 'bg-red-100 text-red-800 border-red-200',
  confused: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  excited: 'bg-purple-100 text-purple-800 border-purple-200'
}

export default function BodyImagePage() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'
  const [current, setCurrent] = useState(0)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [openTip, setOpenTip] = useState<string | null>(null)

  const questions = useMemo(() =>
    ['q1', 'q2', 'q3', 'q4', 'q5'].map((key) => ({
      key,
      title: t(`bodyImage.questions.${key}.title`),
      prompt: t(`bodyImage.questions.${key}.prompt`),
      focus: t(`bodyImage.questions.${key}.focus`),
      tip: t(`bodyImage.questions.${key}.tip`),
      icon: t(`bodyImage.questions.${key}.icon`)
    })), [t]
  )

  const emotions = useMemo(() => (
    ['happy', 'proud', 'curious', 'anxious', 'confused', 'excited'].map((key) => ({
      key,
      label: t(`bodyImage.emotions.${key}`),
      style: emotionStyles[key]
    }))
  ), [t])

  const handleSelect = (qKey: string, emotion: string) => {
    setResponses((prev) => ({ ...prev, [qKey]: emotion }))
  }

  const progressText = t('bodyImage.progress')
    .replace('{current}', `${current + 1}`)
    .replace('{total}', `${questions.length}`)

  const goTo = (index: number) => {
    if (index >= 0 && index < questions.length) setCurrent(index)
  }

  const currentQuestion = questions[current]

  return (
    <div className={`container mx-auto px-4 py-10 ${isRTL ? 'text-right' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 text-pink-700 font-semibold mb-4">
          <Sparkles className="w-5 h-5" />
          {t('nav.bodyImage')}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          {t('bodyImage.title')}
        </h1>
        <p className={`text-lg text-gray-700 max-w-4xl mx-auto ${isRTL ? 'text-right' : 'text-center'}`}>
          {t('bodyImage.intro')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-3xl p-6 md:p-8 mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white text-2xl">
              {currentQuestion.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{progressText}</p>
              <h2 className="text-2xl font-bold text-gray-800">{currentQuestion.title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>{t('bodyImage.toolHint')}</span>
          </div>
        </div>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-3xl p-6 md:p-8 mb-4"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentQuestion.icon}</span>
              <div>
                <p className="text-sm uppercase tracking-wide text-pink-600 font-semibold">{t('nav.bodyImage')}</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">{currentQuestion.prompt}</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {emotions.map((emotion) => {
                const selected = responses[currentQuestion.key] === emotion.key
                return (
                  <motion.button
                    key={emotion.key}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(currentQuestion.key, emotion.key)}
                    className={`rounded-2xl border-2 p-4 text-left flex items-center justify-between gap-3 transition-all ${emotion.style} ${selected ? 'ring-2 ring-offset-2 ring-pink-300' : 'opacity-90 hover:opacity-100'}`}
                    aria-pressed={selected}
                  >
                    <span className="font-semibold">{emotion.label}</span>
                    {selected && <Check className="w-5 h-5" />}
                  </motion.button>
                )
              })}
            </div>
            <p className="text-sm text-gray-600">{t('bodyImage.footerPrompt')}</p>
          </div>

          <div className="lg:w-80 relative">
            <div className="glass-effect rounded-2xl p-4 border border-pink-100 h-full">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs uppercase text-amber-600 font-semibold">{t('bodyImage.parentLabel')}</p>
                  <p className="font-bold text-gray-800">{currentQuestion.focus}</p>
                </div>
                <button
                  className="p-2 rounded-full bg-amber-50 text-amber-600 hover:bg-amber-100"
                  onClick={() => setOpenTip(openTip === currentQuestion.key ? null : currentQuestion.key)}
                  aria-label={t('bodyImage.parentLabel')}
                >
                  <Lightbulb className="w-5 h-5" />
                </button>
              </div>
              <AnimatePresence>
                {openTip === currentQuestion.key && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="bg-amber-50 rounded-xl p-3 text-sm text-amber-900"
                  >
                    {currentQuestion.tip}
                  </motion.div>
                )}
              </AnimatePresence>
              {responses[currentQuestion.key] && (
                <div className="mt-3 text-sm text-gray-700 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3">
                  {t('bodyImage.selectionNote')}: <strong>{t(`bodyImage.emotions.${responses[currentQuestion.key]}`)}</strong>
                </div>
              )}
              <p className="mt-4 text-xs text-gray-500">{t('bodyImage.parentReminder')}</p>
            </div>
          </div>
        </div>
      </motion.article>

      <div className="flex items-center justify-between gap-3 mt-6">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className={`flex items-center gap-2 px-4 py-3 rounded-full border-2 ${current === 0 ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-200 hover:border-pink-200'}`}
        >
          {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{t('navigation.previous') ?? 'Previous'}</span>
        </button>
        <div className="flex items-center gap-2">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-3 h-3 rounded-full ${idx === current ? 'bg-pink-500' : 'bg-gray-200'}`}
              aria-label={`Go to question ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => goTo(current + 1)}
          disabled={current === questions.length - 1}
          className={`flex items-center gap-2 px-4 py-3 rounded-full border-2 ${current === questions.length - 1 ? 'text-gray-400 border-gray-200' : 'text-white bg-gradient-to-r from-pink-500 to-purple-500 border-transparent shadow-lg'}`}
        >
          <span>{current === questions.length - 1 ? t('navigation.next') ?? 'Next' : t('navigation.next') ?? 'Next'}</span>
          {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
