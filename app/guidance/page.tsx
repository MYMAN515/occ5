'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Heart, Sparkles, Users, Droplets, 
  MessageCircle, Book, Lightbulb, CheckCircle,
  AlertCircle, Shield, Phone, Smile
} from 'lucide-react'

type Category = 'physical' | 'emotional' | 'social' | 'hygiene'

// Moon icon component
const Moon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
)

export default function GuidancePage() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<Category>('physical')
  const [expandedTip, setExpandedTip] = useState<string | null>(null)

  const categories = [
    { id: 'physical' as Category, icon: <Heart className="w-6 h-6" />, color: 'from-pink-400 to-rose-500' },
    { id: 'emotional' as Category, icon: <Sparkles className="w-6 h-6" />, color: 'from-purple-400 to-pink-500' },
    { id: 'social' as Category, icon: <Users className="w-6 h-6" />, color: 'from-blue-400 to-cyan-500' },
    { id: 'hygiene' as Category, icon: <Droplets className="w-6 h-6" />, color: 'from-green-400 to-teal-500' },
  ]

  const guidanceData = {
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

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          {t('guidance.title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          {t('guidance.subtitle')}
        </p>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12"
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-full font-semibold transition-all ${
              activeCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                : 'glass-effect text-gray-700 hover:border-2 hover:border-primary-300'
            }`}
          >
            {category.icon}
            <span>{t(`guidance.categories.${category.id}`)}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Guidance Cards */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto space-y-4"
      >
        {guidanceData[activeCategory].map((item, index) => (
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
              <div className={`bg-gradient-to-r ${categories.find(c => c.id === activeCategory)?.color} w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
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
                      {item.tips.map((tip, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex gap-3 text-gray-700"
                        >
                          <span className="text-primary-500 font-bold flex-shrink-0">•</span>
                          <span className="leading-relaxed">{tip}</span>
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

      {/* Emergency Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 glass-effect rounded-3xl p-8 md:p-10 max-w-4xl mx-auto border-2 border-primary-200"
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
                <span className="text-primary-500 font-bold">•</span>
                <span>Talk to a parent, guardian, or trusted adult immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">•</span>
                <span>Contact your school counselor or nurse</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">•</span>
                <span>Call a helpline in your country (they're free and confidential)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">•</span>
                <span>Remember: Asking for help is a sign of strength, not weakness! 💪</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
