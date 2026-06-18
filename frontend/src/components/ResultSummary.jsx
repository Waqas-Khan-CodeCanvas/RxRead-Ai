import React from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiMapPin, FiCalendar, FiRefreshCw } from 'react-icons/fi'

const ResultSummary = ({ data, summaryText }) => {
  const { doctor, patient } = data

  return (
    <div className="space-y-4">
      {/* Doctor info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5"
      >
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-4">Doctor Information</p>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {doctor.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="text-white font-semibold">{doctor.name}</p>
            <p className="text-blue-400 text-sm">{doctor.specialization}</p>
            <div className="flex flex-col sm:flex-row gap-2 mt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1"><FiMapPin size={11} />{doctor.hospital}</span>
              <span className="flex items-center gap-1"><FiUser size={11} />Lic: {doctor.license}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Patient info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-5"
      >
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-3">Patient & Prescription</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400 text-xs mb-0.5">Patient Name</p>
            <p className="text-white font-medium">{patient.name}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-0.5">Age</p>
            <p className="text-white font-medium">{patient.age} years</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-0.5">Date Prescribed</p>
            <p className="text-white font-medium flex items-center gap-1"><FiCalendar size={12} />{patient.date}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-0.5">Follow-up</p>
            <p className="text-white font-medium flex items-center gap-1"><FiRefreshCw size={12} />{data.followUp.split(' ').slice(0, 3).join(' ')}…</p>
          </div>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-500/10 to-teal-500/10 border border-blue-500/20 rounded-2xl p-5"
      >
        <p className="text-xs text-blue-400 font-medium uppercase tracking-wider mb-2">Prescription Summary</p>
        <p className="text-slate-200 text-sm leading-relaxed">{summaryText}</p>
      </motion.div>
    </div>
  )
}

export default ResultSummary