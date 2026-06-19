import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiDownload, FiShare2, FiAlertTriangle } from 'react-icons/fi'

import MedicineCard       from '../components/MedicineCard'
import LanguageSelector   from '../components/LanguageSelector'
import AudioPlayer        from '../components/AudioPlayer'
import ConfidenceMeter    from '../components/ConfidenceMeter'
import PrescriptionPreview from '../components/PrescriptionPreview'
import ResultSummary      from '../components/ResultSummary'

import useLanguage from '../hooks/useLanguage'
import { mockPrescriptionData } from '../data/mockData'

const ResultsPage = () => {
  const navigate = useNavigate()
  const { currentLanguage, changeLanguage, t } = useLanguage()
  const [imageURL, setImageURL] = useState(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('prescriptionImage')
    if (stored) setImageURL(stored)
  }, [])

  const data = mockPrescriptionData
  const summaryText = t(data.summary)
  const specialNotes = data.specialNotes[currentLanguage] || data.specialNotes.en

  return (
    <div className="min-h-screen bg-slate-900 py-6 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8 pt-4">
          <button
            onClick={() => navigate('/upload')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <FiArrowLeft size={16} />
            Upload New
          </button>
          <div className="flex items-center gap-2">
            <button className="btn-ghost text-sm px-4 py-2 flex items-center gap-2">
              <FiShare2 size={15} /> Share
            </button>
            <button className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
              <FiDownload size={15} /> Save PDF
            </button>
          </div>
        </div>

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-teal-400 font-semibold text-sm uppercase tracking-widest mb-1">Analysis Complete</p>
          <h1 className="text-3xl font-display font-bold text-white">Your Prescription Results</h1>
        </motion.div>

        {/* Language selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={changeLanguage} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left column: main content ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Doctor + patient summary */}
            <ResultSummary data={data} summaryText={summaryText} />

            {/* Medicines heading */}
            <div>
              <h2 className="text-white font-display font-bold text-xl mb-4">
                💊 Your Medicines ({data.medicines.length})
              </h2>
              <div className="space-y-4">
                {data.medicines.map((medicine, i) => (
                  <MedicineCard key={medicine.id} medicine={medicine} index={i} />
                ))}
              </div>
            </div>

            {/* Special notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-5"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span>📋</span> Special Instructions
              </h3>
              <ul className="space-y-2">
                {specialNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="text-teal-400 mt-0.5">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Follow-up */}
            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-5 flex items-start gap-3">
              <FiAlertTriangle className="text-yellow-400 mt-0.5 flex-shrink-0" size={18} />
              <div>
                <p className="text-yellow-300 font-semibold text-sm mb-1">Follow-up Required</p>
                <p className="text-yellow-200/70 text-sm">{data.followUp}</p>
              </div>
            </div>
          </div>

          {/* ── Right column: sidebar ── */}
          <div className="space-y-5">
            <ConfidenceMeter score={data.confidenceScore} />
            <AudioPlayer language={currentLanguage} />
            <PrescriptionPreview imageDataURL={imageURL} />

            {/* Disclaimer */}
            <div className="glass-card p-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                ⚠️ <strong className="text-slate-300">Medical Disclaimer:</strong> RxRead AI is an assistive tool only. Always follow your doctor's original instructions. Contact your doctor or pharmacist for any questions about your medicines.
              </p>
            </div>

            {/* New analysis CTA */}
            <Link
              to="/upload"
              className="block text-center btn-ghost text-sm py-3"
            >
              Analyze Another Prescription
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage