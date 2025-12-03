'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Gamepad2, Trophy, Target, Puzzle, Brain, Heart, Sparkles } from 'lucide-react'
import Link from 'next/link'

type GameType = 'memory' | 'quiz' | 'matching' | 'emotions'

type GameItem = {
  id: string
  title: string
  icon: string
  tag: string
  href?: string
  action?: () => void
  aria?: string
}

function GameBubble({ item, accent, isRTL }: { item: GameItem; accent: string; isRTL: boolean }) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.05, rotate: isRTL ? -1 : 1 }}
      whileTap={{ scale: 0.97 }}
      className="group relative min-w-[180px] max-w-[220px] rounded-[26px] border border-white/60 bg-white/90 p-4 shadow-[0_14px_40px_-12px_rgba(15,23,42,0.35)] backdrop-blur"
    >
      <div className="absolute inset-0 rounded-[26px] bg-gradient-to-br from-white/40 to-white/5 opacity-80" aria-hidden />
      <div className="relative flex flex-col items-center gap-3 text-center">
        <div
          className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${accent} text-4xl text-white shadow-lg shadow-primary-500/30`}
          role="img"
          aria-label={item.aria || item.title}
        >
          <span className="drop-shadow-sm">{item.icon}</span>
          <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-white/80 shadow-sm" aria-hidden />
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold text-slate-900">{item.title}</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/5 px-3 py-1 text-[11px] font-semibold text-slate-700">
            <Sparkles className="h-3 w-3 text-amber-500" aria-hidden />
            {item.tag}
          </span>
        </div>
      </div>
    </motion.div>
  )

  if (item.href) {
    return (
      <Link href={item.href} className="snap-start focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200 rounded-[26px]">
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={item.action}
      className="snap-start focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200 rounded-[26px]"
    >
      {content}
    </button>
  )
}

function RailSection({
  rail,
  isRTL,
  swipeLabel,
}: {
  rail: { id: string; label: string; accent: string; glow: string; items: GameItem[] }
  isRTL: boolean
  swipeLabel: string
}) {
  return (
    <section
      key={rail.id}
      className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 px-4 py-6 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.45)] backdrop-blur"
    >
      <div className={`absolute -left-10 -top-10 h-36 w-36 rounded-full blur-3xl ${rail.glow}`} aria-hidden />
      <div className={`flex flex-wrap items-center justify-between gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span
            className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${rail.accent} text-white shadow-lg shadow-primary-500/30`}
          >
            <Gamepad2 className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{rail.label}</h2>
            <p className="text-sm text-slate-500">{rail.items.length} games</p>
          </div>
        </div>
        <span className="flex items-center gap-2 text-sm font-semibold text-primary-700">
          <span role="img" aria-label={rail.label}>
            {isRTL ? '⬅️' : '➡️'}
          </span>
          {rail.items.length > 2 ? swipeLabel : ''}
        </span>
      </div>

      <div className={`mt-4 flex gap-4 overflow-x-auto pb-4 ${isRTL ? 'flex-row-reverse' : ''} snap-x snap-mandatory`}>
        {rail.items.map((item) => (
          <GameBubble key={item.id} item={item} accent={rail.accent} isRTL={isRTL} />
        ))}
      </div>

      <div className="pointer-events-none absolute -bottom-12 right-4 h-24 w-24 rotate-12 rounded-full bg-white/60 blur-2xl" aria-hidden />
    </section>
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

export default function GamesPage() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar'
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null)

  const rails = useMemo(
    () => [
      {
        id: 'feelings',
        label: t('games.rails.feelings'),
        accent: 'from-pink-400 to-rose-500',
        glow: 'bg-pink-300/40',
        items: [
          {
            id: 'emoji-match',
            title: t('games.memory.title'),
            icon: '😊',
            tag: t('games.difficulty.easy'),
            action: () => setSelectedGame('memory' as GameType),
            aria: t('games.memory.aria'),
          },
          {
            id: 'feelings-game',
            title: t('games.emotions.title'),
            icon: '🎈',
            tag: t('games.difficulty.easy'),
            action: () => setSelectedGame('emotions' as GameType),
            aria: t('games.emotions.aria'),
          },
          {
            id: 'diary',
            title: t('games.entries.diary.title'),
            icon: '📔',
            tag: t('games.entries.diary.tag'),
            href: '/diary',
          },
        ],
      },
      {
        id: 'body',
        label: t('games.rails.body'),
        accent: 'from-blue-400 to-cyan-500',
        glow: 'bg-cyan-300/40',
        items: [
          {
            id: 'timeline',
            title: t('games.entries.timeline.title'),
            icon: '⏳',
            tag: t('games.entries.timeline.tag'),
            href: '/timeline',
          },
          {
            id: 'hygiene',
            title: t('games.entries.hygiene.title'),
            icon: '🧼',
            tag: t('games.entries.hygiene.tag'),
            href: '/hygiene',
          },
        ],
      },
      {
        id: 'confidence',
        label: t('games.rails.confidence'),
        accent: 'from-purple-400 to-indigo-500',
        glow: 'bg-indigo-300/40',
        items: [
          {
            id: 'superpowers',
            title: t('games.entries.superpower.title'),
            icon: '⭐',
            tag: t('games.entries.superpower.tag'),
            href: '/what-i-like-about-me',
          },
          {
            id: 'tiny-goals',
            title: t('games.entries.tinyGoals.title'),
            icon: '🎯',
            tag: t('games.entries.tinyGoals.tag'),
            href: '/confidence',
          },
          {
            id: 'kind-words',
            title: t('games.entries.kindWords.title'),
            icon: '💌',
            tag: t('games.entries.kindWords.tag'),
            href: '/diary',
          },
          {
            id: 'self-love',
            title: t('games.entries.selfLove.title'),
            icon: '🌟',
            tag: t('games.entries.selfLove.tag'),
            href: '/body-image-activities',
          },
        ],
      },
    ],
    [t, setSelectedGame]
  )

  const heroBadges = useMemo(
    () => [
      { icon: '🎨', label: t('games.hero.badges.fun') },
      { icon: '⭐', label: t('games.hero.badges.stars') },
      { icon: '↔️', label: t('games.hero.badges.swipe') },
    ],
    [t]
  )

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-primary-50/80 via-white to-sky-50"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 -top-12 h-48 bg-gradient-to-br from-primary-200/60 via-rose-200/40 to-sky-200/60 blur-3xl" aria-hidden />
        <div className="container mx-auto px-4 pt-12 pb-10 lg:pb-14">
          <div className={`grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center ${isRTL ? 'text-right' : ''}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-primary-700 shadow-sm">
                <Gamepad2 className="w-5 h-5" aria-hidden />
                <span>{t('games.tagline')}</span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-black text-slate-900 leading-tight"
              >
                {t('games.title')}
              </motion.h1>
              <p className="text-lg text-slate-700">{t('games.subtitle')}</p>

              <div className={`flex flex-wrap gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {heroBadges.map((badge) => (
                  <span
                    key={badge.label}
                    className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-md shadow-primary-500/15"
                  >
                    <span role="img" aria-label={badge.label}>
                      {badge.icon}
                    </span>
                    {badge.label}
                  </span>
                ))}
              </div>

              <div className={`flex flex-wrap gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Link
                  href="#rails"
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary-500 to-rose-500 px-5 py-3 text-white text-lg font-semibold shadow-lg shadow-primary-500/30 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200"
                >
                  🎉 {t('games.startGame')}
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedGame('memory')}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-3 text-slate-800 font-semibold shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200"
                >
                  😊 {t('games.memory.title')}
                </button>
              </div>
            </div>

            <div className={`relative ${isRTL ? 'lg:order-first' : ''}`} aria-hidden>
              <div className="absolute -left-6 top-4 h-28 w-28 rounded-full bg-primary-300/30 blur-2xl" />
              <div className="absolute -right-6 bottom-6 h-24 w-24 rounded-full bg-rose-300/30 blur-2xl" />
              <div className="relative mx-auto max-w-[420px] rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.45)] backdrop-blur">
                <div className="grid grid-cols-2 gap-3 text-center">
                  {[t('games.tips.tap'), t('games.tips.drag'), t('games.tips.stars'), t('games.hero.badges.rtlReady')].map((tip, idx) => (
                    <div
                      key={tip}
                      className="rounded-2xl bg-gradient-to-br from-slate-50 to-white p-3 shadow-inner shadow-white/60 border border-white/80"
                    >
                      <p className="text-2xl" aria-label={tip}>
                        {['🎮', '↔️', '⭐', '🌍'][idx]}
                      </p>
                      <p className="text-sm font-semibold text-slate-800">{tip}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-gradient-to-r from-primary-100/80 via-white to-rose-100/70 p-3 text-left">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">{t('games.hero.badges.quick')}</p>
                    <p className="text-lg font-bold text-slate-900">{t('games.hero.badges.pick')}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500" aria-label={t('games.aria.progressStars')}>
                    {[...Array(4)].map((_, i) => (
                      <Sparkles key={i} className="h-5 w-5" aria-hidden />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="rails" className="container mx-auto px-4 pb-16 space-y-8">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-primary-700">{t('games.tagline')}</p>
            <h2 className="text-2xl font-bold text-slate-900">{t('games.hero.badges.pick')}</h2>
          </div>
          <div className="hidden md:flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            <span role="img" aria-label={t('games.aria.tip')}>
              {isRTL ? '⬅️' : '➡️'}
            </span>
            {t('games.swipe')}
          </div>
        </div>

        <div className="space-y-6">
          {rails.map((rail) => (
            <RailSection key={rail.id} rail={rail} isRTL={isRTL} swipeLabel={t('games.swipe')} />
          ))}
        </div>
      </section>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGame(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-effect rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <GameContent gameType={selectedGame} onClose={() => setSelectedGame(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function GameContent({ gameType, onClose }: { gameType: GameType; onClose: () => void }) {
  const { t } = useLanguage()
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'finished'>('intro')
  const [score, setScore] = useState(0)

  if (gameType === 'memory') {
    return <MemoryGame gameState={gameState} setGameState={setGameState} score={score} setScore={setScore} onClose={onClose} />
  } else if (gameType === 'quiz') {
    return <QuizGame gameState={gameState} setGameState={setGameState} score={score} setScore={setScore} onClose={onClose} />
  } else if (gameType === 'matching') {
    return <MatchingGame gameState={gameState} setGameState={setGameState} score={score} setScore={setScore} onClose={onClose} />
  } else if (gameType === 'emotions') {
    return <EmotionsGame gameState={gameState} setGameState={setGameState} score={score} setScore={setScore} onClose={onClose} />
  }
  return null
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
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold"
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold"
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
    // Animate card movement
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
      // Animate matched cards moving together
      setCardPositions({
        ...cardPositions,
        [id]: { x: 0, y: 0 }
      })
      setSelectedLeft(null)
      
      if (matched.length + 1 === pairs.length) {
        setTimeout(() => setGameState('finished'), 500)
      }
    } else {
      // Wrong match - shake animation
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
            <div className="relative">
              <h3 className="text-xl font-bold text-gray-800" aria-live="polite">{t('games.score')}: {score}</h3>
              <ScoreSparkle show={showSparkle} label={t('games.aria.sparkle')} />
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>
          <p className="text-gray-600 mb-6">{t('games.matching.instruction')}</p>
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
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-full p-4 rounded-xl font-medium transition-all ${
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
                  key={`right-${pair.id}`}
                  animate={{
                    x: cardPositions[pair.id]?.x || 0,
                    y: cardPositions[pair.id]?.y || 0,
                    scale: matched.includes(pair.id) ? 0.95 : 1
                  }}
                  whileHover={{ scale: matched.includes(pair.id) ? 0.95 : 1.02 }}
                  whileTap={{ scale: matched.includes(pair.id) ? 0.95 : 0.98 }}
                  onClick={() => !matched.includes(pair.id) && selectedLeft && handleRightClick(pair.id)}
                  disabled={matched.includes(pair.id)}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-full p-4 rounded-xl font-medium transition-all ${
                    matched.includes(pair.id)
                      ? 'bg-green-500 text-white shadow-lg'
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
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('games.congratulations')}</h2>
          <p className="text-xl text-gray-600 mb-6">{t('games.perfectScore')}</p>
          <div className="flex gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setGameState('playing')
                setScore(0)
                setSelectedLeft(null)
                setMatched([])
              }}
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-3 rounded-full font-semibold"
            >
              {t('games.playAgain')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold"
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
  const [currentScenario, setCurrentScenario] = useState(0)
  const [showSparkle, setShowSparkle] = useState(false)
  
  const scenarios = [
    {
      situation: t('games.emotions.scenario1.situation'),
      emotions: [
        { emoji: '😊', label: t('games.emotions.happy'), correct: false },
        { emoji: '😠', label: t('games.emotions.angry'), correct: true },
        { emoji: '😢', label: t('games.emotions.sad'), correct: false },
        { emoji: '😰', label: t('games.emotions.anxious'), correct: false }
      ]
    },
    {
      situation: t('games.emotions.scenario2.situation'),
      emotions: [
        { emoji: '😊', label: t('games.emotions.happy'), correct: true },
        { emoji: '😠', label: t('games.emotions.angry'), correct: false },
        { emoji: '😢', label: t('games.emotions.sad'), correct: false },
        { emoji: '🤗', label: t('games.emotions.proud'), correct: true }
      ]
    },
    {
      situation: t('games.emotions.scenario3.situation'),
      emotions: [
        { emoji: '😰', label: t('games.emotions.anxious'), correct: true },
        { emoji: '😊', label: t('games.emotions.happy'), correct: false },
        { emoji: '😠', label: t('games.emotions.angry'), correct: false },
        { emoji: '😢', label: t('games.emotions.sad'), correct: false }
      ]
    }
  ]

  const handleEmotionSelect = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 10)
      setShowSparkle(true)
      setTimeout(() => setShowSparkle(false), 800)
    }
    
    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1)
      } else {
        setGameState('finished')
      }
    }, 1500)
  }

  return (
    <div className="text-center">
      {gameState === 'intro' && (
        <>
          <Heart className="w-16 h-16 mx-auto mb-4 text-orange-500" aria-hidden />
          <h2 className="text-3xl font-bold mb-3 text-gray-800">{t('games.emotions.title')}</h2>
          <p className="text-gray-600 mb-6">{t('games.emotions.instructions')}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameState('playing')}
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold"
          >
            {t('games.startGame')}
          </motion.button>
        </>
      )}

      {gameState === 'playing' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              {t('games.scenario')} {currentScenario + 1}/{scenarios.length}
            </h3>
            <div className="relative">
              <h3 className="text-xl font-bold text-gray-800" aria-live="polite">{t('games.score')}: {score}</h3>
              <ScoreSparkle show={showSparkle} label={t('games.aria.sparkle')} />
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 mb-8">
            <p className="text-lg text-gray-800 leading-relaxed">{scenarios[currentScenario].situation}</p>
          </div>
          <p className="text-gray-600 mb-6">{t('games.emotions.howWouldYouFeel')}</p>
          <div className="grid grid-cols-2 gap-4">
            {scenarios[currentScenario].emotions.map((emotion, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                drag
                dragSnapToOrigin
                onClick={() => handleEmotionSelect(emotion.correct)}
                className="bg-white hover:bg-gray-50 p-6 rounded-2xl transition-all"
                aria-label={emotion.label}
              >
                <div className="text-6xl mb-3" role="img" aria-label={emotion.label}>{emotion.emoji}</div>
                <div className="font-semibold text-gray-800">{emotion.label}</div>
              </motion.button>
            ))}
          </div>
        </>
      )}

      {gameState === 'finished' && (
        <>
          <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{t('games.wellDone')}</h2>
          <p className="text-xl text-gray-600 mb-6">
            {t('games.yourScore')}: {score}/{scenarios.length * 10}
          </p>
          <div className="flex gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setGameState('playing')
                setCurrentScenario(0)
                setScore(0)
              }}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold"
            >
              {t('games.playAgain')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold"
            >
              {t('games.close')}
            </motion.button>
          </div>
        </>
      )}
    </div>
  )
}
