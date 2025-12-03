'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Lightbulb, ArrowLeft, ArrowRight, Palette, Smile, Heart, Brain } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const emotionStyles: Record<string, string> = {
  happy: 'bg-green-50 text-green-800 border-green-200',
  proud: 'bg-purple-50 text-purple-800 border-purple-200',
  calm: 'bg-blue-50 text-blue-800 border-blue-200',
  anxious: 'bg-amber-50 text-amber-800 border-amber-200',
  curious: 'bg-teal-50 text-teal-800 border-teal-200',
  sad: 'bg-slate-50 text-slate-800 border-slate-200'
}

const emotionIcons: Record<string, string> = {
  happy: '😊',
  proud: '🌟',
  calm: '😌',
  anxious: '😟',
  curious: '🤔',
  sad: '😢'
}

type Question = {
  title: string
  prompt: string
  focus: string
}

type BodyImageContent = {
  title: string
  subtitle: string
  instruction: string
  parentLabel: string
  parentButton: string
  progressLabel: string
  next: string
  previous: string
  emotions: Record<string, string>
  questions: Question[]
}

export default function BodyImageActivitiesPage() {
  const { t, language } = useLanguage()
  const content = t('bodyImage') as BodyImageContent
  const questions = useMemo(() => content?.questions ?? [], [content])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [openTip, setOpenTip] = useState<number | null>(null)

  const currentQuestion = questions[currentIndex]
  const emotionLabels = content?.emotions ?? {}

  const handleSelect = (emotion: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: emotion }))
  }

  const goTo = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index)
      setOpenTip(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6 md:mb-10">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 font-semibold">
            <Sparkles className="w-4 h-4" /> {content?.progressLabel}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {content?.title}
          </h1>
          <p className="text-gray-700 text-base md:text-lg">
            {content?.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <Brain className="w-4 h-4" />
            <span>{content?.instruction}</span>
          </div>
        </div>
        <div className="glass-effect rounded-2xl p-4 bg-gradient-to-br from-blue-50 to-purple-50 text-sm text-gray-700 max-w-sm">
          <div className="flex items-center gap-2 font-semibold text-blue-700">
            <Lightbulb className="w-4 h-4" />
            <span>{content?.parentLabel}</span>
          </div>
          <p className="mt-2 text-gray-700">{content?.instruction}</p>
        </div>
      </div>

      <div className="glass-effect rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-60" aria-hidden="true" />
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center shadow-lg">
                <Smile className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm uppercase text-blue-600 font-semibold tracking-wide">{content?.progressLabel}</p>
                <p className="text-lg font-bold text-gray-900">{currentIndex + 1} / {questions.length}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap justify-end">
              <button
                onClick={() => goTo(currentIndex - 1)}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition ${currentIndex === 0 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-blue-700 border-blue-200 bg-white hover:bg-blue-50'}`}
              >
                <ArrowLeft className="w-4 h-4" /> {content?.previous}
              </button>
              <button
                onClick={() => goTo(currentIndex + 1)}
                disabled={currentIndex === questions.length - 1}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition ${currentIndex === questions.length - 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-blue-700 border-blue-200 bg-white hover:bg-blue-50'}`}
              >
                {content?.next} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] items-start">
            <div className="rounded-3xl bg-white/80 border border-blue-100 shadow-md p-5 md:p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center text-2xl">
                  {['🪞','🏃','🧥','🎨','🧘'][currentIndex]}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-blue-600">{content?.progressLabel} {currentIndex + 1}</p>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">{currentQuestion?.title}</h2>
                  <p className="text-gray-700 text-base leading-relaxed">{currentQuestion?.prompt}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.keys(emotionLabels).map((emotion) => {
                  const isSelected = answers[currentIndex] === emotion
                  return (
                    <motion.button
                      key={emotion}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelect(emotion)}
                      className={`text-left rounded-2xl border px-4 py-3 flex items-center gap-3 font-semibold transition shadow-sm ${emotionStyles[emotion] ?? 'bg-white text-gray-800 border-gray-200'} ${isSelected ? 'ring-2 ring-offset-2 ring-blue-400 shadow-lg' : ''}`}
                    >
                      <span className="text-xl" aria-hidden="true">{emotionIcons[emotion] ?? '⭐'}</span>
                      <span>{emotionLabels[emotion]}</span>
                    </motion.button>
                  )
                })}
              </div>

              {answers[currentIndex] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 p-4 flex items-start gap-3 text-sm text-gray-800"
                >
                  <Heart className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-700">{emotionLabels[answers[currentIndex]]}</p>
                    <p className="text-gray-700">{content?.instruction}</p>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="rounded-3xl bg-white/90 border border-purple-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-purple-700 font-semibold">
                  <Lightbulb className="w-5 h-5" />
                  <span>{content?.parentLabel}</span>
                </div>
                <button
                  onClick={() => setOpenTip(openTip === currentIndex ? null : currentIndex)}
                  className="text-sm font-semibold text-purple-700 px-3 py-1 rounded-xl bg-purple-50 border border-purple-100 hover:bg-purple-100"
                >
                  {content?.parentButton}
                </button>
              </div>
              <AnimatePresence mode="wait">
                {openTip === currentIndex && (
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 p-4 text-sm leading-relaxed text-gray-800"
                  >
                    {currentQuestion?.focus}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className={`rounded-2xl border border-dashed border-blue-200 bg-blue-50/60 p-4 text-sm text-gray-700 ${language === 'ar' ? 'text-right' : ''}`}>
                <div className="flex items-center gap-2 font-semibold text-blue-700 mb-2">
                  <Palette className="w-4 h-4" />
                  <span>Tip</span>
                </div>
                <p>
                  {language === 'ar'
                    ? 'تحدث عن الاختلافات في الأجساد والأحاسيس بلطف. لا توجد إجابة صحيحة أو خاطئة—المشاعر جميعها مهمة.'
                    : language === 'ms'
                      ? 'Bercakap dengan lembut tentang perbezaan tubuh dan perasaan. Tiada jawapan betul atau salah—semua perasaan penting.'
                      : 'Talk gently about how bodies and feelings differ. There is no right or wrong answer—every feeling matters.'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{language === 'ar' ? 'يمكنك التمرير أو الضغط على الرقم للانتقال بين الأسئلة.' : language === 'ms' ? 'Tatal atau tekan nombor untuk bergerak antara soalan.' : 'Swipe or tap a number to move between questions.'}</span>
            </div>
            <div className="flex gap-2">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  aria-label={`${content?.progressLabel} ${idx + 1}`}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold transition ${idx === currentIndex ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

