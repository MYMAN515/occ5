'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Users, Info, ChevronRight, Heart, Brain, Sparkles, Smile, Cloud, Zap, Play, BookOpen, Video, CheckCircle, XCircle } from 'lucide-react'
import Image from 'next/image'

type Gender = 'general' | 'female' | 'male'
type TabType = 'physical' | 'emotional' | 'body-guide' | 'comics' | 'video'

export default function BodyGuidePage() {
  const [selectedGender, setSelectedGender] = useState<Gender>('general')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('physical')
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

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

  const generalChanges = [
    {
      id: 'growth',
      title: 'Growth Spurts',
      description: 'Most people experience rapid growth during puberty, typically gaining 2-4 inches per year at peak growth.',
      details: 'Growth spurts usually last 2-3 years. Hands and feet grow first, followed by arms and legs, and finally the torso. This can make you feel temporarily clumsy - that\'s completely normal! You might notice your clothes don\'t fit as well, or you bump into things more often. This is because your body is growing faster than your brain can adjust. Most people reach their adult height by age 18-20, but some continue growing into their early 20s. Remember: everyone grows at their own pace, and there\'s no "right" height!',
      tips: [
        'Eat nutritious meals to support healthy growth',
        'Get plenty of sleep (8-10 hours) - growth happens during rest',
        'Stay active with sports or exercise',
        'Be patient - growth spurts are temporary'
      ],
      image: '/images/growth-spurt.jpg',
      imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=400&fit=crop&q=80',
      emoji: '📏'
    },
    {
      id: 'skin',
      title: 'Skin Changes',
      description: 'Your skin produces more oil, which can lead to acne on your face, chest, and back.',
      details: 'Wash your face twice daily with a gentle cleanser. Acne is normal and temporary. If it bothers you, talk to a doctor about treatments. Never pop pimples as it can cause scarring! Hormonal changes increase oil production, which can clog pores. Acne is most common on the face, but can also appear on the chest, back, and shoulders. Most people experience some acne during puberty, and it usually improves by the late teens or early 20s. If acne is severe or causing emotional distress, a dermatologist can help with treatment options.',
      tips: [
        'Wash face morning and night with gentle, oil-free cleanser',
        'Avoid touching your face with dirty hands',
        'Use non-comedogenic (won\'t clog pores) moisturizers',
        'Change pillowcases regularly',
        'Don\'t scrub too hard - gentle is better',
        'See a doctor if acne is severe or painful'
      ],
      image: '/images/skin-changes.jpg',
      imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=400&fit=crop&q=80',
      emoji: '✨'
    },
    {
      id: 'sweat',
      title: 'Sweating & Body Odor',
      description: 'You\'ll start sweating more, especially from underarms, and develop a stronger body odor.',
      details: 'Daily showers become important! Use deodorant or antiperspirant. Wear clean clothes and breathable fabrics. This is your body maturing - everyone goes through it! Sweat glands become more active during puberty, especially in the armpits, feet, and groin area. Body odor happens when bacteria on your skin break down sweat. This is completely normal and part of growing up. Good hygiene habits will help you feel fresh and confident.',
      tips: [
        'Shower or bathe daily, especially after exercise',
        'Use deodorant or antiperspirant every day',
        'Wear clean clothes - change daily',
        'Choose breathable fabrics like cotton',
        'Keep extra deodorant in your school bag',
        'Wash underarms thoroughly with soap'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&h=400&fit=crop&q=80',
      emoji: '🚿'
    },
    {
      id: 'hair',
      title: 'Body Hair Growth',
      description: 'Hair will grow in new places including underarms, legs, and pubic area.',
      details: 'The amount and thickness varies greatly between people. Some have lots of body hair, others have very little - both are completely normal! You can choose to remove it or not - it\'s your choice. Body hair typically starts appearing around ages 9-14, but timing varies. Hair may grow on legs, underarms, pubic area, and sometimes on the chest, back, or face. The color and texture of body hair may be different from the hair on your head. Whether to remove body hair is a personal choice - there\'s no right or wrong answer.',
      tips: [
        'Body hair is natural and normal',
        'Removing hair is optional - your choice',
        'If removing hair, learn safe methods from trusted adults',
        'Shaving requires proper technique to avoid cuts',
        'Waxing and other methods have pros and cons',
        'Remember: everyone\'s body hair is different'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=400&fit=crop&q=80',
      emoji: '🌿'
    },
    {
      id: 'weight',
      title: 'Weight & Body Shape Changes',
      description: 'Your body composition changes - you may gain weight as you grow taller and develop muscle.',
      details: 'Weight gain during puberty is normal and healthy! Your body needs extra calories to support growth. You might notice your body shape changing - this is part of normal development. Focus on healthy habits rather than a specific number on the scale. Your body is preparing for adulthood, and these changes are necessary for healthy development.',
      tips: [
        'Weight gain during puberty is normal and healthy',
        'Focus on nutritious foods, not dieting',
        'Stay active with activities you enjoy',
        'Your body shape is unique - embrace it',
        'Talk to a doctor if you have concerns about weight',
        'Avoid comparing your body to others'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop&q=80',
      emoji: '🍎'
    },
    {
      id: 'sleep',
      title: 'Sleep Patterns Change',
      description: 'You might need more sleep, or your sleep schedule might shift later.',
      details: 'During puberty, your body\'s internal clock shifts, making you feel more awake at night and sleepy in the morning. This is why many teenagers are "night owls." However, you still need 8-10 hours of sleep for healthy growth and development. Try to maintain a consistent sleep schedule, even on weekends.',
      tips: [
        'Aim for 8-10 hours of sleep each night',
        'Try to go to bed and wake up at similar times',
        'Avoid screens 30-60 minutes before bed',
        'Create a relaxing bedtime routine',
        'Keep your bedroom cool, dark, and quiet',
        'Limit caffeine, especially in the afternoon'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=400&fit=crop&q=80',
      emoji: '😴'
    }
  ]

  const femaleChanges = [
    {
      id: 'breast',
      title: 'Breast Development',
      description: 'Breasts begin to develop, starting with small buds that may feel tender.',
      details: 'Development can take 4-5 years to complete. It\'s normal for breasts to be different sizes or develop at different rates. Many people need a training bra around this time. Tenderness is normal! Breast development typically starts between ages 8-13, but can begin earlier or later. You might notice small, firm lumps under the nipples first - these are called breast buds. One breast might develop faster than the other - this is completely normal and they usually even out over time. Soreness or tenderness is common and usually temporary.',
      tips: [
        'Breast development happens in stages over several years',
        'It\'s normal for one breast to be slightly larger',
        'Tenderness usually goes away as development continues',
        'A soft, supportive bra can help with comfort',
        'Talk to a trusted adult if you have questions',
        'All breast sizes are normal and beautiful'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&q=80',
      emoji: '💖'
    },
    {
      id: 'hips',
      title: 'Hip Widening & Body Shape',
      description: 'Hips and thighs become wider and more rounded.',
      details: 'This is caused by hormones preparing your body for adulthood. Your body shape will change from straight to more curved. Remember: bodies come in all shapes and sizes! As estrogen levels increase, fat is distributed to the hips, thighs, and buttocks, creating a more curved figure. This typically happens gradually over several years. Your waist might become more defined, and your overall body shape will become more adult-like. These changes are natural and healthy.',
      tips: [
        'Body shape changes are normal and healthy',
        'Everyone develops at their own pace',
        'Embrace your unique body shape',
        'Wear clothes that make you feel comfortable',
        'Focus on health, not appearance',
        'Remember: all body shapes are beautiful'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=400&fit=crop&q=80',
      emoji: '💃'
    },
    {
      id: 'period',
      title: 'Menstruation (Periods)',
      description: 'Monthly menstrual cycles begin, typically between ages 11-14.',
      details: 'Your first period might be irregular - that\'s normal! Use pads, tampons, or menstrual cups. Track your cycle to know when to expect it. Cramps are common and can be managed with heat, rest, and pain relief if needed. Periods usually start 1-2 years after breast development begins. The first few periods may be irregular - cycles can range from 21-45 days and still be normal. Periods typically last 3-7 days. It\'s helpful to track your cycle to understand your body\'s pattern.',
      tips: [
        'Keep period supplies (pads/tampons) in your bag',
        'Track your cycle with an app or calendar',
        'For cramps: try heat, gentle exercise, or pain relief',
        'Change pads/tampons every 4-6 hours',
        'It\'s normal for early periods to be irregular',
        'Talk to a doctor if periods are very painful or heavy',
        'Remember: periods are a sign of a healthy body'
      ],
      image: '/images/period-care.jpg',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop&q=80',
      emoji: '🌸'
    },
    {
      id: 'discharge',
      title: 'Vaginal Discharge',
      description: 'Clear or whitish discharge is normal and keeps the vagina healthy.',
      details: 'This usually starts before your first period. It\'s your body\'s way of keeping itself clean. If discharge has a strong odor or causes itching, talk to a doctor. Vaginal discharge is a normal part of the menstrual cycle. It helps keep the vagina clean and prevents infection. The amount, color, and consistency can change throughout the month. Normal discharge is usually clear or white, and doesn\'t have a strong smell.',
      tips: [
        'Normal discharge is clear or white',
        'It may increase around ovulation (mid-cycle)',
        'Wear breathable cotton underwear',
        'Avoid douching - it\'s not necessary',
        'See a doctor if discharge has strong odor, unusual color, or causes itching',
        'This is your body\'s natural cleaning system'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&q=80',
      emoji: '🩹'
    },
    {
      id: 'emotions',
      title: 'Emotional Changes (Female)',
      description: 'Hormonal changes can affect your emotions and mood.',
      details: 'Estrogen and progesterone levels fluctuate during your menstrual cycle, which can affect how you feel. You might experience mood swings, especially before your period (PMS - Premenstrual Syndrome). This is completely normal. Some people feel more emotional, irritable, or sensitive at certain times of the month. These feelings are valid and temporary.',
      tips: [
        'Mood changes are normal and temporary',
        'Track your cycle to understand patterns',
        'Practice self-care during difficult days',
        'Talk to someone you trust about your feelings',
        'Gentle exercise can help improve mood',
        'See a doctor if mood changes are severe'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&q=80',
      emoji: '💭'
    }
  ]

  const maleChanges = [
    {
      id: 'voice',
      title: 'Voice Deepening',
      description: 'Your voice will gradually become deeper as your voice box (larynx) grows.',
      details: 'Voice "cracking" during this time is normal and temporary! The Adam\'s apple (visible bump in throat) becomes more prominent. The voice change process usually takes several months to a year. This typically happens between ages 12-16. Your voice might crack or sound hoarse as it adjusts. This happens because your vocal cords are growing longer and thicker. The change is gradual, and eventually your voice will stabilize at a deeper pitch. This is a normal part of becoming a man.',
      tips: [
        'Voice cracking is temporary and normal',
        'The change happens gradually over months',
        'Your voice will eventually stabilize',
        'Don\'t worry if it sounds different - everyone goes through this',
        'Practice speaking to get used to your new voice',
        'If voice changes are concerning, talk to a doctor'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop&q=80',
      emoji: '🎤'
    },
    {
      id: 'facial',
      title: 'Facial Hair Growth',
      description: 'Hair begins growing on the upper lip, chin, and cheeks.',
      details: 'It starts as light fuzz and gradually becomes thicker. You\'ll eventually need to start shaving if you choose to. Ask a trusted adult to teach you how to shave safely when you\'re ready. Facial hair typically starts appearing around ages 13-16, but timing varies. It usually starts as light, soft hair on the upper lip, then spreads to the chin, cheeks, and neck. The amount and thickness of facial hair varies greatly - some people have thick beards, others have very little hair. Both are normal!',
      tips: [
        'Facial hair growth varies - everyone is different',
        'Start with light fuzz before it becomes thick',
        'Learn proper shaving technique from a trusted adult',
        'Use shaving cream and a sharp razor',
        'Shave in the direction of hair growth to avoid irritation',
        'It\'s okay to wait until you\'re ready to start shaving'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=400&fit=crop&q=80',
      emoji: '✂️'
    },
    {
      id: 'muscles',
      title: 'Muscle Development',
      description: 'Shoulders broaden and muscles become more defined.',
      details: 'You\'ll naturally become stronger as testosterone increases. Upper body strength especially increases. Regular exercise helps build healthy muscles, but avoid overdoing it! During puberty, muscle mass increases naturally due to hormonal changes. Your shoulders will get broader, and you\'ll develop more muscle definition. This happens gradually over several years. Regular exercise supports healthy muscle development, but it\'s important not to overdo it or use weights that are too heavy for your age.',
      tips: [
        'Muscle development happens naturally with hormones',
        'Regular exercise supports healthy growth',
        'Focus on proper form, not heavy weights',
        'Include rest days in your exercise routine',
        'Eat nutritious foods to support muscle growth',
        'Talk to a coach or trainer for safe exercise guidance'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop&q=80',
      emoji: '💪'
    },
    {
      id: 'changes',
      title: 'Genital Changes',
      description: 'The penis and testicles grow larger. Erections become more frequent.',
      details: 'Random erections are completely normal and not always related to sexual thoughts. "Wet dreams" (nocturnal emissions) are also normal. These are signs of healthy development. Genital development typically begins around ages 10-14. The penis and testicles grow larger, and the scrotum (the sac holding the testicles) becomes darker and larger. Random erections can happen at any time and are not always related to sexual thoughts - they\'re a normal part of development. "Wet dreams" occur when the body releases semen during sleep - this is also completely normal.',
      tips: [
        'Genital changes are normal and healthy',
        'Random erections are not always related to thoughts',
        '\"Wet dreams\" are normal and nothing to be ashamed of',
        'Everyone develops at their own pace',
        'If you have questions, talk to a trusted adult or doctor',
        'These changes are signs of healthy development'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&q=80',
      emoji: '🔬'
    },
    {
      id: 'emotions-male',
      title: 'Emotional Changes (Male)',
      description: 'Hormonal changes can affect your emotions and mood.',
      details: 'Testosterone levels increase during puberty, which can affect your emotions. You might feel more aggressive, competitive, or have stronger emotional reactions. You might also experience mood swings. These emotional changes are normal and part of growing up. Learning to manage emotions is an important life skill.',
      tips: [
        'Emotional changes are normal during puberty',
        'Find healthy ways to express emotions (sports, art, music)',
        'Talk to someone you trust about your feelings',
        'Practice deep breathing when feeling overwhelmed',
        'Exercise can help manage strong emotions',
        'Remember: it\'s okay to have feelings and express them'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=400&fit=crop&q=80',
      emoji: '🎨'
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

  const quizQuestions = [
    {
      question: "When does puberty typically start?",
      options: ["Ages 5-7", "Ages 8-14", "Ages 15-18", "Ages 20+"],
      correct: "Ages 8-14"
    },
    {
      question: "What is a common physical change during puberty?",
      options: ["Getting shorter", "Growth spurts", "Losing hair", "No changes"],
      correct: "Growth spurts"
    },
    {
      question: "Mood swings during puberty are:",
      options: ["Abnormal", "Normal and common", "A sign of illness", "Rare"],
      correct: "Normal and common"
    },
    {
      question: "Everyone goes through puberty:",
      options: ["At the exact same time", "At different times", "Only boys", "Only girls"],
      correct: "At different times"
    }
  ]

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
          Understanding Changes & Body Guide
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Learn about physical and emotional changes during puberty 🌱
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
            onClick={() => { setActiveTab('physical'); setShowQuiz(false); setQuizSubmitted(false); setQuizAnswers({}) }}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'physical'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-blue-50'
            }`}
          >
            💪 Physical
          </button>
          <button
            onClick={() => { setActiveTab('emotional'); setShowQuiz(false); setQuizSubmitted(false); setQuizAnswers({}) }}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'emotional'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            💭 Emotional
          </button>
          <button
            onClick={() => { setActiveTab('body-guide'); setShowQuiz(false); setQuizSubmitted(false); setQuizAnswers({}) }}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'body-guide'
                ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            📖 Body Guide
          </button>
          <button
            onClick={() => { setActiveTab('comics'); setShowQuiz(false); setQuizSubmitted(false); setQuizAnswers({}) }}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'comics'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            📚 Comics
          </button>
          <button
            onClick={() => { setActiveTab('video'); setShowQuiz(false); setQuizSubmitted(false); setQuizAnswers({}) }}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
              activeTab === 'video'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-blue-50'
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
                Everyone
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
                Female
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
                Male
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
                                          <p class="text-sm text-gray-500 mt-2">Educational illustration</p>
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
                                Helpful Tips:
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
                  <p className="text-gray-700 font-semibold">💡 Lesson: {comic.lesson}</p>
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
                  Test Your Understanding
                </h3>
                {!showQuiz && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowQuiz(true)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold"
                  >
                    Start Quiz
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
                      Submit Answers
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 text-center"
                    >
                      <div className="text-4xl mb-4">🎉</div>
                      <h4 className="text-2xl font-bold mb-2 text-gray-800">
                        You got {getQuizScore().correct} out of {getQuizScore().total} correct!
                      </h4>
                      <p className="text-gray-600 mb-4">
                        {getQuizScore().correct === getQuizScore().total
                          ? "Perfect score! You're a puberty expert! 🌟"
                          : "Great job! Keep learning! 💪"}
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
                        Try Again
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
                Educational Videos & Animations
              </h3>
              <p className="text-center text-gray-600 mb-8">
                Watch helpful videos about puberty changes from trusted sources
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Puberty Explained for Kids",
                    description: "Educational video explaining puberty changes in an age-appropriate way",
                    videoId: "gWFLnkE9rh4",
                    source: "Sam.K Tween & Teens",
                    duration: "5:03"
                  },
                  {
                    title: "Emotional Changes During Puberty",
                    description: "Understanding mood swings and emotional development",
                    videoId: "du8siPJ1ZKo",
                    source: "Educational Channel",
                    duration: "3:57"
                  },
                  {
                    title: "Physical Changes: What to Expect",
                    description: "Comprehensive guide to physical development during puberty",
                    videoId: "vMRHCYq7oBU",
                    source: "Health Organization",
                    duration: "4:40"
                  },
                  {
                    title: "Building Self-Confidence",
                    description: "Tips for self-acceptance and confidence during puberty",
                    videoId: "pdjaxS4ME2A",
                    source: "Youth Support",
                    duration: "6:29"
                  }
                ].map((video, index) => (
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
                  More Educational Videos
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Hygiene During Puberty", link: "https://www.youtube.com/results?search_query=puberty+hygiene+for+kids" },
                    { title: "Talking to Parents", link: "https://www.youtube.com/results?search_query=talking+to+parents+about+puberty" },
                    { title: "Body Image & Confidence", link: "https://www.youtube.com/results?search_query=body+image+puberty+confidence" }
                  ].map((item, idx) => (
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
  