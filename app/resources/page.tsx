'use client'

import { motion } from 'framer-motion'
import { Download, FileText, BookOpen, File, ExternalLink, Eye } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

type ResourceItem = {
  id: string
  kind: 'web' | 'book'
  downloadUrl: string
  previewUrl: string
}

type ResourceCategory = {
  categoryKey: string
  color: string
  icon: JSX.Element
  items: ResourceItem[]
}

const resourceCategories: ResourceCategory[] = [
  {
    categoryKey: 'parentGuides',
    color: 'from-blue-500 to-blue-600',
    icon: <BookOpen className="w-6 h-6" />,
    items: [
      {
        id: 'kidshealth-parent-guide',
        kind: 'web',
        downloadUrl: 'https://kidshealth.org/en/parents/talk-about-puberty.html',
        previewUrl: 'https://kidshealth.org/en/parents/talk-about-puberty.html'
      },
      {
        id: 'planned-parenthood-guide',
        kind: 'web',
        downloadUrl: 'https://www.plannedparenthood.org/learn/parents/middle-school',
        previewUrl: 'https://www.plannedparenthood.org/learn/parents/middle-school'
      },
      {
        id: 'aap-puberty-resource',
        kind: 'web',
        downloadUrl:
          'https://adolescenthealth.org/resources/resources-for-adolescents-and-parents/physical-and-psychosocial-development-resources-for-parents-of-adolescents-and-young-adults/',
        previewUrl:
          'https://adolescenthealth.org/resources/resources-for-adolescents-and-parents/physical-and-psychosocial-development-resources-for-parents-of-adolescents-and-young-adults/'
      },
      {
        id: 'puberty-curriculum',
        kind: 'web',
        downloadUrl: 'https://pubertycurriculum.com/parent-resources/',
        previewUrl: 'https://pubertycurriculum.com/parent-resources/'
      },
      {
        id: 'our-whole-lives',
        kind: 'web',
        downloadUrl: 'https://www.uua.org/re/owl',
        previewUrl: 'https://www.uua.org/re/owl'
      }
    ]
  },
  {
    categoryKey: 'books',
    color: 'from-orange-500 to-red-500',
    icon: <BookOpen className="w-6 h-6" />,
    items: [
      {
        id: 'perfectly-normal',
        kind: 'book',
        downloadUrl: 'https://www.goodreads.com/book/show/10155.It_s_Perfectly_Normal',
        previewUrl: 'https://www.goodreads.com/book/show/10155.It_s_Perfectly_Normal'
      },
      {
        id: 'care-keeping',
        kind: 'book',
        downloadUrl: 'https://www.americangirl.com/shop/ag/books',
        previewUrl: 'https://www.americangirl.com/shop/ag/books'
      },
      {
        id: 'guy-stuff',
        kind: 'book',
        downloadUrl: 'https://www.goodreads.com/book/show/34051226-guy-stuff',
        previewUrl: 'https://www.goodreads.com/book/show/34051226-guy-stuff'
      }
    ]
  }
]

export default function ResourcesPage() {
  const { t } = useLanguage()
  const actions = t<any>('resourceLibrary.actions')
  const about = t<any>('resourceLibrary.about')

  const handleDownload = (resource: ResourceItem) => {
    if (resource.downloadUrl && resource.downloadUrl !== '#') {
      window.open(resource.downloadUrl, '_blank')
    }
  }

  const handlePreview = (resource: ResourceItem) => {
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
          {t('resourceLibrary.title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          {t('resourceLibrary.subtitle')}
        </p>
      </motion.div>

      {/* Resources by Category */}
      <div className="space-y-12">
        {resourceCategories
          .filter((category) => category.items.some((resource: ResourceItem) => resource.downloadUrl && resource.downloadUrl !== '#'))
          .map((category, categoryIndex) => {
            const validItems = category.items.filter((resource: ResourceItem) => resource.downloadUrl && resource.downloadUrl !== '#')
            if (validItems.length === 0) return null

            const categoryTitle = t<string>(`resourceLibrary.categories.${category.categoryKey}.title`)

            return (
              <motion.div
                key={category.categoryKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`bg-gradient-to-r ${category.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                    {category.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{categoryTitle}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {validItems.map((resource, index) => {
                    const resourceContent = t<any>(`resourceLibrary.items.${resource.id}`) || {}
                    const typeLabel = resourceContent.type || resource.kind
                    const sourceLabel = resourceContent.source
                    const sizeLabel = resourceContent.size

                    return (
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
                            {typeLabel}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-800 mb-2">{resourceContent.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 flex-grow">{resourceContent.description}</p>

                        {sourceLabel && (
                          <div className="text-xs text-blue-600 font-medium mb-3">
                            {actions.sourceLabel}: {sourceLabel}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <span>{sizeLabel}</span>
                          <span className="px-2 py-1 bg-gray-100 rounded">{typeLabel}</span>
                        </div>

                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePreview(resource)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            {resource.kind === 'web' ? actions.visit : actions.preview}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDownload(resource)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                          >
                            {resource.kind === 'web' ? (
                              <>
                                <ExternalLink className="w-4 h-4" />
                                {actions.open}
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4" />
                                {actions.download}
                              </>
                            )}
                          </motion.button>
                        </div>
                      </motion.div>
                    )
                  })}
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
        <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">{about.title}</h3>
        <div className="space-y-3 text-gray-700 text-sm md:text-base">
          {(about.points || []).map((point: any, index: number) => (
            <p key={index}>
              <strong>{point.title}:</strong> {point.detail}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
