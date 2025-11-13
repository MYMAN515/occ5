'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Heart, Users, MessageCircle, BookOpen, Shield, 
  Lightbulb, Target, AlertCircle, Check, ChevronDown,
  Brain, Smile, Trophy, Lock, Sparkles, Droplets, Phone, CheckCircle
} from 'lucide-react'
import Image from 'next/image'

type GuideCategory = 'communication' | 'emotional' | 'physical' | 'social' | 'privacy' | 'resources'
type ViewMode = 'parent-guide' | 'child-tips'

// Moon icon component
const Moon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
)

export default function ParentGuidePage() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<GuideCategory>('communication')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('parent-guide')
  const [expandedTip, setExpandedTip] = useState<string | null>(null)

  const categories = [
    { id: 'communication' as GuideCategory, icon: <MessageCircle className="w-6 h-6" />, color: 'from-blue-400 to-cyan-500' },
    { id: 'emotional' as GuideCategory, icon: <Heart className="w-6 h-6" />, color: 'from-pink-400 to-rose-500' },
    { id: 'physical' as GuideCategory, icon: <Target className="w-6 h-6" />, color: 'from-purple-400 to-indigo-500' },
    { id: 'social' as GuideCategory, icon: <Users className="w-6 h-6" />, color: 'from-green-400 to-emerald-500' },
    { id: 'privacy' as GuideCategory, icon: <Shield className="w-6 h-6" />, color: 'from-amber-400 to-orange-500' },
    { id: 'resources' as GuideCategory, icon: <BookOpen className="w-6 h-6" />, color: 'from-indigo-400 to-purple-500' }
  ]

  const guideContent = {
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
      {
        id: 'difficult-conversations',
        title: 'Handling Difficult Conversations',
        description: 'When your child asks uncomfortable questions or brings up sensitive topics',
        tips: [
          'Stay calm and don\'t show shock or embarrassment - your reaction sets the tone',
          'It\'s okay to say "I need a moment to think" rather than giving a rushed answer',
          'Use age-appropriate language - be honest but don\'t overwhelm with details',
          'If you don\'t know something, say so and offer to find out together',
          'Create a safe space where no question is "silly" or "wrong"',
          'Follow up later to see if they have more questions'
        ]
      },
      {
        id: 'cultural-considerations',
        title: 'Cultural Sensitivity in Conversations',
        description: 'Respecting cultural and religious values while providing accurate information',
        tips: [
          'Acknowledge and respect your family\'s cultural and religious values',
          'Find ways to discuss puberty that align with your beliefs',
          'Use culturally appropriate examples and language',
          'Connect with community leaders or trusted advisors if needed',
          'Balance cultural values with scientific accuracy',
          'Remember: every family\'s approach is valid'
        ]
      }
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
      {
        id: 'handling-rejection',
        title: 'When Your Child Rejects Your Help',
        description: 'What to do when your child pushes you away or says they don\'t need help',
        tips: [
          'Don\'t take it personally - independence is a normal part of development',
          'Stay available without being pushy - let them know you\'re there when ready',
          'Respect their need for space while maintaining boundaries',
          'Find indirect ways to support (leave helpful resources, check in casually)',
          'Connect them with other trusted adults (aunt, teacher, counselor)',
          'Remember: pushing away is often a sign of struggling, not rejection of you'
        ]
      },
      {
        id: 'anxiety-stress',
        title: 'Supporting Anxious or Stressed Children',
        description: 'Helping your child manage anxiety and stress during puberty',
        tips: [
          'Recognize that puberty itself can be stressful - validate their feelings',
          'Teach simple coping strategies: deep breathing, counting, grounding techniques',
          'Help them identify triggers and create a plan for managing them',
          'Encourage healthy outlets: exercise, art, music, journaling',
          'Model healthy stress management in your own life',
          'Seek professional help if anxiety interferes with daily life'
        ]
      }
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
      {
        id: 'first-period',
        title: 'Preparing for Your Child\'s First Period',
        description: 'Practical guidance for when your daughter starts menstruating',
        tips: [
          'Have period supplies ready before it starts (pads, tampons, period underwear)',
          'Create a "period kit" for school with supplies and a change of clothes',
          'Normalize periods - talk about them as a natural, healthy process',
          'Teach them how to track their cycle and what to expect',
          'Discuss period pain management options (heat, gentle exercise, pain relief)',
          'Reassure them that irregular periods in the first year are completely normal'
        ]
      },
      {
        id: 'body-image',
        title: 'Supporting Positive Body Image',
        description: 'Helping your child develop a healthy relationship with their changing body',
        tips: [
          'Avoid negative comments about your own body or others\' bodies',
          'Focus on what bodies can DO, not just how they look',
          'Celebrate diversity - all body shapes and sizes are normal',
          'Limit exposure to unrealistic media images when possible',
          'Encourage activities that make them feel strong and capable',
          'Address body-shaming comments from others immediately'
        ]
      }
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
      {
        id: 'dating-relationships',
        title: 'Navigating First Relationships',
        description: 'Supporting your child through their first crushes and relationships',
        tips: [
          'Start conversations about healthy relationships early, before dating begins',
          'Discuss consent, respect, and boundaries in age-appropriate ways',
          'Set clear rules about dating that match your family values',
          'Keep communication open - ask about their friends and interests',
          'Help them recognize red flags in relationships',
          'Be a safe person they can talk to about relationship concerns'
        ]
      },
      {
        id: 'social-media',
        title: 'Social Media and Peer Influence',
        description: 'Helping your child navigate social media and online peer pressure',
        tips: [
          'Set clear rules about social media use and privacy settings',
          'Have regular conversations about what they see online',
          'Teach critical thinking about online content and influencers',
          'Monitor their online activity while respecting growing independence',
          'Discuss the difference between online personas and real life',
          'Create tech-free times and spaces for family connection'
        ]
      }
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
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block mb-4"
        >
          <BookOpen className="w-16 h-16 text-blue-500" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
          Parent Guide & Parenting Tips
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Expert advice for parents and helpful tips for your child
        </p>
      </motion.div>

      {/* View Mode Toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center mb-8"
      >
        <div className="glass-effect rounded-full p-2 inline-flex gap-2">
          <button
            onClick={() => { setViewMode('parent-guide'); setExpandedSection(null) }}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              viewMode === 'parent-guide'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-blue-50'
            }`}
          >
            👨‍👩‍👧 Parent Guide
          </button>
          <button
            onClick={() => { setViewMode('child-tips'); setExpandedTip(null) }}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              viewMode === 'child-tips'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            💡 Parenting Tips
          </button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {viewMode === 'parent-guide' ? (
          <motion.div
            key="parent-guide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Category Tabs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
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
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'glass-effect text-gray-700 hover:border-2 hover:border-blue-300'
                  }`}
                >
                  {category.icon}
                  <span className="hidden sm:inline">{t(`parentGuide.categories.${category.id}`)}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Content */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto space-y-4"
            >
        {guideContent[activeCategory].map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              className="w-full p-6 flex items-center justify-between text-left hover:bg-white/50 transition-all"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{section.title}</h3>
                <p className="text-gray-600">{section.description}</p>
              </div>
              <motion.div
                animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-400 ml-4"
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200"
                >
                  <div className="p-6 bg-white/30">
                    {section.id === 'hygiene' && activeCategory === 'physical' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 rounded-xl overflow-hidden"
                      >
                        <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center">
                          <div className="text-center">
                            <span className="text-blue-600 text-sm block mb-2">📷 Period Care Image</span>
                            <span className="text-gray-500 text-xs">/images/period-care-guide.jpg</span>
                            {/* Replace with: <Image src="/images/period-care-guide.jpg" alt="Period Care Guide" width={600} height={400} className="w-full h-auto rounded-xl" /> */}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <ul className="space-y-4">
                      {section.tips.map((tip, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex gap-3 text-gray-700"
                        >
                          <div className={`bg-gradient-to-r ${categories.find(c => c.id === activeCategory)?.color} w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
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

      {/* Key Principles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          {t('parentGuide.keyPrinciples.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="bg-gradient-to-r from-pink-400 to-rose-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              {t('parentGuide.keyPrinciples.patience.title')}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t('parentGuide.keyPrinciples.patience.description')}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="bg-gradient-to-r from-blue-400 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              {t('parentGuide.keyPrinciples.communication.title')}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t('parentGuide.keyPrinciples.communication.description')}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              {t('parentGuide.keyPrinciples.safety.title')}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t('parentGuide.keyPrinciples.safety.description')}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="bg-gradient-to-r from-purple-400 to-indigo-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              {t('parentGuide.keyPrinciples.support.title')}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t('parentGuide.keyPrinciples.support.description')}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Emergency Contact Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 glass-effect rounded-3xl p-8 max-w-4xl mx-auto border-2 border-red-200"
      >
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-r from-red-400 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3 text-gray-800">
              {t('parentGuide.emergency.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('parentGuide.emergency.description')}
            </p>
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
          <motion.div
            key="child-tips"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Child Tips Categories */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {[
                { id: 'physical' as const, icon: <Heart className="w-6 h-6" />, color: 'from-pink-400 to-rose-500', label: 'Physical' },
                { id: 'emotional' as const, icon: <Sparkles className="w-6 h-6" />, color: 'from-purple-400 to-pink-500', label: 'Emotional' },
                { id: 'social' as const, icon: <Users className="w-6 h-6" />, color: 'from-blue-400 to-cyan-500', label: 'Social' },
                { id: 'hygiene' as const, icon: <Droplets className="w-6 h-6" />, color: 'from-green-400 to-teal-500', label: 'Hygiene' },
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
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'glass-effect text-gray-700 hover:border-2 hover:border-purple-300'
                  }`}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Child Tips Content */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto space-y-4"
            >
              {(() => {
                const childTipsData: any = {
                  physical: [
                    {
                      id: 'exercise',
                      icon: <Heart className="w-6 h-6" />,
                      title: 'Stay Active',
                      description: 'Regular exercise helps your body develop healthily and boosts your mood',
                      tips: [
                        'Aim for at least 60 minutes of activity each day',
                        'Try different sports to find what you enjoy',
                        'Walking, dancing, and playing with friends all count!',
                        'Exercise helps with stress and sleep too'
                      ]
                    },
                    {
                      id: 'nutrition',
                      icon: <Sparkles className="w-6 h-6" />,
                      title: 'Healthy Eating',
                      description: 'Your growing body needs good nutrition to support all the changes',
                      tips: [
                        'Eat plenty of fruits and vegetables every day',
                        'Drink lots of water - aim for 6-8 glasses daily',
                        'Don\'t skip breakfast - it gives you energy for the day',
                        'Limit sugary snacks and drinks'
                      ]
                    },
                    {
                      id: 'sleep',
                      icon: <Moon className="w-6 h-6" />,
                      title: 'Get Enough Sleep',
                      description: 'Sleep is when your body grows and repairs itself',
                      tips: [
                        'Teenagers need 8-10 hours of sleep each night',
                        'Try to go to bed at the same time every night',
                        'Avoid screens 30 minutes before bedtime',
                        'Keep your bedroom cool, dark, and quiet'
                      ]
                    },
                    {
                      id: 'pain',
                      icon: <AlertCircle className="w-6 h-6" />,
                      title: 'Managing Discomfort',
                      description: 'Some changes might cause temporary discomfort',
                      tips: [
                        'For growing pains, try gentle stretching',
                        'A warm bath can help with muscle aches',
                        'Talk to an adult if pain persists or worries you',
                        'Remember: most discomfort is temporary'
                      ]
                    }
                  ],
                  emotional: [
                    {
                      id: 'feelings',
                      icon: <Heart className="w-6 h-6" />,
                      title: 'Understanding Your Feelings',
                      description: 'It\'s normal to have big emotions during puberty',
                      tips: [
                        'All feelings are valid - happy, sad, angry, confused',
                        'Mood swings are caused by hormones - they\'re normal',
                        'It\'s okay to cry or feel overwhelmed sometimes',
                        'Your feelings will become more stable with time'
                      ]
                    },
                    {
                      id: 'stress',
                      icon: <Shield className="w-6 h-6" />,
                      title: 'Managing Stress',
                      description: 'Learn healthy ways to cope with stress and anxiety',
                      tips: [
                        'Try deep breathing: breathe in for 4, hold for 4, out for 4',
                        'Talk to someone you trust about your worries',
                        'Exercise is a great stress reliever',
                        'Take breaks when you feel overwhelmed'
                      ]
                    },
                    {
                      id: 'confidence',
                      icon: <Smile className="w-6 h-6" />,
                      title: 'Building Self-Confidence',
                      description: 'Feeling good about yourself takes practice',
                      tips: [
                        'Focus on what you like about yourself',
                        'Set small, achievable goals and celebrate wins',
                        'Don\'t compare yourself to others - everyone\'s different',
                        'Practice positive self-talk daily'
                      ]
                    },
                    {
                      id: 'help',
                      icon: <Phone className="w-6 h-6" />,
                      title: 'When to Ask for Help',
                      description: 'It\'s important to know when to reach out',
                      tips: [
                        'If sad feelings last more than 2 weeks',
                        'If you have thoughts of hurting yourself',
                        'If anxiety stops you from daily activities',
                        'Talk to parents, school counselor, or trusted adult'
                      ]
                    }
                  ],
                  social: [
                    {
                      id: 'friends',
                      icon: <Users className="w-6 h-6" />,
                      title: 'Friendships',
                      description: 'Relationships become more important during puberty',
                      tips: [
                        'Real friends accept you for who you are',
                        'It\'s okay if friendships change - you\'re all growing',
                        'Quality is more important than quantity',
                        'Be yourself - don\'t pretend to be someone you\'re not'
                      ]
                    },
                    {
                      id: 'peer-pressure',
                      icon: <Shield className="w-6 h-6" />,
                      title: 'Handling Peer Pressure',
                      description: 'Learn to make your own choices confidently',
                      tips: [
                        'It\'s okay to say "no" - real friends will respect that',
                        'You don\'t have to do something just because others do',
                        'If something feels wrong, trust your instincts',
                        'Find friends who share your values'
                      ]
                    },
                    {
                      id: 'communication',
                      icon: <MessageCircle className="w-6 h-6" />,
                      title: 'Communication',
                      description: 'Express yourself clearly and listen to others',
                      tips: [
                        'Use "I feel" statements instead of blaming',
                        'Listen actively when others speak',
                        'It\'s okay to disagree respectfully',
                        'Ask questions if you don\'t understand'
                      ]
                    },
                    {
                      id: 'boundaries',
                      icon: <Shield className="w-6 h-6" />,
                      title: 'Personal Boundaries',
                      description: 'Understanding and respecting personal space',
                      tips: [
                        'Your body is yours - you control who touches it',
                        'Say "stop" if something makes you uncomfortable',
                        'Respect others\' boundaries too',
                        'Tell a trusted adult if someone crosses your boundaries'
                      ]
                    }
                  ],
                  hygiene: [
                    {
                      id: 'shower',
                      icon: <Droplets className="w-6 h-6" />,
                      title: 'Daily Hygiene',
                      description: 'Keep your body clean and fresh',
                      tips: [
                        'Shower or bathe daily, especially after exercise',
                        'Use soap and shampoo - pay attention to underarms',
                        'Wash your face twice daily to prevent acne',
                        'Change into clean clothes daily'
                      ]
                    },
                    {
                      id: 'deodorant',
                      icon: <Sparkles className="w-6 h-6" />,
                      title: 'Managing Body Odor',
                      description: 'Everyone sweats more during puberty',
                      tips: [
                        'Use deodorant or antiperspirant daily',
                        'Apply after showering and before bed',
                        'Wear breathable fabrics like cotton',
                        'Keep extra deodorant in your backpack'
                      ]
                    },
                    {
                      id: 'skin',
                      icon: <Heart className="w-6 h-6" />,
                      title: 'Skin Care',
                      description: 'Take care of your changing skin',
                      tips: [
                        'Wash your face gently - don\'t scrub too hard',
                        'Use oil-free moisturizer if your skin is dry',
                        'Never pop pimples - it can cause scarring',
                        'See a doctor if acne bothers you'
                      ]
                    },
                    {
                      id: 'period',
                      icon: <CheckCircle className="w-6 h-6" />,
                      title: 'Period Care (for those who menstruate)',
                      description: 'Managing your monthly cycle',
                      tips: [
                        'Change pads/tampons every 4-6 hours',
                        'Keep supplies in your bag for emergencies',
                        'Track your cycle to know when to expect it',
                        'Gentle exercise can help with cramps'
                      ]
                    }
                  ]
                }

                const tips = childTipsData[activeCategory] || []
                const tipCategory = [
                  { id: 'physical' as const, color: 'from-pink-400 to-rose-500' },
                  { id: 'emotional' as const, color: 'from-purple-400 to-pink-500' },
                  { id: 'social' as const, color: 'from-blue-400 to-cyan-500' },
                  { id: 'hygiene' as const, color: 'from-green-400 to-teal-500' },
                ].find(c => c.id === activeCategory)

                return tips.map((item: any, index: number) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-effect rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedTip(expandedTip === item.id ? null : item.id)}
                      className="w-full p-6 flex items-start gap-4 text-left hover:bg-white/50 transition-all"
                    >
                      <div className={`bg-gradient-to-r ${tipCategory?.color || 'from-blue-400 to-cyan-500'} w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedTip === item.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-400"
                      >
                        <Lightbulb className="w-6 h-6" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedTip === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-200"
                        >
                          <div className="p-6 bg-white/30">
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              Helpful Tips:
                            </h4>
                            <ul className="space-y-3">
                              {item.tips.map((tip: string, idx: number) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex gap-3 text-gray-700"
                                >
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

            {/* Emergency Info for Child Tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 glass-effect rounded-3xl p-8 md:p-10 max-w-4xl mx-auto border-2 border-blue-200"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-red-400 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-800">
                    Need Immediate Help? 🆘
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you're feeling very upset, scared, or need to talk to someone right away, don't wait:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>Talk to a parent, guardian, or trusted adult immediately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>Contact your school counselor or nurse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>Call a helpline in your country (they're free and confidential)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>Remember: Asking for help is a sign of strength, not weakness! 💪</span>
                    </li>
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
