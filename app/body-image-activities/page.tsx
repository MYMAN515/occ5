'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Heart, Lightbulb, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface EmotionOption {
  label: string
  emoji?: string
  color: string
  textColor: string
}

interface BodyImageQuestion {
  id: string
  title: string
  prompt: string
  focus: string
  tip: string
  imageAlt: string
  badge: string
  illustration: string
}

export default function BodyImageActivitiesPage() {
  const { t, language } = useLanguage()
  const questions = useMemo(() => (t('bodyImage.questions') as BodyImageQuestion[]) || [], [t])
  const emotions = useMemo(
    () => (t('bodyImage.emotions') as Record<string, EmotionOption>) || {},
    [t]
  )
  const format = (value: string, replacements: Record<string, string | number>) => {
    let output = value
    Object.entries(replacements).forEach(([key, val]) => {
      output = output.replace(`{{${key}}}`, String(val))
    })
    return output
  }
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [activeTip, setActiveTip] = useState<string | null>(null)

  const currentQuestion = questions[currentIndex]

  const handleSelect = (questionId: string, emotionKey: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: emotionKey }))
  }

  const handleReset = () => {
    setResponses({})
    setActiveTip(null)
    setCurrentIndex(0)
  }

  const handleNavigate = (direction: 'next' | 'prev') => {
    setActiveTip(null)
    setCurrentIndex((prev) => {
      if (direction === 'next') {
        return prev === questions.length - 1 ? prev : prev + 1
      }
      return prev === 0 ? 0 : prev - 1
    })
  }

  if (!currentQuestion) return null

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 space-y-8">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 font-semibold">
          <Sparkles className="w-4 h-4" />
          {t('bodyImage.badge')}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          {t('bodyImage.title')}
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {t('bodyImage.subtitle')}
        </p>
        <div className="flex justify-center gap-2 flex-wrap text-sm text-gray-600">
          <span className="px-3 py-1 rounded-full bg-blue-50">{t('bodyImage.features.progress')}</span>
          <span className="px-3 py-1 rounded-full bg-purple-50">{t('bodyImage.features.parent')}</span>
          <span className="px-3 py-1 rounded-full bg-pink-50">{t('bodyImage.features.multilingual')}</span>
        </div>
      </header>

      <section className="glass-effect rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{format(t('bodyImage.progressLabel') as string, { current: currentIndex + 1, total: questions.length })}</p>
                <p className="text-xl font-bold text-gray-800">{currentQuestion.badge}</p>
              </div>
            </div>
          <div className="flex items-center gap-2 flex-wrap">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                className={`w-10 h-10 rounded-full border-2 font-semibold transition-all ${
                  idx === currentIndex
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg'
                    : 'border-gray-200 text-gray-600 hover:border-blue-300'
                }`}
                aria-label={`${language === 'ar' ? 'السؤال' : 'Question'} ${idx + 1}`}
                onClick={() => {
                  setCurrentIndex(idx)
                  setActiveTip(null)
                }}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6 shadow-inner min-h-[260px]">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-2xl" aria-hidden />
              <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-br from-pink-200 to-purple-100 rounded-full blur-2xl" aria-hidden />
              <div className="relative space-y-4">
                <p className="text-sm uppercase tracking-wide text-blue-700 font-semibold">{currentQuestion.badge}</p>
                <h2 className="text-2xl font-bold text-gray-900 leading-snug">{currentQuestion.title}</h2>
                <p className="text-gray-700 leading-relaxed">{currentQuestion.prompt}</p>
                <div className="rounded-2xl bg-white/80 border border-white/60 p-4 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">{t('bodyImage.altLabel')}</p>
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <span role="img" aria-label={currentQuestion.imageAlt}>{currentQuestion.illustration}</span>
                    {currentQuestion.imageAlt}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-gray-800">{t('bodyImage.selectFeeling')}</h3>
                <button
                  onClick={() => setActiveTip(activeTip === currentQuestion.id ? null : currentQuestion.id)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 text-amber-800 font-semibold border border-amber-100 hover:bg-amber-100 transition-colors"
                  aria-label={t('bodyImage.parentTipLabel') as string}
                >
                  <Lightbulb className="w-4 h-4" />
                  {t('bodyImage.parentTipLabel')}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(emotions).map(([key, value]) => {
                  const selected = responses[currentQuestion.id] === key
                  return (
                    <motion.button
                      key={key}
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleSelect(currentQuestion.id, key)}
                      className={`rounded-2xl border-2 p-4 text-left transition-all shadow-sm ${
                        selected
                          ? `border-transparent bg-gradient-to-r ${value.color} text-white shadow-lg`
                          : 'border-gray-200 bg-white hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-base flex items-center gap-2">
                          <span aria-hidden className="text-xl">{value.emoji}</span>
                          <span className={`${selected ? 'text-white' : value.textColor}`}>{value.label}</span>
                        </span>
                        {selected && <Sparkles className="w-4 h-4" />}
                      </div>
                      <p className={`text-sm mt-2 ${selected ? 'text-white/90' : 'text-gray-600'}`}>
                        {t('bodyImage.emotionSupport')}
                      </p>
                    </motion.button>
                  )
                })}
              </div>

              <AnimatePresence>
                {activeTip === currentQuestion.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 shadow-inner"
                  >
                    <p className="font-semibold mb-1">{currentQuestion.focus}</p>
                    <p className="text-sm leading-relaxed">{currentQuestion.tip}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between gap-3 flex-wrap pt-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleNavigate('prev')}
                    disabled={currentIndex === 0}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t('bodyImage.prev')}
                  </button>
                  <button
                    onClick={() => handleNavigate('next')}
                    disabled={currentIndex === questions.length - 1}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
                  >
                    {t('bodyImage.next')}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"
                >
                  {t('bodyImage.reset')}
                </button>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </section>
    </div>
  )
}
