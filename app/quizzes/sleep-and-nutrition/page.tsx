'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bed, Droplets, MoveRight, Salad, ShieldCheck, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

type QuizOption = {
  text: string
  correct: boolean
  feedback: string
}

type QuizItem = {
  id: string
  icon: string
  prompt: string
  note: string
  options: QuizOption[]
}

export default function SleepAndNutritionQuizPage() {
  const { t } = useLanguage()
  const questions = useMemo(() => (t('sleepQuiz.questions') as QuizItem[]) || [], [t])
  const [current, setCurrent] = useState(0)
  const [selection, setSelection] = useState<Record<string, number>>({})
  const [complete, setComplete] = useState(false)
  const format = (value: string, replacements: Record<string, string | number>) => {
    let output = value
    Object.entries(replacements).forEach(([key, val]) => {
      output = output.replace(`{{${key}}}`, String(val))
    })
    return output
  }

  const activeQuestion = questions[current]
  const selectedOptionIndex = activeQuestion ? selection[activeQuestion.id] : undefined

  const handleSelect = (index: number) => {
    if (!activeQuestion) return
    setSelection((prev) => ({ ...prev, [activeQuestion.id]: index }))
  }

  const handleNext = () => {
    if (current === questions.length - 1) {
      setComplete(true)
    } else {
      setCurrent((prev) => prev + 1)
    }
  }

  const handleRestart = () => {
    setSelection({})
    setCurrent(0)
    setComplete(false)
  }

  if (!activeQuestion) return null

  const score = Object.values(selection).reduce((sum, index, idx) => {
    const q = questions[idx]
    if (q?.options[index]?.correct) return sum + 1
    return sum
  }, 0)

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 space-y-8">
      <header className="text-center space-y-3">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-emerald-50 text-blue-700 font-semibold">
          <Bed className="w-4 h-4" />
          {t('sleepQuiz.badge')}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent">
          {t('sleepQuiz.title')}
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {t('sleepQuiz.subtitle')}
        </p>
      </header>

      <section className="glass-effect rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <p className="font-semibold text-gray-800">
              {format(t('sleepQuiz.progress') as string, { current: current + 1, total: questions.length })}
            </p>
          </div>
          <div className="flex gap-2">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className={`w-10 h-2 rounded-full ${
                  idx === current ? 'bg-gradient-to-r from-blue-500 to-emerald-500' : 'bg-gray-200'
                }`}
                aria-hidden
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeQuestion.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            <div className="md:col-span-1 rounded-3xl bg-gradient-to-br from-blue-100 via-white to-emerald-100 p-5 shadow-inner">
              <div className="text-4xl" aria-hidden>{activeQuestion.icon}</div>
              <h2 className="text-xl font-bold text-gray-900 mt-2">{activeQuestion.prompt}</h2>
              <p className="text-gray-700 mt-2">{activeQuestion.note}</p>
            </div>

            <div className="md:col-span-2 space-y-3">
              {activeQuestion.options.map((option, index) => {
                const selected = selectedOptionIndex === index
                const showFeedback = selected
                return (
                  <motion.button
                    key={option.text}
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => handleSelect(index)}
                    className={`w-full text-left rounded-2xl border-2 p-4 transition-all flex justify-between items-center gap-3 ${
                      selected
                        ? option.correct
                          ? 'border-emerald-300 bg-emerald-50'
                          : 'border-amber-300 bg-amber-50'
                        : 'border-gray-200 bg-white hover:border-blue-200'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{option.text}</p>
                      {showFeedback && (
                        <p className="text-sm text-gray-700 mt-1">{option.feedback}</p>
                      )}
                    </div>
                    {selected && (
                      <span className="text-xl" aria-hidden>
                        {option.correct ? '✅' : '💡'}
                      </span>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Sparkles className="w-4 h-4" />
            <span>{t('sleepQuiz.feedbackHint')}</span>
          </div>
          <button
            onClick={handleNext}
            disabled={selectedOptionIndex === undefined}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {current === questions.length - 1 ? t('sleepQuiz.finish') : t('sleepQuiz.next')}
            <MoveRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {complete && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <Droplets className="w-8 h-8 text-emerald-600" />
            <div>
              <p className="text-sm text-gray-600">{t('sleepQuiz.results.label')}</p>
              <p className="text-2xl font-bold text-gray-900">{format(t('sleepQuiz.results.score') as string, { score, total: questions.length })}</p>
              <p className="text-gray-700">{t('sleepQuiz.results.message')}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRestart}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-emerald-200 hover:bg-emerald-100"
            >
              {t('sleepQuiz.restart')}
            </button>
            <button
              onClick={() => setCurrent(0)}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-emerald-500 shadow-lg"
            >
              {t('sleepQuiz.review')}
            </button>
          </div>
        </motion.section>
      )}
    </div>
  )
}
