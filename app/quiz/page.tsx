'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, PartyPopper, Sparkles, SmilePlus, RefreshCcw } from 'lucide-react'

const quizQuestions = [
  {
    question: 'When does puberty usually begin?',
    options: ['Ages 5-7', 'Ages 8-14', 'Ages 15-18', 'Ages 20+'],
    correct: 'Ages 8-14',
    funHint: "Bodies are like popcorn kernels—they pop at different times!",
    emoji: '⏰'
  },
  {
    question: 'What is a common physical change during puberty?',
    options: ['Getting shorter', 'Growth spurts', 'Turning into a robot', 'No changes'],
    correct: 'Growth spurts',
    funHint: 'You might shoot up like a superhero stretching their cape.',
    emoji: '🦸'
  },
  {
    question: 'Mood swings during puberty are...',
    options: ['Abnormal', 'Normal and common', 'A sign of illness', 'Only for cats'],
    correct: 'Normal and common',
    funHint: 'Feelings can zoom around like rollercoasters—seatbelts on!',
    emoji: '🎢'
  },
  {
    question: 'Everyone goes through puberty...',
    options: ['At the exact same time', 'At different times', 'Only boys', 'Only girls'],
    correct: 'At different times',
    funHint: 'Think of popcorn again—every kernel pops when it is ready.',
    emoji: '🍿'
  },
  {
    question: 'Which habit helps with body changes?',
    options: ['Never sleeping', 'Balanced meals & water', 'Skipping showers forever', 'Only playing video games'],
    correct: 'Balanced meals & water',
    funHint: 'Fueling up with good food = hero-level energy.',
    emoji: '🥦'
  },
]

export default function QuizPage() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    let correct = 0
    quizQuestions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        correct++
      }
    })
    return { correct, total: quizQuestions.length }
  }, [answers])

  const handleSubmit = () => setSubmitted(true)
  const resetQuiz = () => {
    setAnswers({})
    setSubmitted(false)
  }

  const sillyCelebrations = [
    'You unlocked a virtual high-five! ✋',
    'Brain power level: giggle genius.',
    'Learning + laughter = unstoppable!',
    'Science says smiling helps you remember facts. 😄',
  ]

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold text-sm">Giggles encouraged! Made for curious kids.</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Quiz Corner 🎉
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Answer playful questions, collect smiles, and learn about growing bodies and feelings.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-3xl p-6 md:p-8 mb-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-100 text-primary-700 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl">
              🧠
            </div>
            <div>
              <p className="text-sm text-gray-600">Progress</p>
              <p className="text-xl font-bold text-gray-800">
                {Object.keys(answers).length}/{quizQuestions.length} answered
              </p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600">Silly facts</p>
            <p className="text-base font-semibold text-gray-800">
              {sillyCelebrations[Object.keys(answers).length % sillyCelebrations.length]}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 mb-10">
        {quizQuestions.map((question, index) => {
          const isCorrect = submitted && answers[index] === question.correct
          const isWrong = submitted && answers[index] && answers[index] !== question.correct

          return (
            <motion.div
              key={question.question}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-effect rounded-3xl p-6 md:p-7"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center text-2xl">
                  {question.emoji}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Question {index + 1}</p>
                  <h3 className="text-xl font-bold text-gray-800">{question.question}</h3>
                </div>
                {submitted && (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {isCorrect ? <PartyPopper className="w-5 h-5" /> : <Brain className="w-5 h-5" />}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: submitted ? 1 : 1.02 }}
                    whileTap={{ scale: submitted ? 1 : 0.98 }}
                    disabled={submitted}
                    onClick={() => setAnswers({ ...answers, [index]: option })}
                    className={`text-left p-4 rounded-2xl border transition-all duration-200 ${
                      answers[index] === option
                        ? 'border-primary-400 bg-gradient-to-r from-primary-50 to-secondary-50 shadow-sm'
                        : 'border-gray-200 hover:border-primary-200 hover:shadow-sm'
                    } ${submitted && option === question.correct ? 'ring-2 ring-green-400' : ''} ${
                      submitted && answers[index] === option && option !== question.correct ? 'bg-red-50 border-red-200 text-red-700' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-gray-800">{option}</span>
                      {submitted && option === question.correct && <Sparkles className="w-5 h-5 text-green-600" />}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-600 bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                <SmilePlus className="w-5 h-5 text-primary-500" />
                <span className="font-medium">Giggle hint:</span>
                <span>{question.funHint}</span>
              </div>

              {submitted && isWrong && (
                <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl p-3">
                  The correct answer was <strong>{question.correct}</strong>. You got this next time!
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-3xl p-6 md:p-8"
      >
        {!submitted ? (
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex-1 text-center md:text-left">
              <p className="text-sm text-gray-600">Ready to lock in your answers?</p>
              <p className="text-2xl font-bold text-gray-800">Tap submit to see your silly score!</p>
            </div>
            <motion.button
              whileHover={{ scale: Object.keys(answers).length === quizQuestions.length ? 1.05 : 1 }}
              whileTap={{ scale: 0.97 }}
              disabled={Object.keys(answers).length !== quizQuestions.length}
              onClick={handleSubmit}
              className={`px-6 py-4 rounded-full font-semibold text-lg w-full md:w-auto ${
                Object.keys(answers).length === quizQuestions.length
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Answers
            </motion.button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <p className="text-sm text-gray-600">Quiz complete!</p>
              <p className="text-3xl font-bold text-gray-800 mb-2">
                You scored {score.correct} / {score.total}
              </p>
              <p className="text-gray-700">
                {score.correct === score.total
                  ? 'Flawless victory! Your brain deserves a dance break.'
                  : 'Great effort! Re-take the quiz for more giggles and practice.'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetQuiz}
                className="px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-800 font-semibold flex items-center gap-2"
              >
                <RefreshCcw className="w-5 h-5" />
                Try Again
              </motion.button>
              <div className="px-4 py-3 rounded-2xl bg-gradient-to-r from-green-100 to-blue-100 text-green-800 font-semibold">
                <PartyPopper className="w-5 h-5 inline mr-2" /> Keep the fun going!
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
