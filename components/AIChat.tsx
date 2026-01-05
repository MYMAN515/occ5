'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  X,
  Bot,
  Sparkles,
  BookOpen,
  Heart,
  Users,
  Shield,
  Lightbulb,
  HelpCircle,
  ChevronRight,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface QuickAnswer {
  id: string
  question: string
  answer: string
  icon: React.ReactNode
  color: string
}

export default function AIChat() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(max-width: 640px)')
    const handleChange = () => setIsMobile(media.matches)
    handleChange()
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  const aiChat = t<any>('aiChatWidget')

  const quickAnswerMeta = [
    { id: 'communication', icon: <MessageCircle className="w-6 h-6" />, color: 'from-blue-400 to-cyan-500' },
    { id: 'emotions', icon: <Heart className="w-6 h-6" />, color: 'from-pink-400 to-rose-500' },
    { id: 'physical', icon: <Users className="w-6 h-6" />, color: 'from-purple-400 to-indigo-500' },
    { id: 'hygiene', icon: <Shield className="w-6 h-6" />, color: 'from-green-400 to-emerald-500' },
    { id: 'confidence', icon: <Lightbulb className="w-6 h-6" />, color: 'from-yellow-400 to-orange-500' },
    { id: 'support', icon: <HelpCircle className="w-6 h-6" />, color: 'from-indigo-400 to-purple-500' }
  ]

  const quickAnswers: QuickAnswer[] = quickAnswerMeta
    .map(meta => ({
      ...meta,
      question: aiChat?.quickAnswers?.[meta.id]?.question || '',
      answer: aiChat?.quickAnswers?.[meta.id]?.answer || ''
    }))
    .filter(answer => answer.question)

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId)
  }

  const handleBack = () => {
    setSelectedTopic(null)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center`}
      >
        <MessageCircle className="w-6 h-6" />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={`fixed z-50 glass-effect shadow-2xl flex flex-col overflow-hidden rounded-3xl ${
              isMobile
                ? 'left-4 right-4 bottom-4 h-[85vh] max-h-[90vh]'
                : 'bottom-6 right-6 w-full max-w-md h-[600px]'
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 sm:py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-2">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg">{aiChat?.header?.title}</h3>
                      <p className="text-[11px] sm:text-xs opacity-90">{aiChat?.header?.subtitle}</p>
                    </div>
                  </div>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setSelectedTopic(null)
                }}
                className="hover:bg-white/20 rounded-full p-2 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white/40">
              {!selectedTopic ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{aiChat?.intro?.title}</h4>
                    <p className="text-sm text-gray-600">{aiChat?.intro?.description}</p>
                  </div>

                  {quickAnswers.map((answer, index) => (
                    <motion.button
                      key={answer.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTopicClick(answer.id)}
                      className="w-full text-left glass-effect rounded-2xl p-4 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`bg-gradient-to-r ${answer.color} w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                          {answer.icon}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                            {answer.question}
                          </h5>
                          <p className="text-xs text-gray-500">{aiChat?.seeAnswer}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  {(() => {
                    const topic = quickAnswers.find(a => a.id === selectedTopic)
                    if (!topic) return null

                    return (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleBack}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4"
                        >
                          ← {aiChat?.back}
                        </motion.button>

                        <div className={`bg-gradient-to-r ${topic.color} rounded-2xl p-6 text-white mb-4`}>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-white/20 rounded-xl p-3">
                              {topic.icon}
                            </div>
                            <h4 className="text-xl font-bold">{topic.question}</h4>
                          </div>
                        </div>

                        <div className="glass-effect rounded-2xl p-6">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {topic.answer}
                          </p>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                          <p className="text-sm text-blue-800">
                            <strong>💡 {aiChat?.tipLabel}</strong> {aiChat?.tip}
                          </p>
                        </div>
                      </>
                    )
                  })()}
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-white/60 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                {aiChat?.footer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
