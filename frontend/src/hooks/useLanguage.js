import { useState, useCallback } from 'react'
import { languages } from '../data/mockData'

/**
 * Hook for managing multi-language content switching.
 */
const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en')

  const language = languages.find((l) => l.code === currentLanguage) || languages[0]

  const changeLanguage = useCallback((code) => {
    setCurrentLanguage(code)
  }, [])

  /**
   * Get localized content from a multilingual object.
   * Falls back to English if the key doesn't exist for the selected language.
   */
  const t = useCallback(
    (contentObj) => {
      if (!contentObj) return ''
      return contentObj[currentLanguage] || contentObj['en'] || ''
    },
    [currentLanguage]
  )

  return { currentLanguage, language, changeLanguage, languages, t }
}

export default useLanguage