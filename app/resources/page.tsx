'use client'

import { motion } from 'framer-motion'
import { Download, FileText, BookOpen, CheckSquare, File, ExternalLink, Eye } from 'lucide-react'

export default function ResourcesPage() {
  const resources = [
    {
      category: 'Parent Guides & Educational Resources',
      color: 'from-blue-500 to-blue-600',
      icon: <BookOpen className="w-6 h-6" />,
      items: [
        {
          id: 'kidshealth-parent-guide',
          title: 'KidsHealth: Talking to Your Child About Puberty',
          description: 'Expert guide from Nemours KidsHealth on how to have age-appropriate conversations about puberty',
          type: 'Web Resource',
          size: 'Online',
          downloadUrl: 'https://kidshealth.org/en/parents/talk-about-puberty.html',
          previewUrl: 'https://kidshealth.org/en/parents/talk-about-puberty.html',
          source: 'Nemours KidsHealth'
        },
        {
          id: 'planned-parenthood-guide',
          title: 'Planned Parenthood: Puberty & Growing Up',
          description: 'Comprehensive resource covering physical changes, emotional development, and how to support your child',
          type: 'Web Resource',
          size: 'Online',
          downloadUrl: 'https://www.plannedparenthood.org/learn/parents/middle-school',
          previewUrl: 'https://www.plannedparenthood.org/learn/parents/middle-school',
          source: 'Planned Parenthood'
        },
        {
          id: 'aap-puberty-resource',
          title: 'American Academy of Pediatrics: Puberty Resources',
          description: 'Medical guidance from AAP on physical and psychosocial development during adolescence',
          type: 'Web Resource',
          size: 'Online',
          downloadUrl: 'https://adolescenthealth.org/resources/resources-for-adolescents-and-parents/physical-and-psychosocial-development-resources-for-parents-of-adolescents-and-young-adults/',
          previewUrl: 'https://adolescenthealth.org/resources/resources-for-adolescents-and-parents/physical-and-psychosocial-development-resources-for-parents-of-adolescents-and-young-adults/',
          source: 'AAP'
        },
        {
          id: 'puberty-curriculum',
          title: 'Puberty Curriculum: Parent Resources',
          description: 'Tools and information to help parents discuss puberty confidently with their children',
          type: 'Web Resource',
          size: 'Online',
          downloadUrl: 'https://pubertycurriculum.com/parent-resources/',
          previewUrl: 'https://pubertycurriculum.com/parent-resources/',
          source: 'Puberty Curriculum'
        },
        {
          id: 'our-whole-lives',
          title: 'Our Whole Lives (OWL) Program',
          description: 'Comprehensive, age-appropriate sexuality education curricula for various age groups',
          type: 'Program Info',
          size: 'Online',
          downloadUrl: 'https://www.uua.org/re/owl',
          previewUrl: 'https://www.uua.org/re/owl',
          source: 'Unitarian Universalist Association'
        }
      ]
    },
    {
      category: 'Recommended Books & Reading',
      color: 'from-orange-500 to-red-500',
      icon: <BookOpen className="w-6 h-6" />,
      items: [
        {
          id: 'perfectly-normal',
          title: 'It\'s Perfectly Normal by Robie Harris',
          description: 'Award-winning book covering changing bodies, growing up, sex, and sexual health',
          type: 'Book',
          size: 'Available in libraries',
          downloadUrl: 'https://www.goodreads.com/book/show/10155.It_s_Perfectly_Normal',
          previewUrl: 'https://www.goodreads.com/book/show/10155.It_s_Perfectly_Normal',
          source: 'Robie Harris'
        },
        {
          id: 'care-keeping',
          title: 'The Care and Keeping of You Series',
          description: 'American Girl series covering body changes, hygiene, and self-care for girls',
          type: 'Book Series',
          size: 'Available in libraries',
          downloadUrl: 'https://www.americangirl.com/shop/ag/books',
          previewUrl: 'https://www.americangirl.com/shop/ag/books',
          source: 'American Girl'
        },
        {
          id: 'guy-stuff',
          title: 'Guy Stuff: The Body Book for Boys',
          description: 'Comprehensive guide to puberty, body changes, and growing up for boys',
          type: 'Book',
          size: 'Available in libraries',
          downloadUrl: 'https://www.goodreads.com/book/show/34051226-guy-stuff',
          previewUrl: 'https://www.goodreads.com/book/show/34051226-guy-stuff',
          source: 'American Girl'
        }
      ]
    }
  ]

  const handleDownload = (resource: any) => {
    if (resource.downloadUrl && resource.downloadUrl !== '#') {
      window.open(resource.downloadUrl, '_blank')
    }
  }

  const handlePreview = (resource: any) => {
    if (resource.previewUrl && resource.previewUrl !== '#') {
      window.open(resource.previewUrl, '_blank')
    }
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
          <File className="w-16 h-16 text-blue-500" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Resource Library
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Downloadable guides, checklists, and activity sheets to support your family's journey
        </p>
      </motion.div>

      {/* Resources by Category */}
      <div className="space-y-12">
        {resources.filter((category) => 
          category.items.some((resource: any) => resource.downloadUrl && resource.downloadUrl !== '#')
        ).map((category, categoryIndex) => {
          const validItems = category.items.filter((resource: any) => resource.downloadUrl && resource.downloadUrl !== '#')
          if (validItems.length === 0) return null
          
          return (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`bg-gradient-to-r ${category.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                {category.icon}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{category.category}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {validItems.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-effect rounded-2xl p-6 h-full flex flex-col"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`bg-gradient-to-r ${category.color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {resource.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 flex-grow">{resource.description}</p>
                  
                  {resource.source && (
                    <div className="text-xs text-blue-600 font-medium mb-3">
                      Source: {resource.source}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{resource.size}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">{resource.type}</span>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePreview(resource)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      {resource.type === 'Web Resource' ? 'Visit' : 'Preview'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(resource)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                    >
                      {resource.type === 'Web Resource' ? (
                        <>
                          <ExternalLink className="w-4 h-4" />
                          Open
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          )
        })}
      </div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 glass-effect rounded-3xl p-8 max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">📚 About These Resources</h3>
        <div className="space-y-3 text-gray-700 text-sm md:text-base">
          <p>
            <strong>Free to Download:</strong> All resources are free and available for personal use.
          </p>
          <p>
            <strong>Print-Friendly:</strong> All PDFs are optimized for printing at home.
          </p>
          <p>
            <strong>Regular Updates:</strong> We regularly add new resources based on community feedback.
          </p>
          <p>
            <strong>Privacy:</strong> Downloads are private - no account or personal information required.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

