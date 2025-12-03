'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Brain, Puzzle, Target, Trophy, Heart, Smile } from 'lucide-react'

type GameState = 'intro' | 'playing' | 'finished'
export type GameType = 'memory' | 'quiz' | 'matching' | 'emotions'

export function GameContent({ gameType, onClose }: { gameType: GameType; onClose?: () => void }) {
  const [gameState, setGameState] = useState<GameState>('intro')
  const [score, setScore] = useState(0)

  if (gameType === 'memory') {
    return <MemoryGame gameState={gameState} setGameState={setGameState} score={score} setScore={setScore} onClose={onClose} />
  }

  if (gameType === 'quiz') {
    return <QuizGame gameState={gameState} setGameState={setGameState} score={score} setScore={setScore} onClose={onClose} />
  }

  if (gameType === 'matching') {
    return <MatchingGame gameState={gameState} setGameState={setGameState} score={score} setScore={setScore} onClose={onClose} />
  }

  return <EmotionsGame gameState={gameState} setGameState={setGameState} score={score} setScore={setScore} onClose={onClose} />
}

function MemoryGame({ gameState, setGameState, score, setScore, onClose }: any) {
  const { t } = useLanguage()
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([])
  const [cards, setCards] = useState<string[]>([])
  const [showSparkle, setShowSparkle] = useState(false)

  const emojis = ['😊', '😢', '😠', '😰', '😴', '🤗', '😎', '🥰']
  const emojiLabels: Record<string, string> = {
    '😊': t('games.aria.emojiHappy'),
    '😢': t('games.aria.emojiSad'),
    '😠': t('games.aria.emojiAngry'),
    '😰': t('games.aria.emojiNervous'),
    '😴': t('games.aria.emojiSleepy'),
    '🤗': t('games.aria.emojiHug'),
    '😎': t('games.aria.emojiCool'),
    '🥰': t('games.aria.emojiLoved')
  }

  const popStar = () => {
    setShowSparkle(true)
    setTimeout(() => setShowSparkle(false), 800)
  }

  const startGame = () => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setGameState('playing')
    setScore(0)
    setFlippedCards([])
    setMatchedCards([])
  }

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) return

    const newFlipped = [...flippedCards, index]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatchedCards([...matchedCards, ...newFlipped])
        setScore(score + 10)
        popStar()
        setFlippedCards([])

        if (matchedCards.length + 2 === cards.length) {
          setTimeout(() => setGameState('finished'), 500)
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000)
      }
    }
  }

  return (
    <div className="text-center">
      {gameState === 'intro' && (
        <>
          <Brain className="w-16 h-16 mx-auto mb-4 text-purple-500" aria-hidden />
          <h2 className="text-3xl font-bold mb-3 text-gray-800">{t('games.memory.title')}</h2>
          <p className="text-gray-600 mb-6">{t('games.memory.instructions')}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold"
          >
            {t('games.startGame')}
          </motion.button>
        </>
      )}

      {gameState === 'playing' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <h3 className="text-xl font-bold text-gray-800" aria-live="polite">{t('games.score')}: {score}</h3>
              <ScoreSparkle show={showSparkle} label={t('games.aria.sparkle')} />
            </div>
            {onClose && <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {cards.map((emoji, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCardClick(index)}
                className={`aspect-square rounded-xl text-4xl flex items-center justify-center ${
                  flippedCards.includes(index) || matchedCards.includes(index)
                    ? 'bg-gradient-to-r from-purple-400 to-indigo-500'
                    : 'bg-gradient-to-r from-gray-300 to-gray-400'
                }`}
                aria-label={
                  flippedCards.includes(index) || matchedCards.includes(index)
                    ? emojiLabels[emoji]
                    : t('games.aria.hiddenCard')
                }
              >
                {(flippedCards.includes(index) || matchedCards.includes(index)) ? emoji : '❓'}
              </motion.button>
            ))}
          </div>
        </>
      )}

      {gameState === 'finished' && (
        <>
          <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('games.congratulations')}</h2>
          <p className="text-xl text-gray-600 mb-6">{t('games.yourScore')}: {score}</p>
          <div className="flex gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold"
            >
              {t('games.playAgain')}
            </motion.button>
            {onClose && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold"
              >
                {t('games.close')}
              </motion.button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function QuizGame({ gameState, setGameState, score, setScore, onClose }: any) {
  const { t } = useLanguage()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showSparkle, setShowSparkle] = useState(false)

  const questions = [
    {
      question: t('games.quiz.q1.question'),
      answers: [
        t('games.quiz.q1.a1'),
        t('games.quiz.q1.a2'),
        t('games.quiz.q1.a3'),
        t('games.quiz.q1.a4')
      ],
      correct: 3
    },
    {
      question: t('games.quiz.q2.question'),
      answers: [
        t('games.quiz.q2.a1'),
        t('games.quiz.q2.a2'),
        t('games.quiz.q2.a3'),
        t('games.quiz.q2.a4')
      ],
      correct: 0
    },
    {
      question: t('games.quiz.q3.question'),
      answers: [
        t('games.quiz.q3.a1'),
        t('games.quiz.q3.a2'),
        t('games.quiz.q3.a3'),
        t('games.quiz.q3.a4')
      ],
      correct: 2
    }
  ]

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 10)
      setShowSparkle(true)
      setTimeout(() => setShowSparkle(false), 800)
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setGameState('finished')
      }
    }, 1500)
  }

  return (
    <div className="text-center">
      {gameState === 'intro' && (
        <>
          <Target className="w-16 h-16 mx-auto mb-4 text-blue-500" aria-hidden />
          <h2 className="text-3xl font-bold mb-3 text-gray-800">{t('games.quiz.title')}</h2>
          <p className="text-gray-600 mb-6">{t('games.quiz.instructions')}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameState('playing')}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-3 rounded-full font-semibold"
          >
            {t('games.startGame')}
          </motion.button>
        </>
      )}

      {gameState === 'playing' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              {t('games.question')} {currentQuestion + 1}/{questions.length}
            </h3>
            <div className="relative">
              <h3 className="text-xl font-bold text-gray-800" aria-live="polite">{t('games.score')}: {score}</h3>
              <ScoreSparkle show={showSparkle} label={t('games.aria.sparkle')} />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-8 text-gray-800">{questions[currentQuestion].question}</h3>
          <div className="space-y-3">
            {questions[currentQuestion].answers.map((answer, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                drag
                dragSnapToOrigin
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-xl font-medium transition-all ${
                  selectedAnswer === null
                    ? 'bg-white hover:bg-gray-50 text-gray-800'
                    : selectedAnswer === index
                    ? index === questions[currentQuestion].correct
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : index === questions[currentQuestion].correct
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {answer}
              </motion.button>
            ))}
          </div>
        </>
      )}

      {gameState === 'finished' && (
        <>
          <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('games.quizComplete')}</h2>
          <p className="text-xl text-gray-600 mb-6">
            {t('games.yourScore')}: {score}/{questions.length * 10}
          </p>
          <div className="flex gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setGameState('playing')
                setCurrentQuestion(0)
                setScore(0)
                setSelectedAnswer(null)
              }}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-full font-semibold"
            >
              {t('games.playAgain')}
            </motion.button>
            {onClose && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold"
              >
                {t('games.close')}
              </motion.button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function MatchingGame({ gameState, setGameState, score, setScore, onClose }: any) {
  const { t } = useLanguage()
  const [pairs] = useState([
    { left: t('games.matching.pair1.left'), right: t('games.matching.pair1.right'), id: 1 },
    { left: t('games.matching.pair2.left'), right: t('games.matching.pair2.right'), id: 2 },
    { left: t('games.matching.pair3.left'), right: t('games.matching.pair3.right'), id: 3 },
    { left: t('games.matching.pair4.left'), right: t('games.matching.pair4.right'), id: 4 }
  ])
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)
  const [matched, setMatched] = useState<number[]>([])
  const [cardPositions, setCardPositions] = useState<{ [key: number]: { x: number; y: number } }>({})
  const [showSparkle, setShowSparkle] = useState(false)

  const handleLeftClick = (id: number) => {
    if (matched.includes(id)) return
    setSelectedLeft(id)
    setCardPositions({
      ...cardPositions,
      [id]: { x: 0, y: -20 }
    })
  }

  const handleRightClick = (id: number) => {
    if (selectedLeft === id) {
      setMatched([...matched, id])
      setScore(score + 10)
      setShowSparkle(true)
      setTimeout(() => setShowSparkle(false), 800)
      setCardPositions({
        ...cardPositions,
        [id]: { x: 0, y: 0 }
      })
      setSelectedLeft(null)

      if (matched.length + 1 === pairs.length) {
        setTimeout(() => setGameState('finished'), 500)
      }
    } else {
      setCardPositions({
        ...cardPositions,
        [id]: { x: -10, y: 0 }
      })
      setTimeout(() => {
        setCardPositions({
          ...cardPositions,
          [id]: { x: 10, y: 0 }
        })
        setTimeout(() => {
          setCardPositions({
            ...cardPositions,
            [id]: { x: 0, y: 0 }
          })
        }, 100)
      }, 100)
      setSelectedLeft(null)
    }
  }

  return (
    <div className="text-center">
      {gameState === 'intro' && (
        <>
          <Puzzle className="w-16 h-16 mx-auto mb-4 text-pink-500" />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('games.matching.title')}</h2>
          <p className="text-gray-600 mb-6">{t('games.matching.instructions')}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameState('playing')}
            className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-3 rounded-full font-semibold"
          >
            {t('games.startGame')}
          </motion.button>
        </>
      )}

      {gameState === 'playing' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">{t('games.score')}: {score}</h3>
            {onClose && <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              {pairs.map((pair) => (
                <motion.button
                  key={pair.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  drag
                  dragSnapToOrigin
                  onClick={() => handleLeftClick(pair.id)}
                  className={`w-full p-4 rounded-xl text-left font-semibold transition-all ${
                    matched.includes(pair.id)
                      ? 'bg-green-50 border border-green-200 text-green-800'
                      : selectedLeft === pair.id
                        ? 'bg-blue-50 border border-blue-200 text-blue-800'
                        : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                  animate={cardPositions[pair.id]}
                >
                  {pair.left}
                </motion.button>
              ))}
            </div>
            <div className="space-y-3">
              {pairs
                .slice()
                .sort(() => Math.random() - 0.5)
                .map((pair) => (
                  <motion.button
                    key={pair.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    drag
                    dragSnapToOrigin
                    onClick={() => handleRightClick(pair.id)}
                    className={`w-full p-4 rounded-xl text-left font-semibold transition-all ${
                      matched.includes(pair.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-50 border border-gray-200 text-gray-800'
                    }`}
                    animate={cardPositions[pair.id]}
                  >
                    {pair.right}
                  </motion.button>
                ))}
            </div>
          </div>
        </>
      )}

      {gameState === 'finished' && (
        <>
          <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('games.congratulations')}</h2>
          <p className="text-xl text-gray-600 mb-6">{t('games.yourScore')}: {score}</p>
          <div className="flex gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setGameState('intro')
                setMatched([])
                setSelectedLeft(null)
                setScore(0)
              }}
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-3 rounded-full font-semibold"
            >
              {t('games.playAgain')}
            </motion.button>
            {onClose && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold"
              >
                {t('games.close')}
              </motion.button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function EmotionsGame({ gameState, setGameState, score, setScore, onClose }: any) {
  const { t } = useLanguage()
  const emotions = [
    { emoji: '😊', label: t('games.emotions.happy') },
    { emoji: '😢', label: t('games.emotions.sad') },
    { emoji: '😠', label: t('games.emotions.angry') },
    { emoji: '😨', label: t('games.emotions.scared') }
  ]
  const [selected, setSelected] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [showSparkle, setShowSparkle] = useState(false)

  const handleSelect = (index: number) => {
    setSelected(index)
    setFeedback(emotions[index].label)
    setScore(score + 5)
    setShowSparkle(true)
    setTimeout(() => setShowSparkle(false), 800)
  }

  return (
    <div className="text-center">
      {gameState === 'intro' && (
        <>
          <Heart className="w-16 h-16 mx-auto mb-4 text-red-500" aria-hidden />
          <h2 className="text-3xl font-bold mb-3 text-gray-800">{t('games.emotions.title')}</h2>
          <p className="text-gray-600 mb-6">{t('games.emotions.instructions')}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameState('playing')}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold"
          >
            {t('games.startGame')}
          </motion.button>
        </>
      )}

      {gameState === 'playing' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">{t('games.score')}: {score}</h3>
            {onClose && <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {emotions.map((emotion, index) => (
              <motion.button
                key={emotion.emoji}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(index)}
                className={`p-6 rounded-2xl text-center font-bold text-lg transition-all ${
                  selected === index
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-800 hover:border-red-200'
                }`}
              >
                <div className="text-4xl mb-2" role="img" aria-label={emotion.label}>{emotion.emoji}</div>
                <p>{emotion.label}</p>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-effect rounded-2xl p-4 bg-gradient-to-r from-red-50 to-pink-50 text-gray-800"
              >
                <div className="flex items-center justify-center gap-2 text-lg font-semibold">
                  <Smile className="w-5 h-5 text-red-500" />
                  {t('games.emotions.feedback')} {feedback}
                  <ScoreSparkle show={showSparkle} label={t('games.aria.sparkle')} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {gameState === 'finished' && (
        <>
          <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('games.congratulations')}</h2>
          <p className="text-xl text-gray-600 mb-6">{t('games.yourScore')}: {score}</p>
          <div className="flex gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setGameState('intro')
                setScore(0)
                setSelected(null)
                setFeedback(null)
              }}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold"
            >
              {t('games.playAgain')}
            </motion.button>
            {onClose && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold"
              >
                {t('games.close')}
              </motion.button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function ScoreSparkle({ show, label }: { show: boolean; label: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute -top-3 right-0 text-yellow-400 text-2xl drop-shadow-lg"
          role="img"
          aria-label={label}
        >
          ✨⭐
        </motion.div>
      )}
    </AnimatePresence>
  )
}
