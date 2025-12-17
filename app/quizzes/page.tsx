'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, BookOpen, Heart, RefreshCcw, Sparkles, ArrowRight, CheckCircle, Shield, Smile } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

type QuizQuestion = {
  question: string
  options: string[]
  correctIndex: number
  correctFeedback: string
  incorrectFeedback: string
  icon: string
}

type QuizContent = {
  title: string
  subtitle: string
  tag: string
  pickerTitle: string
  labels: Record<string, string>
  sleep: QuizSection
  puberty: QuizSection
  tips: {
    oneAtATime: string
    encouragement: string
  }
}

type QuizSection = {
  title: string
  description: string
  questions: QuizQuestion[]
  summary: {
    perfect: string
    good: string
    keepGoing: string
  }
}

type QuizKey = 'sleep' | 'puberty'

export default function QuizzesPage() {
  const { t, language } = useLanguage()
  const content = t('quizzesPage') as QuizContent
  const quizData = useMemo(() => ({ sleep: content?.sleep, puberty: content?.puberty }), [content])
  const [activeQuiz, setActiveQuiz] = useState<QuizKey>('sleep')
  const [currentQuestion, setCurrentQuestion] = useState<Record<QuizKey, number>>({ sleep: 0, puberty: 0 })
  const [answers, setAnswers] = useState<Record<QuizKey, number[]>>({ sleep: [], puberty: [] })
  const [completed, setCompleted] = useState<Record<QuizKey, boolean>>({ sleep: false, puberty: false })

  const activeSection = quizData[activeQuiz]
  const questions = activeSection?.questions ?? []
  const activeIndex = currentQuestion[activeQuiz] ?? 0
  const selectedAnswer = answers[activeQuiz]?.[activeIndex]
  const isRTL = language === 'ar'
  const tips = content?.tips ?? { oneAtATime: '', encouragement: '' }

  useEffect(() => {
    setCurrentQuestion((prev) => ({ ...prev, [activeQuiz]: 0 }))
  }, [activeQuiz])

  const handleSelect = (optionIndex: number) => {
    setAnswers((prev) => {
      const updated = [...(prev[activeQuiz] ?? [])]
      updated[activeIndex] = optionIndex
      return { ...prev, [activeQuiz]: updated }
    })
  }

  const handleNext = () => {
    if (activeIndex < questions.length - 1) {
      setCurrentQuestion((prev) => ({ ...prev, [activeQuiz]: activeIndex + 1 }))
    } else {
      setCompleted((prev) => ({ ...prev, [activeQuiz]: true }))
    }
  }

  const handleRestart = () => {
    setAnswers((prev) => ({ ...prev, [activeQuiz]: [] }))
    setCurrentQuestion((prev) => ({ ...prev, [activeQuiz]: 0 }))
    setCompleted((prev) => ({ ...prev, [activeQuiz]: false }))
  }

  const score = useMemo(() => {
    const quizAnswers = answers[activeQuiz] ?? []
    const correctCount = (quizData[activeQuiz]?.questions ?? []).reduce((sum, q, idx) => {
      return sum + ((quizAnswers[idx] ?? -1) === q.correctIndex ? 1 : 0)
    }, 0)
    return { correct: correctCount, total: questions.length }
  }, [answers, activeQuiz, quizData, questions.length])

  const currentQuestionData = questions[activeIndex]
  const hasAnswer = selectedAnswer !== undefined
  const isCorrect = hasAnswer && selectedAnswer === currentQuestionData?.correctIndex

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 font-semibold">
            <Sparkles className="w-4 h-4" /> {content?.tag}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{content?.title}</h1>
          <p className="text-gray-700 text-base md:text-lg">{content?.subtitle}</p>
        </div>
        <div className="glass-effect rounded-2xl p-4 bg-gradient-to-br from-blue-50 to-purple-50 text-sm text-gray-700 max-w-sm">
          <div className="flex items-center gap-2 font-semibold text-blue-700">
            <Brain className="w-4 h-4" />
            <span>{content?.pickerTitle}</span>
          </div>
          <p className="mt-2 text-gray-700">{content?.labels?.selectOption}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {(['sleep', 'puberty'] as QuizKey[]).map((key) => {
          const quiz = quizData[key]
          const active = activeQuiz === key
          return (
            <motion.button
              key={key}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveQuiz(key)}
              className={`text-left rounded-3xl border p-5 md:p-6 shadow-sm transition glass-effect ${active ? 'border-primary-300 ring-2 ring-primary-200' : 'border-gray-200 hover:border-primary-200'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${key === 'sleep' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                  {key === 'sleep' ? '💤' : '🌱'}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-primary-600">{key === 'sleep' ? content?.sleep?.title : content?.puberty?.title}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{quiz?.description}</p>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      <div className="glass-effect rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white flex items-center justify-center text-xl">
              {activeQuiz === 'sleep' ? '💤' : '🌱'}
            </div>
            <div>
              <p className="text-sm uppercase font-semibold text-primary-700">{activeQuiz === 'sleep' ? content?.sleep?.title : content?.puberty?.title}</p>
              <p className="text-xs text-gray-600">{content?.pickerTitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>{score.correct} / {score.total}</span>
          </div>
        </div>

        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
          <div
            className="h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all"
            style={{ width: `${questions.length ? ((activeIndex + 1) / questions.length) * 100 : 0}%` }}
          ></div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="rounded-3xl bg-white/80 border border-gray-100 shadow-md p-5 md:p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-2xl">
                {currentQuestionData?.icon || '❔'}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-primary-700">{content?.labels?.summary} {activeIndex + 1}/{questions.length}</p>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">{currentQuestionData?.question}</h2>
                <p className="text-sm text-gray-600">{content?.labels?.selectOption}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestionData?.options?.map((option, idx) => {
                const selected = selectedAnswer === idx
                return (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(idx)}
                    className={`text-left rounded-2xl border px-4 py-3 flex items-center gap-3 font-semibold transition shadow-sm ${selected ? 'border-primary-300 bg-primary-50 ring-2 ring-primary-200' : 'border-gray-200 bg-white hover:border-primary-200'}`}
                  >
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${selected ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </motion.button>
                )
              })}
            </div>

            <AnimatePresence>
              {hasAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 rounded-2xl p-4 text-sm flex items-start gap-3 ${isCorrect ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-amber-50 text-amber-800 border border-amber-100'}`}
                >
                  <Heart className={`w-4 h-4 ${isCorrect ? 'text-green-600' : 'text-amber-600'} mt-0.5`} />
                  <div>
                    <p className="font-semibold">{isCorrect ? content?.labels?.summary : content?.labels?.encouragement}</p>
                    <p>{isCorrect ? currentQuestionData?.correctFeedback : currentQuestionData?.incorrectFeedback}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-5 gap-3 flex-wrap">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
              >
                <RefreshCcw className="w-4 h-4" /> {content?.labels?.restart}
              </button>
              <button
                onClick={handleNext}
                disabled={!hasAnswer}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white ${hasAnswer ? 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                {activeIndex === questions.length - 1 ? content?.labels?.summary : content?.labels?.next}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white/90 border border-gray-100 shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-primary-600" />
              <div>
                <p className="text-sm text-gray-500">{content?.labels?.summary}</p>
                <p className="text-xl font-bold text-gray-900">{score.correct} / {score.total}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-primary-600 mt-0.5" />
                <span>{tips.oneAtATime}</span>
              </div>
              <div className="flex items-start gap-2">
                <Smile className="w-4 h-4 text-secondary-600 mt-0.5" />
                <span>{tips.encouragement}</span>
              </div>
            </div>

            {completed[activeQuiz] && (
              <div className="rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 border border-green-100 p-4 space-y-2 text-sm text-gray-800">
                <p className="font-semibold text-green-700">{content?.labels?.summary}</p>
                <p>
                  {score.correct === score.total
                    ? activeSection?.summary?.perfect
                    : score.correct >= Math.ceil(score.total / 2)
                      ? activeSection?.summary?.good
                      : activeSection?.summary?.keepGoing}
                </p>
                <p className="text-gray-700">{content?.labels?.encouragement}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
