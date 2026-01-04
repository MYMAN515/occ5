'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Users, Info, ChevronRight, Heart, Brain, Sparkles, Smile, Cloud, Zap, Play, BookOpen, Video, CheckCircle, XCircle } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

type Gender = 'general' | 'female' | 'male'
type TabType = 'physical' | 'emotional' | 'body-guide' | 'comics' | 'video'

type SimpleChange = {
  title: string
  description: string
  color: string
}

type DetailedChange = {
  id: string
  title: string
  description: string
  details: string
  tips: string[]
  image?: string
  imageUrl?: string
  emoji: string
}

type ComicPanel = {
  text: string
  emoji: string
}

type Comic = {
  id: number
  title: string
  panels: ComicPanel[]
  lesson: string
}

type QuizQuestion = {
  question: string
  options: string[]
  correct: string
}

type VideoItem = {
  title: string
  description: string
  videoId: string
  source: string
  duration: string
}

type MoreLink = {
  title: string
  link: string
}

type BodyGuideContent = {
  header: { title: string; subtitle: string }
  tabs: Record<TabType, string>
  genderTabs: { general: string; female: string; male: string }
  physicalChanges: SimpleChange[]
  emotionalChanges: SimpleChange[]
  generalChanges: DetailedChange[]
  femaleChanges: DetailedChange[]
  maleChanges: DetailedChange[]
  comics: Comic[]
  quiz: {
    title: string
    start: string
    submit: string
    tryAgain: string
    scoreMessage: string
    perfect: string
    great: string
    questions: QuizQuestion[]
  }
  videoSection: {
    title: string
    subtitle: string
    videos: VideoItem[]
    moreTitle: string
    moreLinks: MoreLink[]
  }
  remember: { title: string; points: { title: string; text: string }[] }
  helpfulTips: string
  lessonLabel: string
  illustrationFallback: string
}

export default function BodyGuidePage() {
  const { t } = useLanguage()
  const content = t('bodyGuidePage') as BodyGuideContent

  const [selectedGender, setSelectedGender] = useState<Gender>('general')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('physical')
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const physicalChanges = content.physicalChanges.map((change, index) => ({
    ...change,
    icon:
      [
        <Sparkles className="w-6 h-6" />,
        <Heart className="w-6 h-6" />,
        <Zap className="w-6 h-6" />,
        <Sparkles className="w-6 h-6" />,
        <Heart className="w-6 h-6" />,
        <Zap className="w-6 h-6" />
      ][index] || <Info className="w-6 h-6" />
  }))

  const emotionalChanges = content.emotionalChanges.map((change, index) => ({
    ...change,
    icon:
      [
        <Brain className="w-6 h-6" />,
        <Smile className="w-6 h-6" />,
        <Cloud className="w-6 h-6" />,
        <Heart className="w-6 h-6" />,
        <Brain className="w-6 h-6" />,
        <Sparkles className="w-6 h-6" />
      ][index] || <Info className="w-6 h-6" />
  }))

  const generalChanges = content.generalChanges

  const femaleChanges = content.femaleChanges

  const maleChanges = content.maleChanges

  const comics = content.comics

  const quizQuestions = content.quiz.questions

  const quizScoreMessage = (correct: number, total: number) =>
    content.quiz.scoreMessage.replace('{correct}', String(correct)).replace('{total}', String(total))

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
  }

  const getQuizScore = () => {
    let correct = 0
    quizQuestions.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) {
        correct++
      }
    })
    return { correct, total: quizQuestions.length }
  }

  const currentChanges = selectedGender === 'female' 
    ? [...generalChanges, ...femaleChanges]
    : selectedGender === 'male'
    ? [...generalChanges, ...maleChanges]
    : generalChanges

  const activeChanges = activeTab === 'physical' ? physicalChanges : activeTab === 'emotional' ? emotionalChanges : []

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          {content.header.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">{content.header.subtitle}</p>
      </motion.div>

      {/* Tab Selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center mb-12 flex-wrap gap-2"
      >
        <div className="glass-effect rounded-full p-2 inline-flex gap-2 flex-wrap justify-center">
          <button
            onClick={() => { setActiveTab('physical'); setShowQuiz(false); setQuizSubmitted(false); setQuizAnswers({}) }}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'physical'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-blue-50'
            }`}
          >
            💪 {content.tabs.physical}
          </button>
          <button
            onClick={() => { setActiveTab('emotional'); setShowQuiz(false); setQuizSubmitted(false); setQuizAnswers({}) }}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'emotional'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            💭 {content.tabs.emotional}
          </button>
          <button
            onClick={() => { setActiveTab('body-guide'); setShowQuiz(false); setQuizSubmitted(false); setQuizAnswers({}) }}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'body-guide'
                ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            📖 {content.tabs['body-guide']}
          </button>
          <button
            onClick={() => { setActiveTab('comics'); setShowQuiz(false); setQuizSubmitted(false); setQuizAnswers({}) }}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'comics'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            📚 {content.tabs.comics}
          </button>
          <button
            onClick={() => { setActiveTab('video'); setShowQuiz(false); setQuizSubmitted(false); setQuizAnswers({}) }}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'video'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-blue-50'
            }`}
          >
            🎥 {content.tabs.video}
          </button>
        </div>
      </motion.div>

      {/* Content based on active tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'physical' || activeTab === 'emotional' ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {activeChanges.map((change, index) => (
                <motion.div
                  key={change.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-effect rounded-2xl p-6 card-hover"
                >
                  <div className={`bg-gradient-to-r ${change.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-white`}>
                    {change.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{change.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{change.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : activeTab === 'body-guide' ? (
          <motion.div
            key="body-guide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Gender Selector */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-8 max-w-3xl mx-auto"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedGender('general')}
                className={`flex-1 p-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 ${
                  selectedGender === 'general'
                    ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg'
                    : 'glass-effect text-gray-700 hover:border-2 hover:border-green-300'
                }`}
              >
                <Users className="w-5 h-5" />
                {content.genderTabs.general}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedGender('female')}
                className={`flex-1 p-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 ${
                  selectedGender === 'female'
                    ? 'bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-lg'
                    : 'glass-effect text-gray-700 hover:border-2 hover:border-pink-300'
                }`}
              >
                <User className="w-5 h-5" />
                {content.genderTabs.female}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedGender('male')}
                className={`flex-1 p-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 ${
                  selectedGender === 'male'
                    ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg'
                    : 'glass-effect text-gray-700 hover:border-2 hover:border-blue-300'
                }`}
              >
                <User className="w-5 h-5" />
                {content.genderTabs.male}
              </motion.button>
            </motion.div>

            {/* Body Guide Changes */}
            <div className="max-w-4xl mx-auto space-y-4">
              {currentChanges.map((change, index) => (
                <motion.div
                  key={change.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedSection(expandedSection === change.id ? null : change.id)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-white/50 transition-all"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{change.title}</h3>
                      <p className="text-gray-600">{change.description}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedSection === change.id ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="w-6 h-6 text-gray-400" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedSection === change.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200"
                      >
                        <div className="p-6 bg-white/30">
                          {((change as any).image || (change as any).imageUrl) && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="mb-4 rounded-xl overflow-hidden shadow-lg"
                            >
                              <div className="w-full h-64 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center relative">
                                <img
                                  src={(change as any).imageUrl || `https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop&q=80`}
                                  alt={change.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const parent = target.parentElement;
                                    if (parent) {
                                      parent.innerHTML = `
                                        <div class="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
                                          <div class="text-6xl mb-4">${(change as any).emoji || '📷'}</div>
                                          <p class="text-gray-600 font-medium text-lg">${change.title}</p>
                                          <p class="text-sm text-gray-500 mt-2">${content.illustrationFallback}</p>
                                        </div>
                                      `;
                                    }
                                  }}
                                />
                                {(change as any).emoji && (
                                  <div className="absolute top-4 right-4 bg-white/90 rounded-full p-3 text-2xl shadow-lg">
                                    {(change as any).emoji}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                          <div className="flex gap-3 mb-4">
                            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                            <p className="text-gray-700 leading-relaxed">{change.details}</p>
                          </div>
                          {(change as any).tips && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                {content.helpfulTips}
                              </h4>
                              <ul className="space-y-2">
                                {(change as any).tips.map((tip: string, idx: number) => (
                                  <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex gap-3 text-gray-700"
                                  >
                                    <span className="text-blue-500 font-bold flex-shrink-0">•</span>
                                    <span className="leading-relaxed">{tip}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : activeTab === 'comics' ? (
          <motion.div
            key="comics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 mb-12"
          >
            {comics.map((comic, comicIndex) => (
              <motion.div
                key={comic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: comicIndex * 0.2 }}
                className="glass-effect rounded-3xl p-6 md:p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">{comic.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {comic.panels.map((panel, panelIndex) => (
                    <motion.div
                      key={panelIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: comicIndex * 0.2 + panelIndex * 0.1 }}
                      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 text-center"
                    >
                      <div className="text-5xl mb-4">{panel.emoji}</div>
                      <p className="text-gray-700 font-medium">{panel.text}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-gray-700 font-semibold">💡 {content.lessonLabel}: {comic.lesson}</p>
                </div>
              </motion.div>
            ))}

            {/* Quiz Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-effect rounded-3xl p-6 md:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                  {content.quiz.title}
                </h3>
                {!showQuiz && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowQuiz(true)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold"
                  >
                    {content.quiz.start}
                  </motion.button>
                )}
              </div>

              {showQuiz && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-6"
                >
                  {quizQuestions.map((q, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6">
                      <h4 className="font-bold text-lg mb-4 text-gray-800">{index + 1}. {q.question}</h4>
                      <div className="space-y-3">
                        {q.options.map((option) => (
                          <motion.button
                            key={option}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              if (!quizSubmitted) {
                                setQuizAnswers({ ...quizAnswers, [index]: option })
                              }
                            }}
                            className={`w-full text-left p-4 rounded-xl transition-all ${
                              quizAnswers[index] === option
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                            } ${
                              quizSubmitted && option === q.correct
                                ? 'ring-2 ring-green-500'
                                : ''
                            } ${
                              quizSubmitted && quizAnswers[index] === option && option !== q.correct
                                ? 'bg-red-100 text-red-700'
                                : ''
                            }`}
                            disabled={quizSubmitted}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              {quizSubmitted && option === q.correct && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              )}
                              {quizSubmitted && quizAnswers[index] === option && option !== q.correct && (
                                <XCircle className="w-5 h-5 text-red-600" />
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {!quizSubmitted ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                    className={`w-full py-4 rounded-xl font-semibold text-lg ${
                      Object.keys(quizAnswers).length === quizQuestions.length
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {content.quiz.submit}
                  </motion.button>
                ) : (
                  <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 text-center"
                    >
                      <div className="text-4xl mb-4">🎉</div>
                      <h4 className="text-2xl font-bold mb-2 text-gray-800">
                        {quizScoreMessage(getQuizScore().correct, getQuizScore().total)}
                      </h4>
                      <p className="text-gray-600 mb-4">
                        {getQuizScore().correct === getQuizScore().total
                          ? content.quiz.perfect
                          : content.quiz.great}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setShowQuiz(false)
                          setQuizSubmitted(false)
                          setQuizAnswers({})
                        }}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold"
                      >
                        {content.quiz.tryAgain}
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ) : activeTab === 'video' ? (
          <motion.div
            key="video"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 mb-12"
          >
            <div className="glass-effect rounded-3xl p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-3">
                <Video className="w-8 h-8 text-blue-600" />
                {content.videoSection.title}
              </h3>
              <p className="text-center text-gray-600 mb-8">{content.videoSection.subtitle}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.videoSection.videos.map((video, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 overflow-hidden"
                  >
                    <div className="relative rounded-xl overflow-hidden mb-4 bg-gray-900 aspect-video">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${video.videoId}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800">{video.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{video.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{video.source}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{video.duration}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 glass-effect rounded-xl p-6 bg-gradient-to-br from-blue-50 to-purple-50"
              >
                <h4 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-600" />
                  {content.videoSection.moreTitle}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {content.videoSection.moreLinks.map((item, idx) => (
                    <motion.a
                      key={idx}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="block p-4 bg-white rounded-lg hover:shadow-md transition-all text-sm font-semibold text-blue-600"
                    >
                      {item.title} →
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-effect rounded-3xl p-8 md:p-10 max-w-4xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800">{content.remember.title}</h2>
        <div className="space-y-4 text-gray-700 text-lg">
          {content.remember.points.map((point, idx) => (
            <p key={idx}>
              <strong>{point.title}:</strong> {point.text}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
  