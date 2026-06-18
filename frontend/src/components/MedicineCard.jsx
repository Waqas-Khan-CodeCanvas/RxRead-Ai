import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiAlertTriangle, FiClock, FiCalendar, FiInfo } from 'react-icons/fi'
import { getMedicineColorClasses } from '../utils/helpers'

const MedicineCard = ({ medicine, index = 0 }) => {
  const [expanded, setExpanded] = useState(false)
  const colors = getMedicineColorClasses(medicine.color)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`rounded-2xl border ${colors.border} ${colors.bg} overflow-hidden`}
    >
      {/* Card Header */}
      <div
        className="p-5 cursor-pointer"
        onClick={() => setExpanded((e) => !e)}
        role="button"
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0`}>
              {medicine.icon}
            </div>

            {/* Name + type */}
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <h3 className="text-white font-display font-bold text-lg">{medicine.name}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}>
                  {medicine.type}
                </span>
              </div>
              <p className={`text-sm font-medium ${colors.text}`}>{medicine.brandName}</p>
              <p className="text-slate-300 text-sm mt-1">{medicine.purpose}</p>
            </div>
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 text-slate-400 mt-1"
          >
            <FiChevronDown size={20} />
          </motion.div>
        </div>

        {/* Quick info pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            <span className="font-semibold text-white">{medicine.dosage}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            <FiClock size={11} />
            {medicine.frequency}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            <FiCalendar size={11} />
            {medicine.duration}
          </span>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 border-t border-white/5">
              <div className="pt-4 space-y-4">

                {/* Instructions */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <FiInfo className="text-blue-400" size={14} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">How to Take</p>
                    <p className="text-slate-200 text-sm leading-relaxed">{medicine.instructions}</p>
                  </div>
                </div>

                {/* Warnings */}
                {medicine.warnings?.length > 0 && (
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FiAlertTriangle className="text-yellow-400" size={15} />
                      <p className="text-yellow-400 text-xs font-semibold uppercase tracking-wider">Warnings</p>
                    </div>
                    <ul className="space-y-1">
                      {medicine.warnings.map((w, i) => (
                        <li key={i} className="text-yellow-200/80 text-sm flex items-start gap-2">
                          <span className="text-yellow-400 mt-0.5">·</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default MedicineCard