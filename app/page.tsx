'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Heart,
  Activity,
  BookOpen,
  Sparkles,
  Lightbulb,
  MessageCircle,
  ShieldCheck,
  CalendarCheck,
  Users,
  Droplets,
  Target,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import RegisterServiceWorker from './register-sw'

export default function Home() {
  const { t } = useLanguage()
  
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: t('home.features.parentGuide.title'),
      description: t('home.features.parentGuide.description'),
      href: "/parent-guide",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Activities & Games',
      description: 'All fun activities and games in one easy place for kids and parents',
      href: "/activities",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Understanding Changes & Body Guide',
      description: 'Learn about physical and emotional changes during puberty',
      href: "/body-guide",
      color: "from-pink-400 to-rose-500"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: t('home.features.diary.title'),
      description: t('home.features.diary.description'),
      href: "/diary",
      color: "from-amber-400 to-orange-500"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Resource Library',
      description: 'Downloadable guides, checklists, and printable activity sheets',
      href: "/resources",
      color: "from-indigo-400 to-purple-500"
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Hygiene & Self-Care",
      description: "Build daily routines and learn about hygiene with interactive games",
      href: "/hygiene",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Confidence & Lifestyle",
      description: "Track habits, build confidence, and learn about healthy lifestyle choices",
      href: "/confidence",
      color: "from-purple-400 to-indigo-500"
    }
  ]

  const supportPillars = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: t('home.support.pillars.conversation.title'),
      description: t('home.support.pillars.conversation.description'),
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: t('home.support.pillars.trust.title'),
      description: t('home.support.pillars.trust.description'),
    },
    {
      icon: <CalendarCheck className="w-8 h-8" />,
      title: t('home.support.pillars.routines.title'),
      description: t('home.support.pillars.routines.description'),
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('home.support.pillars.community.title'),
      description: t('home.support.pillars.community.description'),
    },
  ]

  return (
    <>
      <RegisterServiceWorker />
      <div className="container mx-auto px-4 py-10 md:py-16 space-y-10 md:space-y-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-effect rounded-[32px] overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-50 via-white/70 to-secondary-50 opacity-70" aria-hidden="true" />
          <div className="relative z-10 flex flex-col gap-6 text-center px-5 py-10 sm:px-10">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {t('home.title')}
            </motion.h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
              <Link href="/parent-guide" className="w-full">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 rounded-2xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {t('home.startLearning')}
                </motion.button>
              </Link>
              <Link href="/games" className="w-full">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-white text-primary-600 px-6 py-4 rounded-2xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all border-2 border-primary-100"
                >
                  {t('home.myDiary')}
                </motion.button>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {supportPillars.slice(0, 4).map((pillar) => (
                <div key={pillar.title} className="rounded-2xl bg-white/80 py-3 px-2 flex flex-col items-center text-xs sm:text-sm text-gray-600 shadow-sm">
                  <div className="mb-2 text-primary-600">{pillar.icon}</div>
                  <span className="font-semibold text-gray-800 text-center">
                    {pillar.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features Grid */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm font-semibold tracking-wide text-primary-500 uppercase">
              {t('home.features.title')}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t('home.features.subtitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.05 * index, duration: 0.5 }}
              >
                <Link href={feature.href}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="glass-effect rounded-3xl p-6 md:p-8 h-full cursor-pointer card-hover"
                  >
                    <div className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-white`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">{feature.description}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Support Pillars */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="glass-effect rounded-[28px] p-6 sm:p-10"
        >
          <div className="text-center mb-8 space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {t('home.support.title')}
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              {t('home.support.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {supportPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 bg-white/80 backdrop-blur rounded-2xl p-5 border border-white/60 shadow-sm"
              >
                <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 text-primary-600 w-14 h-14 rounded-2xl flex items-center justify-center">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{pillar.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs md:text-sm text-gray-500 mt-6 text-center">
            {t('home.support.note')}
          </p>
        </motion.section>

        {/* Info Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-[28px] p-6 sm:p-10 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
            {t('home.notAlone.title')}
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            {t('home.notAlone.content')}
          </p>
        </motion.section>
      </div>
    </>
  )
}
