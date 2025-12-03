'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Heart, Brain, Sparkles, Smile, Cloud, Zap, Play, BookOpen, Video } from 'lucide-react'

export default function ChangesPage() {
  const [activeTab, setActiveTab] = useState<'physical' | 'emotional' | 'comics' | 'video'>('physical')

  const physicalChanges = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Growth Spurts",
      description: "You'll grow taller! This happens at different times for everyone.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Body Shape Changes",
      description: "Your body will develop new curves and proportions as you mature.",
      color: "from-pink-400 to-rose-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Voice Changes",
      description: "Your voice may deepen or change in pitch - this is totally normal!",
      color: "from-purple-400 to-indigo-500"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Skin Changes",
      description: "You might get acne or oily skin. Good hygiene helps manage this.",
      color: "from-amber-400 to-orange-500"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Hair Growth",
      description: "New hair will grow in different places on your body.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Body Odor",
      description: "You'll start to sweat more. Using deodorant becomes important!",
      color: "from-teal-400 to-cyan-500"
    }
  ]

  const emotionalChanges = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Mood Swings",
      description: "Your emotions might feel like a rollercoaster - that's normal!",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Smile className="w-6 h-6" />,
      title: "New Interests",
      description: "You might develop new hobbies, interests, and passions.",
      color: "from-yellow-400 to-amber-500"
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Independence",
      description: "You'll want more privacy and independence from family.",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Relationships",
      description: "Friendships and social connections become more important.",
      color: "from-rose-400 to-pink-500"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Self-Awareness",
      description: "You'll think more about who you are and who you want to be.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Confidence",
      description: "Building confidence takes time - be patient with yourself!",
      color: "from-orange-400 to-red-500"
    }
  ]

  const comics = [
    {
      id: 1,
      title: "The Growth Spurt",
      panels: [
        { text: "I noticed I'm getting taller!", emoji: "📏" },
        { text: "My clothes don't fit anymore...", emoji: "👕" },
        { text: "That's totally normal during puberty!", emoji: "✨" }
      ],
      lesson: "Growth spurts are a natural part of growing up!"
    },
    {
      id: 2,
      title: "Mood Swings",
      panels: [
        { text: "I feel happy one moment...", emoji: "😊" },
        { text: "Then sad the next...", emoji: "😢" },
        { text: "Remember: emotions are normal!", emoji: "💙" }
      ],
      lesson: "Mood swings are common during puberty due to hormonal changes."
    },
    {
      id: 3,
      title: "Body Changes",
      panels: [
        { text: "My body is changing...", emoji: "🤔" },
        { text: "I feel different from my friends", emoji: "😕" },
        { text: "Everyone changes at their own pace!", emoji: "🌈" }
      ],
      lesson: "Everyone's body changes at different times - that's okay!"
    }
  ]

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
          Understanding Changes
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Puberty brings many changes to your body and mind. Let's explore them together! 🌟
        </p>
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
            💪 Physical
          </button>
          <button
            onClick={() => setActiveTab('emotional')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'emotional'
                ? 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            💭 Emotional
          </button>
          <button
            onClick={() => setActiveTab('comics')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'comics'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📚 Comics
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'video'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🎥 Video
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
                      className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 text-center"
                    >
                      <div className="text-5xl mb-4">{panel.emoji}</div>
                      <p className="text-gray-700 font-medium">{panel.text}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-gray-700 font-semibold">💡 Lesson: {comic.lesson}</p>
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
                  <h3 className="text-2xl font-bold text-gray-800">Quiz Time Moved!</h3>
                  <p className="text-gray-600">Find the silly, colorful quiz adventure on the new Quiz page.</p>
                </div>
              </div>
              <Link
                href="/quizzes"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
              >
                Jump to Quiz Page ➜
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
                Educational Videos & Animations
              </h3>
              <p className="text-center text-gray-600 mb-8">
                Watch helpful videos about puberty changes from trusted sources
              </p>

              {/* Video Placeholder Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Understanding Puberty",
                    description: "A comprehensive guide to physical and emotional changes",
                    source: "Official Health Website",
                    duration: "5 min"
                  },
                  {
                    title: "Emotional Changes Explained",
                    description: "Learn about mood swings and emotional development",
                    source: "Educational Channel",
                    duration: "4 min"
                  },
                  {
                    title: "Body Changes Animation",
                    description: "Animated guide to physical development",
                    source: "Health Organization",
                    duration: "6 min"
                  },
                  {
                    title: "Building Confidence",
                    description: "Tips for self-acceptance during puberty",
                    source: "Youth Support",
                    duration: "3 min"
                  }
                ].map((video, index) => (
                  <motion.div
                    key={index}
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
                        Watch
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
                <p className="text-gray-700">
                  <strong>Note:</strong> These videos are placeholders. In the actual app, you would embed videos from official health websites or educational channels.
                </p>
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
          Remember: Everyone is Different 🌈
        </h2>
        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            <strong>Timing:</strong> Puberty can start anywhere from ages 8-14. There's no "right" time!
          </p>
          <p>
            <strong>Pace:</strong> Some changes happen quickly, others take years. Your journey is unique.
          </p>
          <p>
            <strong>Support:</strong> Talk to trusted adults if you have questions or concerns. They're here to help!
          </p>
        </div>
      </motion.div>
    </div>
  )
}
