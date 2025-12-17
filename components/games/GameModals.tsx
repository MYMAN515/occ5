'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Puzzle, Brain, Heart, Sparkles, Trophy } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export type GameType = 'memory' | 'quiz' | 'matching' | 'emotions'

type GameState = 'intro' | 'playing' | 'finished'

type GameModalProps = {
  selectedGame: GameType | null
  onClose: () => void
}

export function GameModal({ selectedGame, onClose }: GameModalProps) {
  return (
    <AnimatePresence>
      {selectedGame && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-effect rounded-3xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <GameContent gameType={selectedGame} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function GameContent({ gameType, onClose }: { gameType: GameType; onClose: () => void }) {
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

function useGameSounds() {
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close()
    }
  }, [])

  const playTone = (frequency: number, duration = 0.2, type: OscillatorType = 'sine', volume = 0.18) => {
    if (typeof window === 'undefined') return
    const AudioContextConstructor = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextConstructor) return

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContextConstructor()
    }

    const ctx = audioCtxRef.current
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()

    oscillator.type = type
    oscillator.frequency.value = frequency
    gain.gain.value = volume

    oscillator.connect(gain)
    gain.connect(ctx.destination)

    const now = ctx.currentTime
    oscillator.start(now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)
    oscillator.stop(now + duration + 0.05)
  }

  const playSuccess = () => {
    playTone(880, 0.22, 'triangle')
    setTimeout(() => playTone(660, 0.16, 'triangle', 0.12), 60)
  }

  const playError = () => playTone(180, 0.22, 'sawtooth', 0.12)

  const playStart = () => playTone(520, 0.16, 'square', 0.14)

  const playComplete = () => {
    playTone(660, 0.22, 'sine', 0.16)
    setTimeout(() => playTone(990, 0.24, 'sine', 0.14), 90)
  }

  return { playSuccess, playError, playStart, playComplete }
}

function MemoryGame({ gameState, setGameState, score, setScore, onClose }: any) {
  const { t } = useLanguage()
  const { playSuccess, playError, playStart, playComplete } = useGameSounds()
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([])
  const [cards, setCards] = useState<string[]>([])
  const [showSparkle, setShowSparkle] = useState(false)

  useEffect(() => {
    const emojiPairs = ['😊', '😢', '😡', '😱', '😍', '😴']
    const doubledPairs = [...emojiPairs, ...emojiPairs]
    const shuffled = doubledPairs.sort(() => Math.random() - 0.5)
    setCards(shuffled)
  }, [])

  const handleCardClick = (index: number) => {
    if (flippedCards.includes(index) || matchedCards.includes(index) || flippedCards.length === 2) return

    const newFlipped = [...flippedCards, index]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      if (cards[first] === cards[second]) {
        setMatchedCards([...matchedCards, first, second])
        setScore(score + 10)
        setShowSparkle(true)
        setTimeout(() => setShowSparkle(false), 800)
        setFlippedCards([])
        playSuccess()

        if (matchedCards.length + 2 === cards.length) {
          setTimeout(() => {
            playComplete()
            setGameState('finished')
          }, 500)
        }
      } else {
        playError()
        setTimeout(() => setFlippedCards([]), 1000)
      }
    }
  }

  const startGame = () => {
    playStart()
    setGameState('playing')
    setScore(0)
    setMatchedCards([])
    setFlippedCards([])
    const emojiPairs = ['😊', '😢', '😡', '😱', '😍', '😴']
    const doubledPairs = [...emojiPairs, ...emojiPairs]
    const shuffled = doubledPairs.sort(() => Math.random() - 0.5)
    setCards(shuffled)
  }

  return (
    <div className="text-center">
      {gameState === 'intro' && (
        <>
          <Heart className="w-16 h-16 mx-auto mb-4 text-pink-500" aria-hidden />
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 text-balance">
            {t('games.memory.title')}
          </h2>
          <p className="text-gray-600 mb-6 text-base sm:text-lg text-balance">{t('games.memory.instructions')}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-3 rounded-full font-semibold w-full sm:w-auto"
          >
            {t('games.startGame')}
          </motion.button>
        </>
      )}

      {gameState === 'playing' && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <div className="relative">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800" aria-live="polite">{t('games.score')}: {score}</h3>
              <ScoreSparkle show={showSparkle} label={t('games.aria.sparkle')} />
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 self-end sm:self-auto">✕</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cards.map((card, index) => {
              const isFlipped = flippedCards.includes(index) || matchedCards.includes(index)
              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCardClick(index)}
                  className={`aspect-square rounded-xl text-3xl flex items-center justify-center font-bold transition-all ${
                    isFlipped
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'bg-white shadow border border-gray-100'
                  }`}
                >
                  {isFlipped ? card : '❔'}
                </motion.button>
              )
            })}
          </div>
        </>
      )}

      {gameState === 'finished' && (
        <>
          <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-balance">
            {t('games.congratulations')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">{t('games.yourScore')}: {score}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold w-full sm:w-auto"
            >
              {t('games.playAgain')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold w-full sm:w-auto"
            >
              {t('games.close')}
            </motion.button>
          </div>
        </>
      )}
    </div>
  )
}

function QuizGame({ gameState, setGameState, score, setScore, onClose }: any) {
  const { t } = useLanguage()
  const { playSuccess, playError, playStart, playComplete } = useGameSounds()
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
      playSuccess()
    } else {
      playError()
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        playComplete()
        setGameState('finished')
      }
    }, 1500)
  }

  return (
    <div className="text-center">
      {gameState === 'intro' && (
        <>
          <Target className="w-16 h-16 mx-auto mb-4 text-blue-500" aria-hidden />
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 text-balance">{t('games.quiz.title')}</h2>
          <p className="text-gray-600 mb-6 text-base sm:text-lg text-balance">{t('games.quiz.instructions')}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playStart()
              setGameState('playing')
            }}
            className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-3 rounded-full font-semibold w-full sm:w-auto"
          >
            {t('games.startGame')}
          </motion.button>
        </>
      )}

      {gameState === 'playing' && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              {t('games.question')} {currentQuestion + 1}/{questions.length}
            </h3>
            <div className="relative">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800" aria-live="polite">{t('games.score')}: {score}</h3>
              <ScoreSparkle show={showSparkle} label={t('games.aria.sparkle')} />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-8 text-gray-800 text-balance">
            {questions[currentQuestion].question}
          </h3>
          <div className="space-y-3">
            {questions[currentQuestion].answers.map((answer, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-xl text-left font-semibold transition-all ${
                  selectedAnswer === null
                    ? 'bg-white border border-gray-100 hover:border-blue-200'
                    : index === questions[currentQuestion].correct
                      ? 'bg-green-500 text-white shadow-lg'
                      : selectedAnswer === index
                        ? 'bg-red-500 text-white'
                        : 'bg-white border border-gray-100 opacity-50'
                }`}
              >
                <span className="block break-words text-base sm:text-lg">{answer}</span>
              </motion.button>
            ))}
          </div>
        </>
      )}

      {gameState === 'finished' && (
        <>
          <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-balance">{t('games.quiz.complete')}</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">{t('games.yourScore')}: {score}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setGameState('intro')
                setScore(0)
                setCurrentQuestion(0)
                setSelectedAnswer(null)
              }}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-full font-semibold w-full sm:w-auto"
            >
              {t('games.playAgain')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold w-full sm:w-auto"
            >
              {t('games.close')}
            </motion.button>
          </div>
        </>
      )}
    </div>
  )
}

function MatchingGame({ gameState, setGameState, score, setScore, onClose }: any) {
  const { t } = useLanguage()
  const { playSuccess, playError, playStart, playComplete } = useGameSounds()
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
      playSuccess()
      setCardPositions({
        ...cardPositions,
        [id]: { x: 0, y: 0 }
      })
      setSelectedLeft(null)

      if (matched.length + 1 === pairs.length) {
        setTimeout(() => {
          playComplete()
          setGameState('finished')
        }, 500)
      }
    } else {
      playError()
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-balance">{t('games.matching.title')}</h2>
          <p className="text-gray-600 mb-6 text-base sm:text-lg text-balance">{t('games.matching.instructions')}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playStart()
              setGameState('playing')
            }}
            className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-3 rounded-full font-semibold w-full sm:w-auto"
          >
            {t('games.startGame')}
          </motion.button>
        </>
      )}

      {gameState === 'playing' && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <div className="relative">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800" aria-live="polite">{t('games.score')}: {score}</h3>
              <ScoreSparkle show={showSparkle} label={t('games.aria.sparkle')} />
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 self-end sm:self-auto">✕</button>
          </div>
          <p className="text-gray-600 mb-6 text-base sm:text-lg text-balance">{t('games.matching.instruction')}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              {pairs.map((pair) => (
                <motion.button
                  key={`left-${pair.id}`}
                  animate={{
                    x: cardPositions[pair.id]?.x || 0,
                    y: cardPositions[pair.id]?.y || 0,
                    scale: matched.includes(pair.id) ? 0.95 : selectedLeft === pair.id ? 1.05 : 1
                  }}
                  whileHover={{ scale: matched.includes(pair.id) ? 0.95 : 1.02 }}
                  whileTap={{ scale: matched.includes(pair.id) ? 0.95 : 0.98 }}
                  onClick={() => !matched.includes(pair.id) && handleLeftClick(pair.id)}
                  disabled={matched.includes(pair.id)}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`w-full p-4 rounded-xl font-medium transition-all text-left break-words ${
                    matched.includes(pair.id)
                      ? 'bg-green-500 text-white shadow-lg'
                      : selectedLeft === pair.id
                        ? 'bg-blue-500 text-white shadow-xl ring-4 ring-blue-300'
                        : 'bg-white hover:bg-blue-50 text-gray-800 border-2 border-transparent hover:border-blue-200'
                  }`}
                >
                  {pair.left}
                </motion.button>
              ))}
            </div>
            <div className="space-y-3">
              {pairs.sort(() => Math.random() - 0.5).map((pair) => (
                <motion.button
                  key={`right-${pair.id}-${pair.right}`}
                  animate={{
                    x: cardPositions[pair.id]?.x || 0,
                    y: cardPositions[pair.id]?.y || 0,
                    scale: matched.includes(pair.id) ? 0.95 : selectedLeft === pair.id ? 1.05 : 1
                  }}
                  whileHover={{ scale: matched.includes(pair.id) ? 0.95 : 1.02 }}
                  whileTap={{ scale: matched.includes(pair.id) ? 0.95 : 0.98 }}
                  onClick={() => !matched.includes(pair.id) && handleRightClick(pair.id)}
                  disabled={matched.includes(pair.id)}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`w-full p-4 rounded-xl font-medium transition-all text-left break-words ${
                    matched.includes(pair.id)
                      ? 'bg-green-500 text-white shadow-lg'
                      : selectedLeft === pair.id
                        ? 'bg-blue-500 text-white shadow-xl ring-4 ring-blue-300'
                        : 'bg-white hover:bg-blue-50 text-gray-800 border-2 border-transparent hover:border-blue-200'
                  }`}
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-balance">{t('games.matching.complete')}</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">{t('games.yourScore')}: {score}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setGameState('intro')
                setScore(0)
                setMatched([])
                setSelectedLeft(null)
                playStart()
              }}
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-3 rounded-full font-semibold w-full sm:w-auto"
            >
              {t('games.playAgain')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold w-full sm:w-auto"
            >
              {t('games.close')}
            </motion.button>
          </div>
        </>
      )}
    </div>
  )
}

function EmotionsGame({ gameState, setGameState, score, setScore, onClose }: any) {
  const { t } = useLanguage()
  const { playSuccess, playError, playStart, playComplete } = useGameSounds()
  const [currentEmotion, setCurrentEmotion] = useState(0)
  const [showSparkle, setShowSparkle] = useState(false)

  const emotions = [
    { emoji: '😊', name: t('games.emotions.emotion1') },
    { emoji: '😢', name: t('games.emotions.emotion2') },
    { emoji: '😡', name: t('games.emotions.emotion3') },
    { emoji: '😱', name: t('games.emotions.emotion4') },
  ]

  const handleEmotion = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 10)
      setShowSparkle(true)
      setTimeout(() => setShowSparkle(false), 800)
      playSuccess()
    } else {
      playError()
    }

    if (currentEmotion < emotions.length - 1) {
      setTimeout(() => setCurrentEmotion(currentEmotion + 1), 800)
    } else {
      setTimeout(() => {
        playComplete()
        setGameState('finished')
      }, 800)
    }
  }

  return (
    <div className="text-center">
      {gameState === 'intro' && (
        <>
          <Brain className="w-16 h-16 mx-auto mb-4 text-purple-500" />
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 text-balance">{t('games.emotions.title')}</h2>
          <p className="text-gray-600 mb-6 text-base sm:text-lg text-balance">{t('games.emotions.instructions')}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playStart()
              setGameState('playing')
            }}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold w-full sm:w-auto"
          >
            {t('games.startGame')}
          </motion.button>
        </>
      )}

      {gameState === 'playing' && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <div className="relative">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800" aria-live="polite">{t('games.score')}: {score}</h3>
              <ScoreSparkle show={showSparkle} label={t('games.aria.sparkle')} />
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 self-end sm:self-auto">✕</button>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-6 sm:p-8 text-center">
            <div className="text-6xl sm:text-8xl mb-6" role="img" aria-label={emotions[currentEmotion].name}>
              {emotions[currentEmotion].emoji}
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 text-balance">{t('games.emotions.prompt')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {emotions.map((emotion, index) => (
                <motion.button
                  key={emotion.name}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleEmotion(index === currentEmotion)}
                  disabled={index !== currentEmotion}
                  className={`p-4 rounded-2xl font-semibold border w-full text-center break-words ${
                    index === currentEmotion
                      ? 'bg-white text-purple-700 border-purple-200 shadow-lg'
                      : 'bg-white/70 text-gray-400 border-gray-100 cursor-not-allowed'
                  }`}
                >
                  <span className="text-xl mr-2" aria-hidden>{emotion.emoji}</span>
                  {emotion.name}
                </motion.button>
              ))}
            </div>
          </div>
        </>
      )}

      {gameState === 'finished' && (
        <>
          <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-balance">{t('games.emotions.complete')}</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">{t('games.yourScore')}: {score}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setGameState('intro')
                setScore(0)
                setCurrentEmotion(0)
                playStart()
              }}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold w-full sm:w-auto"
            >
              {t('games.playAgain')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold w-full sm:w-auto"
            >
              {t('games.close')}
            </motion.button>
          </div>
        </>
      )}
    </div>
  )
}
