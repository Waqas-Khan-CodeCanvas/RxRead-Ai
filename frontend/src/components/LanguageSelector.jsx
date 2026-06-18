import React from 'react'
import { motion } from 'framer-motion'
import { languages } from '../data/mockData'

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="glass-card p-4">
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-3">
        Select Language / زبان منتخب کریں
      </p>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              currentLanguage === lang.code
                ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
            aria-pressed={currentLanguage === lang.code}
            aria-label={`Switch to ${lang.label}`}
          >
            <span className="text-base" role="img" aria-hidden="true">{lang.flag}</span>
            <span>{lang.nativeLabel}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSelector