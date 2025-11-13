'use client'

import { motion } from 'framer-motion'
import { Users, Crown, GraduationCap } from 'lucide-react'

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: 'Qais Al-Hrahsheh',
      role: 'Developer',
      bio: 'Our lead developer who transforms caring ideas into secure, delightful experiences for families everywhere.',
      emoji: '💻',
      color: 'from-blue-400 to-cyan-500',
      special: true,
      badge: 'Lead Developer'
    },
    {
      id: 2,
      name: 'Dr. Nazean Jomhari',
      role: 'Project Advisor',
      bio: 'Leading our research initiatives and ensuring our content meets the highest standards of accuracy and educational value.',
      emoji: '👩‍🔬',
      color: 'from-purple-400 to-pink-500',
      special: true,
      badge: 'Project Advisor'
    },
    {
      id: 3,
      name: 'Tan Kang Zheng',
      role: 'Presenter',
      bio: 'Presents our project with clarity and passion, helping families understand the value of our resources.',
      emoji: '🎤',
      color: 'from-pink-400 to-rose-500'
    },
    {
      id: 4,
      name: 'Chengyang Sun',
      role: 'Secretary',
      bio: 'Keeps our team organized and ensures all documentation is clear and accessible.',
      emoji: '📝',
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 5,
      name: 'Raja Nur Aqylah Natasha binti Raja Zazman Shah',
      role: 'Designer of the Interface Design',
      bio: 'Creates beautiful and intuitive interface designs that make our platform easy and enjoyable to use.',
      emoji: '🎨',
      color: 'from-orange-400 to-amber-500'
    },
    {
      id: 6,
      name: 'Hanif Ruben Davni Setiadji',
      role: 'Video Creator and Photographer',
      bio: 'Creates engaging videos and captures meaningful moments that bring our educational content to life.',
      emoji: '📹',
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 7,
      name: 'Rafia Raida Binta Jashim',
      role: 'Secretary',
      bio: 'Coordinates team activities and maintains organized records to keep our project running smoothly.',
      emoji: '📋',
      color: 'from-rose-400 to-pink-500'
    },
    {
      id: 8,
      name: 'Wong Yan Wen',
      role: 'Visual Concept',
      bio: 'Develops visual concepts and design systems that create a cohesive and appealing user experience.',
      emoji: '✨',
      color: 'from-cyan-400 to-blue-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Simple Header */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* UM Logo */}
          <div className="mb-6 flex justify-center">
            <div className="bg-white rounded-xl p-3 shadow-md">
              <img
                src="https://maya.um.edu.my/images//img-logo-UM.png"
                alt="University of Malaya Logo"
                className="h-14 md:h-16 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Meet Our Team
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A dedicated group of professionals committed to supporting families through puberty
          </p>
        </motion.div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`glass-effect rounded-2xl p-6 relative ${
                member.special ? 'ring-2 ring-yellow-400/50' : ''
              }`}
            >
              {/* Special Badge */}
              {member.special && (
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full p-1.5 shadow-lg">
                    {member.name === 'Qais Al-Hrahsheh' ? (
                      <Crown className="w-4 h-4" />
                    ) : (
                      <GraduationCap className="w-4 h-4" />
                    )}
                  </div>
                </div>
              )}

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                  {member.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-800 truncate">{member.name}</h3>
                  {member.special && member.badge && (
                    <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold mt-1">
                      {member.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Role */}
              <div className={`inline-block bg-gradient-to-r ${member.color} text-white px-3 py-1 rounded-lg text-sm font-semibold mb-3`}>
                {member.role}
              </div>

              {/* Bio */}
              <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
