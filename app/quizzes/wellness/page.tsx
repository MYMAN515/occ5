'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, RefreshCcw, ArrowRight, ArrowLeft, Smile } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function WellnessQuizPage() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'
  const questions = useMemo(() => t('wellnessQuiz.questions') as any[], [t])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(questions?.length || 0).fill(''))
  const [complete, setComplete] = useState(false)

  const current = questions?.[index]

  if (!questions?.length) return null

  const handleSelect = (option: string) => {
    const updated = [...answers]
    updated[index] = option
    setAnswers(updated)
  }

  const feedbackText = answers[index]
    ? (answers[index] === current.correct
      ? t('wellnessQuiz.status.correct') + ' ' + current.feedback.correct
      : t('wellnessQuiz.status.incorrect') + ' ' + current.feedback.incorrect)
    : ''

  const goNext = () => {
    if (index === questions.length - 1) {
      setComplete(true)
    } else {
      setIndex(index + 1)
    }
  }

  const goPrev = () => setIndex(Math.max(0, index - 1))

  const score = answers.reduce((acc, ans, idx) => acc + (ans && ans === questions[idx].correct ? 1 : 0), 0)

  const summaryText = t('wellnessQuiz.summary')
    .replace('{correct}', `${score}`)
    .replace('{total}', `${questions.length}`)

  return (
    <div className={`container mx-auto px-4 py-10 ${isRTL ? 'text-right' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-amber-50 text-purple-700 font-semibold mb-4">
          <Sparkles className="w-5 h-5" />
          {t('nav.quizzes')}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-amber-500 to-pink-600 bg-clip-text text-transparent">
          {t('wellnessQuiz.title')}
        </h1>
        <p className={`text-lg text-gray-700 max-w-4xl mx-auto ${isRTL ? 'text-right' : 'text-center'}`}>
          {t('wellnessQuiz.intro')}
        </p>
      </motion.div>

      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-3xl p-6 md:p-8"
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-amber-500 text-white flex items-center justify-center text-2xl">
            {current.icon}
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('bodyImage.progress').replace('{current}', `${index + 1}`).replace('{total}', `${questions.length}`)}</p>
            <h2 className="text-2xl font-bold text-gray-900">{current.prompt}</h2>
            <p className="text-sm text-gray-600">{t('wellnessQuiz.continue')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {current.options.map((option: string) => {
            const selected = answers[index] === option
            const answered = answers[index]
            return (
              <motion.button
                key={option}
                whileHover={{ scale: answered ? 1 : 1.02 }}
                whileTap={{ scale: answered ? 1 : 0.98 }}
                onClick={() => handleSelect(option)}
                className={`rounded-2xl border-2 p-4 text-left transition-all flex justify-between items-center gap-3 ${selected ? 'border-purple-300 bg-purple-50 shadow-md' : 'border-gray-200 bg-white hover:border-purple-200'} ${answered && option === current.correct ? 'ring-2 ring-emerald-400' : ''}`}
                aria-pressed={selected}
              >
                <span className="font-semibold text-gray-800">{option}</span>
                {answered && option === current.correct && <Smile className="w-5 h-5 text-emerald-500" />}
              </motion.button>
            )
          })}
        </div>

        {feedbackText && (
          <div className={`rounded-2xl p-4 text-sm ${answers[index] === current.correct ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
            {feedbackText}
          </div>
        )}

        <div className="flex items-center justify-between gap-3 mt-6">
          <button
            onClick={goPrev}
            disabled={index === 0}
            className={`flex items-center gap-2 px-4 py-3 rounded-full border-2 ${index === 0 ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-200 hover:border-purple-200'}`}
          >
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t('navigation.previous') ?? 'Previous'}</span>
          </button>
          <button
            onClick={goNext}
            disabled={!answers[index]}
            className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold ${answers[index] ? 'text-white bg-gradient-to-r from-purple-500 to-amber-500 shadow-lg' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          >
            <span>{index === questions.length - 1 ? t('wellnessQuiz.buttons.finish') : t('wellnessQuiz.nextQuestion')}</span>
            {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>

      {complete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-3xl p-6 md:p-8 mt-6 bg-gradient-to-r from-emerald-50 to-blue-50"
        >
          <div className="flex items-start gap-3 mb-3">
            <RefreshCcw className="w-6 h-6 text-emerald-600" />
            <div>
              <p className="text-sm text-gray-600">{t('wellnessQuiz.resultIntro')}</p>
              <p className="text-xl font-bold text-gray-900">{summaryText}</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm">{t('wellnessQuiz.encouragement')}</p>
          <div className="flex gap-3 flex-wrap mt-4">
            <button
              onClick={() => {
                setAnswers(Array(questions.length).fill(''))
                setIndex(0)
                setComplete(false)
              }}
              className="px-5 py-3 rounded-full border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" /> {t('wellnessQuiz.buttons.startOver')}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
