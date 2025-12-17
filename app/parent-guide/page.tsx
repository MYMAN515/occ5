'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  AlertCircle,
  BookOpen,
  Check,
  CheckCircle,
  ChevronDown,
  Droplets,
  Heart,
  Lightbulb,
  MessageCircle,
  Moon,
  Phone,
  Shield,
  Sparkles,
  Target,
  Trophy,
  Users
} from 'lucide-react'

type GuideCategory = 'communication' | 'emotional' | 'physical' | 'social' | 'privacy' | 'resources' | 'hygiene'
type ViewMode = 'parent-guide' | 'child-tips'
type GuideSection = { id: string; title: string; description: string; tips: string[] }
type ChildTipCard = { id: string; title: string; description: string; tips: string[] }
type ChildTipsContent = {
  categories: Record<string, string>
  cards: Record<string, ChildTipCard[]>
  helpfulTipsLabel?: string
  emergency?: {
    title: string
    description: string
    points: string[]
  }
}

export default function ParentGuidePage() {
  const { t } = useLanguage()
  const header = t('parentGuide.header') as {
    title: string
    subtitle: string
    parentTab: string
    childTab: string
    periodImageLabel: string
    periodImagePath: string
  }
  const extraSections = t('parentGuide.extraSections') as Partial<Record<GuideCategory, GuideSection[]>>
  const childTipsContent = t('parentGuide.childTips') as ChildTipsContent

  const [activeCategory, setActiveCategory] = useState<GuideCategory>('communication')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('parent-guide')
  const [expandedTip, setExpandedTip] = useState<string | null>(null)

  useEffect(() => {
    if (viewMode === 'parent-guide' && activeCategory === 'hygiene') {
      setActiveCategory('communication')
    }
    if (viewMode === 'child-tips' && !['physical', 'emotional', 'social', 'hygiene'].includes(activeCategory)) {
      setActiveCategory('physical')
    }
  }, [viewMode, activeCategory])

  const categories = [
    { id: 'communication' as GuideCategory, icon: <MessageCircle className="w-6 h-6" />, color: 'from-blue-400 to-cyan-500' },
    { id: 'emotional' as GuideCategory, icon: <Heart className="w-6 h-6" />, color: 'from-pink-400 to-rose-500' },
    { id: 'physical' as GuideCategory, icon: <Target className="w-6 h-6" />, color: 'from-purple-400 to-indigo-500' },
    { id: 'social' as GuideCategory, icon: <Users className="w-6 h-6" />, color: 'from-green-400 to-emerald-500' },
    { id: 'privacy' as GuideCategory, icon: <Shield className="w-6 h-6" />, color: 'from-amber-400 to-orange-500' },
    { id: 'resources' as GuideCategory, icon: <BookOpen className="w-6 h-6" />, color: 'from-indigo-400 to-purple-500' }
  ]

  const guideContent = useMemo<Record<GuideCategory, GuideSection[]>>(
    () => ({
      communication: [
        {
          id: 'start-early',
          title: t('parentGuide.communication.startEarly.title'),
          description: t('parentGuide.communication.startEarly.description'),
          tips: [
            t('parentGuide.communication.startEarly.tip1'),
            t('parentGuide.communication.startEarly.tip2'),
            t('parentGuide.communication.startEarly.tip3'),
            t('parentGuide.communication.startEarly.tip4')
          ]
        },
        {
          id: 'active-listening',
          title: t('parentGuide.communication.listening.title'),
          description: t('parentGuide.communication.listening.description'),
          tips: [
            t('parentGuide.communication.listening.tip1'),
            t('parentGuide.communication.listening.tip2'),
            t('parentGuide.communication.listening.tip3'),
            t('parentGuide.communication.listening.tip4')
          ]
        },
        {
          id: 'openness',
          title: t('parentGuide.communication.openness.title'),
          description: t('parentGuide.communication.openness.description'),
          tips: [
            t('parentGuide.communication.openness.tip1'),
            t('parentGuide.communication.openness.tip2'),
            t('parentGuide.communication.openness.tip3'),
            t('parentGuide.communication.openness.tip4')
          ]
        },
        ...(extraSections?.communication || [])
      ],
      emotional: [
        {
          id: 'mood-swings',
          title: t('parentGuide.emotional.moodSwings.title'),
          description: t('parentGuide.emotional.moodSwings.description'),
          tips: [
            t('parentGuide.emotional.moodSwings.tip1'),
            t('parentGuide.emotional.moodSwings.tip2'),
            t('parentGuide.emotional.moodSwings.tip3'),
            t('parentGuide.emotional.moodSwings.tip4')
          ]
        },
        {
          id: 'building-confidence',
          title: t('parentGuide.emotional.confidence.title'),
          description: t('parentGuide.emotional.confidence.description'),
          tips: [
            t('parentGuide.emotional.confidence.tip1'),
            t('parentGuide.emotional.confidence.tip2'),
            t('parentGuide.emotional.confidence.tip3'),
            t('parentGuide.emotional.confidence.tip4')
          ]
        },
        {
          id: 'mental-health',
          title: t('parentGuide.emotional.mentalHealth.title'),
          description: t('parentGuide.emotional.mentalHealth.description'),
          tips: [
            t('parentGuide.emotional.mentalHealth.tip1'),
            t('parentGuide.emotional.mentalHealth.tip2'),
            t('parentGuide.emotional.mentalHealth.tip3'),
            t('parentGuide.emotional.mentalHealth.tip4')
          ]
        },
        ...(extraSections?.emotional || [])
      ],
      physical: [
        {
          id: 'body-changes',
          title: t('parentGuide.physical.bodyChanges.title'),
          description: t('parentGuide.physical.bodyChanges.description'),
          tips: [
            t('parentGuide.physical.bodyChanges.tip1'),
            t('parentGuide.physical.bodyChanges.tip2'),
            t('parentGuide.physical.bodyChanges.tip3'),
            t('parentGuide.physical.bodyChanges.tip4')
          ]
        },
        {
          id: 'hygiene',
          title: t('parentGuide.physical.hygiene.title'),
          description: t('parentGuide.physical.hygiene.description'),
          tips: [
            t('parentGuide.physical.hygiene.tip1'),
            t('parentGuide.physical.hygiene.tip2'),
            t('parentGuide.physical.hygiene.tip3'),
            t('parentGuide.physical.hygiene.tip4')
          ]
        },
        {
          id: 'health',
          title: t('parentGuide.physical.health.title'),
          description: t('parentGuide.physical.health.description'),
          tips: [
            t('parentGuide.physical.health.tip1'),
            t('parentGuide.physical.health.tip2'),
            t('parentGuide.physical.health.tip3'),
            t('parentGuide.physical.health.tip4')
          ]
        },
        ...(extraSections?.physical || [])
      ],
      social: [
        {
          id: 'friendships',
          title: t('parentGuide.social.friendships.title'),
          description: t('parentGuide.social.friendships.description'),
          tips: [
            t('parentGuide.social.friendships.tip1'),
            t('parentGuide.social.friendships.tip2'),
            t('parentGuide.social.friendships.tip3'),
            t('parentGuide.social.friendships.tip4')
          ]
        },
        {
          id: 'peer-pressure',
          title: t('parentGuide.social.peerPressure.title'),
          description: t('parentGuide.social.peerPressure.description'),
          tips: [
            t('parentGuide.social.peerPressure.tip1'),
            t('parentGuide.social.peerPressure.tip2'),
            t('parentGuide.social.peerPressure.tip3'),
            t('parentGuide.social.peerPressure.tip4')
          ]
        },
        {
          id: 'boundaries',
          title: t('parentGuide.social.boundaries.title'),
          description: t('parentGuide.social.boundaries.description'),
          tips: [
            t('parentGuide.social.boundaries.tip1'),
            t('parentGuide.social.boundaries.tip2'),
            t('parentGuide.social.boundaries.tip3'),
            t('parentGuide.social.boundaries.tip4')
          ]
        },
        ...(extraSections?.social || [])
      ],
      privacy: [
        {
          id: 'online-safety',
          title: t('parentGuide.privacy.onlineSafety.title'),
          description: t('parentGuide.privacy.onlineSafety.description'),
          tips: [
            t('parentGuide.privacy.onlineSafety.tip1'),
            t('parentGuide.privacy.onlineSafety.tip2'),
            t('parentGuide.privacy.onlineSafety.tip3'),
            t('parentGuide.privacy.onlineSafety.tip4')
          ]
        },
        {
          id: 'personal-space',
          title: t('parentGuide.privacy.personalSpace.title'),
          description: t('parentGuide.privacy.personalSpace.description'),
          tips: [
            t('parentGuide.privacy.personalSpace.tip1'),
            t('parentGuide.privacy.personalSpace.tip2'),
            t('parentGuide.privacy.personalSpace.tip3'),
            t('parentGuide.privacy.personalSpace.tip4')
          ]
        }
      ],
      resources: [
        {
          id: 'books',
          title: t('parentGuide.resources.books.title'),
          description: t('parentGuide.resources.books.description'),
          tips: [
            t('parentGuide.resources.books.tip1'),
            t('parentGuide.resources.books.tip2'),
            t('parentGuide.resources.books.tip3'),
            t('parentGuide.resources.books.tip4')
          ]
        },
        {
          id: 'professional',
          title: t('parentGuide.resources.professional.title'),
          description: t('parentGuide.resources.professional.description'),
          tips: [
            t('parentGuide.resources.professional.tip1'),
            t('parentGuide.resources.professional.tip2'),
            t('parentGuide.resources.professional.tip3'),
            t('parentGuide.resources.professional.tip4')
          ]
        }
      ],
      hygiene: extraSections?.hygiene || []
    }),
    [t, extraSections]
  )

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-4">
          <BookOpen className="w-16 h-16 text-blue-500" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
          {header?.title || t('parentGuide.title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">{header?.subtitle || t('parentGuide.subtitle')}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex justify-center mb-8">
        <div className="glass-effect rounded-full p-2 inline-flex gap-2">
          <button
            onClick={() => {
              setViewMode('parent-guide')
              setExpandedSection(null)
              setActiveCategory('communication')
            }}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              viewMode === 'parent-guide' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' : 'text-gray-600 hover:bg-blue-50'
            }`}
          >
            👨‍👩‍👧 {header?.parentTab || t('parentGuide.categories.communication')}
          </button>
          <button
            onClick={() => {
              setViewMode('child-tips')
              setExpandedTip(null)
              setActiveCategory('physical')
            }}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              viewMode === 'child-tips' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            💡 {header?.childTab || t('parentGuide.title')}
          </button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {viewMode === 'parent-guide' ? (
          <motion.div key="parent-guide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveCategory(category.id)
                    setExpandedSection(null)
                  }}
                  className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-full font-semibold transition-all ${
                    activeCategory === category.id ? `bg-gradient-to-r ${category.color} text-white shadow-lg` : 'glass-effect text-gray-700 hover:border-2 hover:border-blue-300'
                  }`}
                >
                  {category.icon}
                  <span className="hidden sm:inline">{t(`parentGuide.categories.${category.id}`)}</span>
                </motion.button>
              ))}
            </motion.div>

            <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-5xl mx-auto space-y-4">
              {guideContent[activeCategory].map((section, index) => (
                <motion.div key={section.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="glass-effect rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-white/50 transition-all"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{section.title}</h3>
                      <p className="text-gray-600">{section.description}</p>
                    </div>
                    <motion.div animate={{ rotate: expandedSection === section.id ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-gray-400 ml-4">
                      <ChevronDown className="w-6 h-6" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedSection === section.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="border-t border-gray-200">
                        <div className="p-6 bg-white/30">
                          {section.id === 'hygiene' && activeCategory === 'physical' && (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-6 rounded-xl overflow-hidden">
                              <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center">
                                <div className="text-center">
                                  <span className="text-blue-600 text-sm block mb-2">{header?.periodImageLabel}</span>
                                  <span className="text-gray-500 text-xs">{header?.periodImagePath}</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                          <ul className="space-y-4">
                            {section.tips.map((tip, idx) => (
                              <motion.li key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex gap-3 text-gray-700">
                                <div className={`bg-gradient-to-r ${categories.find((c) => c.id === activeCategory)?.color} w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                                <span className="leading-relaxed flex-1">{tip}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-16 max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">{t('parentGuide.keyPrinciples.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div whileHover={{ y: -5 }} className="glass-effect rounded-2xl p-6">
                  <div className="bg-gradient-to-r from-pink-400 to-rose-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{t('parentGuide.keyPrinciples.patience.title')}</h3>
                  <p className="text-gray-600 leading-relaxed">{t('parentGuide.keyPrinciples.patience.description')}</p>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="glass-effect rounded-2xl p-6">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{t('parentGuide.keyPrinciples.communication.title')}</h3>
                  <p className="text-gray-600 leading-relaxed">{t('parentGuide.keyPrinciples.communication.description')}</p>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="glass-effect rounded-2xl p-6">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{t('parentGuide.keyPrinciples.safety.title')}</h3>
                  <p className="text-gray-600 leading-relaxed">{t('parentGuide.keyPrinciples.safety.description')}</p>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="glass-effect rounded-2xl p-6">
                  <div className="bg-gradient-to-r from-purple-400 to-indigo-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{t('parentGuide.keyPrinciples.support.title')}</h3>
                  <p className="text-gray-600 leading-relaxed">{t('parentGuide.keyPrinciples.support.description')}</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-12 glass-effect rounded-3xl p-8 max-w-4xl mx-auto border-2 border-red-200">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-red-400 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-800">{t('parentGuide.emergency.title')}</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">{t('parentGuide.emergency.description')}</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{t('parentGuide.emergency.point1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{t('parentGuide.emergency.point2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{t('parentGuide.emergency.point3')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div key="child-tips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { id: 'physical' as const, icon: <Heart className="w-6 h-6" />, color: 'from-pink-400 to-rose-500', label: childTipsContent?.categories?.physical || 'Physical' },
                { id: 'emotional' as const, icon: <Sparkles className="w-6 h-6" />, color: 'from-purple-400 to-pink-500', label: childTipsContent?.categories?.emotional || 'Emotional' },
                { id: 'social' as const, icon: <Users className="w-6 h-6" />, color: 'from-blue-400 to-cyan-500', label: childTipsContent?.categories?.social || 'Social' },
                { id: 'hygiene' as const, icon: <Droplets className="w-6 h-6" />, color: 'from-green-400 to-teal-500', label: childTipsContent?.categories?.hygiene || 'Hygiene' }
              ].map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveCategory(category.id as GuideCategory)
                    setExpandedTip(null)
                  }}
                  className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-full font-semibold transition-all ${
                    activeCategory === category.id ? `bg-gradient-to-r ${category.color} text-white shadow-lg` : 'glass-effect text-gray-700 hover:border-2 hover:border-purple-300'
                  }`}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </motion.button>
              ))}
            </motion.div>

            <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="max-w-5xl mx-auto space-y-4">
              {(() => {
                const tips = (childTipsContent?.cards as Record<string, ChildTipCard[]> | undefined)?.[activeCategory] || []
                const tipCategory = [
                  { id: 'physical' as const, color: 'from-pink-400 to-rose-500' },
                  { id: 'emotional' as const, color: 'from-purple-400 to-pink-500' },
                  { id: 'social' as const, color: 'from-blue-400 to-cyan-500' },
                  { id: 'hygiene' as const, color: 'from-green-400 to-teal-500' }
                ].find((c) => c.id === activeCategory)
                const tipIcons: Record<string, JSX.Element> = {
                  exercise: <Heart className="w-6 h-6" />,
                  nutrition: <Sparkles className="w-6 h-6" />,
                  sleep: <Moon className="w-6 h-6" />,
                  pain: <AlertCircle className="w-6 h-6" />,
                  feelings: <Heart className="w-6 h-6" />,
                  stress: <Shield className="w-6 h-6" />,
                  confidence: <Heart className="w-6 h-6" />,
                  help: <Phone className="w-6 h-6" />,
                  friends: <Users className="w-6 h-6" />,
                  'peer-pressure': <Shield className="w-6 h-6" />,
                  communication: <MessageCircle className="w-6 h-6" />,
                  boundaries: <Shield className="w-6 h-6" />,
                  shower: <Droplets className="w-6 h-6" />,
                  deodorant: <Sparkles className="w-6 h-6" />,
                  skin: <Heart className="w-6 h-6" />,
                  period: <CheckCircle className="w-6 h-6" />
                }

                return tips.map((item, index) => (
                  <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="glass-effect rounded-2xl overflow-hidden">
                    <button onClick={() => setExpandedTip(expandedTip === item.id ? null : item.id)} className="w-full p-6 flex items-start gap-4 text-left hover:bg-white/50 transition-all">
                      <div className={`bg-gradient-to-r ${tipCategory?.color || 'from-blue-400 to-cyan-500'} w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0`}>{tipIcons[item.id] || <Lightbulb className="w-6 h-6" />}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                      <motion.div animate={{ rotate: expandedTip === item.id ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-gray-400">
                        <Lightbulb className="w-6 h-6" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedTip === item.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="border-t border-gray-200">
                          <div className="p-6 bg-white/30">
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              {childTipsContent?.helpfulTipsLabel || 'Helpful Tips:'}
                            </h4>
                            <ul className="space-y-3">
                              {item.tips.map((tip: string, idx: number) => (
                                <motion.li key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex gap-3 text-gray-700">
                                  <span className="text-blue-500 font-bold flex-shrink-0">•</span>
                                  <span className="leading-relaxed">{tip}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              })()}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-12 glass-effect rounded-3xl p-8 md:p-10 max-w-4xl mx-auto border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-red-400 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-800">{childTipsContent?.emergency?.title || 'Need Immediate Help? 🆘'}</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {childTipsContent?.emergency?.description || "If you're feeling very upset, scared, or need to talk to someone right away, don't wait:"}
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    {(childTipsContent?.emergency?.points || [
                      'Talk to a parent, guardian, or trusted adult immediately',
                      'Contact your school counselor or nurse',
                      "Call a helpline in your country (they're free and confidential)",
                      'Remember: Asking for help is a sign of strength, not weakness! 💪'
                    ]).map((point, idx) => (
                      <li key={point + idx} className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
