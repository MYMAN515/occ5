'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Brain, Sparkles, Smile, Play, BookOpen, Video } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

type ChangeItem = {
  title: string
  description: string
  icon: JSX.Element
  color: string
}

type ComicItem = {
  title: string
  panels: string[]
  lesson: string
  emojis: string[]
}

type VideoItem = {
  title: string
  description: string
  source: string
  duration: string
}

export default function ChangesPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'physical' | 'emotional' | 'comics' | 'video'>('physical')
  const changes = t<any>('developmentalChanges')

  const physicalChanges: ChangeItem[] = (changes.physical || []).map((item: any) => ({
    title: item.title,
    description: item.description,
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-blue-400 to-cyan-500'
  }))

  const emotionalChanges: ChangeItem[] = (changes.emotional || []).map((item: any) => ({
    title: item.title,
    description: item.description,
    icon: item.title.toLowerCase().includes('mood') ? (
      <Brain className="w-6 h-6" />
    ) : item.title.toLowerCase().includes('confidence') ? (
      <Sparkles className="w-6 h-6" />
    ) : (
      <Smile className="w-6 h-6" />
    ),
    color: 'from-purple-400 to-pink-500'
  }))

  const comicEmojis = [
    ['📏', '👕', '✨'],
    ['😊', '😢', '💙'],
    ['🤔', '😕', '🌈']
  ]

  const comics: ComicItem[] = (changes.comics || []).map((item: any, index: number) => ({
    title: item.title,
    panels: item.panels,
    lesson: item.lesson,
    emojis: comicEmojis[index] || ['💡', '💭', '🌟']
  }))

  const videos: VideoItem[] = changes.video?.items || []

  const activeChanges = activeTab === 'physical' ? physicalChanges : activeTab === 'emotional' ? emotionalChanges : []

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          {changes.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">{changes.subtitle}</p>
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
            onClick={() => setActiveTab('physical')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'physical'
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {changes.tabs?.physical}
          </button>
          <button
            onClick={() => setActiveTab('emotional')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'emotional'
                ? 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {changes.tabs?.emotional}
          </button>
          <button
            onClick={() => setActiveTab('comics')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'comics'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {changes.tabs?.comics}
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'video'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {changes.tabs?.video}
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
            {/* Changes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {activeChanges.map((change, index) => (
                <motion.div
                  key={change.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
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
                key={comic.title}
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
                      className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 text-center"
                    >
                      <div className="text-5xl mb-4">{comic.emojis[panelIndex] || '✨'}</div>
                      <p className="text-gray-700 font-medium">{panel}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-gray-700 font-semibold">💡 {comic.lesson}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-effect rounded-3xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-primary-600" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{changes.quiz?.title}</h3>
                  <p className="text-gray-600">{changes.quiz?.description}</p>
                </div>
              </div>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
              >
                {changes.quiz?.cta}
              </Link>
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
                <Video className="w-8 h-8 text-primary-600" />
                {changes.video?.title}
              </h3>
              <p className="text-center text-gray-600 mb-8">{changes.video?.subtitle}</p>

              {/* Video Placeholder Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video, index) => (
                  <motion.div
                    key={video.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 cursor-pointer"
                  >
                    <div className="bg-gray-200 rounded-xl h-48 mb-4 flex items-center justify-center relative overflow-hidden">
                      <Play className="w-16 h-16 text-primary-600 absolute" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
                        {video.duration}
                      </div>
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-gray-800">{video.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{video.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{video.source}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                      >
                        {changes.video?.button}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
                <p className="text-gray-700">{changes.video?.note}</p>
              </div>
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
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800">
          {changes.info?.title}
        </h2>
        <div className="space-y-4 text-gray-700 text-lg">
          {(changes.info?.points || []).map((point: any) => (
            <p key={point.label}>
              <strong>{point.label}:</strong> {point.text}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
