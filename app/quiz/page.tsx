'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Sparkles, Trophy, RefreshCcw, PartyPopper, Laugh, Rocket } from 'lucide-react'

const quizQuestions = [
  {
    question: "When does puberty typically start?",
    options: ["Ages 5-7", "Ages 8-14", "Ages 15-18", "Ages 20+"],
    correct: "Ages 8-14",
    fun: "Everyone's timeline is unique—no stopwatch needed!",
    emoji: "⏰"
  },
  {
    question: "What is a common physical change during puberty?",
    options: ["Getting shorter", "Growth spurts", "Losing hair", "No changes"],
    correct: "Growth spurts",
    fun: "Suddenly your favorite pants look like capris. Magic!",
    emoji: "🦒"
  },
  {
    question: "Mood swings during puberty are:",
    options: ["Abnormal", "Normal and common", "A sign of illness", "Rare"],
    correct: "Normal and common",
    fun: "Feelings = rollercoaster. Remember to buckle up and breathe!",
    emoji: "🎢"
  },
  {
    question: "Everyone goes through puberty:",
    options: ["At the exact same time", "At different times", "Only boys", "Only girls"],
    correct: "At different times",
    fun: "Just like popcorn—everyone pops at their own moment.",
    emoji: "🍿"
  },
  {
    question: "What helps with body odor?",
    options: ["Never showering", "Using deodorant", "Avoiding exercise", "Living in the ocean"],
    correct: "Using deodorant",
    fun: "Superhero cape? Nah. Fresh deodorant? Yes, please!",
    emoji: "🦸"
  },
  {
    question: "A healthy puberty routine includes:",
    options: ["No sleep", "Skipping meals", "Hygiene and sleep", "Only snacks"],
    correct: "Hygiene and sleep",
    fun: "Sleep is your secret superpower. Hygiene is your sparkly shield!",
    emoji: "🛡️"
  }
]

type AnswerMap = { [key: number]: string }

export default function QuizPage() {
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    const correct = quizQuestions.reduce((sum, q, index) => sum + (answers[index] === q.correct ? 1 : 0), 0)
    return { correct, total: quizQuestions.length }
  }, [answers])

  const handleSelect = (index: number, option: string) => {
    if (submitted) return
    setAnswers({ ...answers, [index]: option })
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  const answeredCount = Object.keys(answers).length

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 font-semibold mb-4">
          <Sparkles className="w-5 h-5" />
          New! Giggle-worthy quiz land
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Quiz Quest for Kids
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Tap, laugh, and learn about changes and self-care. Each question drops a tiny tip so you finish smarter and smilier.
        </p>
        <div className="mt-4 flex justify-center flex-wrap gap-3 text-sm text-gray-600">
          <span className="px-3 py-1 rounded-full bg-primary-50">Answer by tapping—mobile ready!</span>
          <span className="px-3 py-1 rounded-full bg-secondary-50">Silly feedback after every pick</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-3xl p-6 md:p-8 mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Brain className="w-10 h-10 text-primary-600" />
            <div>
              <p className="text-sm text-gray-500">Progress</p>
              <p className="text-xl font-bold text-gray-800">{answeredCount}/{quizQuestions.length} answered</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <PartyPopper className="w-4 h-4" /> Funny feedback included
            </div>
            <div className="bg-secondary-50 text-secondary-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <Rocket className="w-4 h-4" /> Kid-friendly buttons
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {quizQuestions.map((q, index) => {
          const selected = answers[index]
          const isCorrect = selected === q.correct

          return (
            <motion.div
              key={q.question}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-effect rounded-3xl p-6 md:p-7"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="text-3xl">{q.emoji}</div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-primary-600 font-semibold">Level {index + 1}</p>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">{q.question}</h3>
                  <p className="text-sm text-gray-600">Pick the silliest-sounding right answer.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((option) => {
                  const active = option === selected
                  const status = submitted && option === q.correct
                  const wrongSelected = submitted && active && !status
                  return (
                    <motion.button
                      key={option}
                      whileHover={!submitted ? { scale: 1.02 } : {}}
                      whileTap={!submitted ? { scale: 0.97 } : {}}
                      onClick={() => handleSelect(index, option)}
                      className={`rounded-2xl border-2 text-left p-4 transition-all flex justify-between items-center gap-3 ${
                        active
                          ? 'border-primary-400 bg-gradient-to-r from-primary-50 to-secondary-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-primary-200'
                      } ${status ? 'ring-2 ring-green-400' : ''} ${wrongSelected ? 'bg-red-50 border-red-200' : ''}`}
                    >
                      <span className="font-semibold text-gray-800">{option}</span>
                      {submitted && status && <Trophy className="w-5 h-5 text-green-500" />}
                      {submitted && wrongSelected && <Laugh className="w-5 h-5 text-red-400" />}
                    </motion.button>
                  )
                })}
              </div>

              {selected && (
                <div className={`mt-4 rounded-2xl p-4 text-sm flex items-start gap-3 ${
                  isCorrect ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'
                }`}>
                  <Sparkles className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">{isCorrect ? 'Shiny brain power!' : 'Close! Here is a hint:'}</p>
                    <p>{q.fun}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-3xl p-6 md:p-8 mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <Trophy className="w-10 h-10 text-secondary-600" />
          <div>
            <p className="text-sm text-gray-500">Ready to see your score?</p>
            <p className="text-xl font-bold text-gray-800">{score.correct} of {score.total} correct</p>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          {!submitted ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              disabled={answeredCount !== quizQuestions.length}
              onClick={() => setSubmitted(true)}
              className={`px-6 py-3 rounded-full font-semibold text-white shadow-lg ${
                answeredCount === quizQuestions.length
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Reveal Answers
            </motion.button>
          ) : (
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-r from-green-100 to-blue-100 text-gray-800 px-4 py-2 rounded-xl font-semibold"
              >
                {score.correct === score.total
                  ? 'Flawless victory!'
                  : score.correct >= score.total / 2
                  ? 'You rock—almost perfect!'
                  : 'Great hustle—try again for more giggles!'}
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleReset}
                className="px-5 py-3 rounded-full font-semibold bg-white border-2 border-primary-200 text-primary-700 flex items-center gap-2"
              >
                <RefreshCcw className="w-4 h-4" />
                Play Again
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
