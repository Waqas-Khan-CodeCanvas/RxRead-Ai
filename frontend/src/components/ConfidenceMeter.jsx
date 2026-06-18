import React from 'react'
import { motion } from 'framer-motion'

const ConfidenceMeter = ({ score }) => {
  const color =
    score >= 90 ? { text: 'text-green-400',  bar: 'from-green-500 to-teal-400',   label: 'Excellent', ring: 'border-green-500/30' } :
    score >= 75 ? { text: 'text-blue-400',   bar: 'from-blue-500 to-teal-400',    label: 'Good',      ring: 'border-blue-500/30'  } :
    score >= 60 ? { text: 'text-yellow-400', bar: 'from-yellow-500 to-orange-400', label: 'Fair',     ring: 'border-yellow-500/30'} :
                  { text: 'text-red-400',    bar: 'from-red-500 to-orange-400',   label: 'Low',       ring: 'border-red-500/30'   }

  return (
    <div className={`glass-card p-5 border ${color.ring}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">AI Confidence</p>
          <p className="text-slate-300 text-sm">How accurately we read this prescription</p>
        </div>
        <div className="text-right">
          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className={`text-3xl font-display font-bold ${color.text}`}
          >
            {score}%
          </motion.p>
          <p className={`text-xs font-semibold ${color.text}`}>{color.label}</p>
        </div>
      </div>

      {/* Bar */}
      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          className={`h-full bg-gradient-to-r ${color.bar} rounded-full`}
        />
      </div>

      {/* Disclaimer for low confidence */}
      {score < 80 && (
        <p className="text-yellow-300/70 text-xs mt-3">
          ⚠️ Confidence is below 80%. Please verify this prescription with your doctor or pharmacist.
        </p>
      )}
    </div>
  )
}

export default ConfidenceMeter