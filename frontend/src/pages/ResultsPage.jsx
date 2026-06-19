import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiDownload, FiShare2, FiAlertTriangle } from 'react-icons/fi'

import MedicineCard from '../components/MedicineCard'
import LanguageSelector from '../components/LanguageSelector'
import AudioPlayer from '../components/AudioPlayer'
import ConfidenceMeter from '../components/ConfidenceMeter'
import PrescriptionPreview from '../components/PrescriptionPreview'
import ResultSummary from '../components/ResultSummary'

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
    <div className="min-h-screen bg-slate-950 text-white px-4 py-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Header (clean + grouped) ── */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">

          <button
            onClick={() => navigate('/upload')}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition"
          >
            <FiArrowLeft size={16} />
            New Upload
          </button>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm flex items-center gap-2 transition">
              <FiShare2 size={14} />
              Share
            </button>

            <button className="px-4 py-2 rounded-lg bg-cyan-500 text-black text-sm font-medium hover:bg-cyan-400 transition flex items-center gap-2">
              <FiDownload size={14} />
              Export
            </button>
          </div>
        </div>

        {/* ── Title block (more “report-like”) ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-cyan-400 text-xs uppercase tracking-[0.2em] mb-2">
            Analysis complete
          </p>

          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Prescription Report
          </h1>

          <p className="text-slate-400 text-sm mt-2 max-w-xl">
            AI-generated breakdown of medicines, dosage instructions, and safety notes.
          </p>
        </motion.div>

        {/* ── Language selector (kept but less dominant) ── */}
        <div className="mb-8">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={changeLanguage}
          />
        </div>

        {/* ── Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── MAIN ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Summary (make it feel like “top insight”) */}
            <ResultSummary data={data} summaryText={summaryText} />

            {/* Medicines */}
            <section>
              <h2 className="text-lg font-semibold mb-4">
                Medicines
                <span className="text-slate-500 font-normal ml-2 text-sm">
                  ({data.medicines.length})
                </span>
              </h2>

              <div className="space-y-4">
                {data.medicines.map((medicine, i) => (
                  <MedicineCard
                    key={medicine.id}
                    medicine={medicine}
                    index={i}
                  />
                ))}
              </div>
            </section>

            {/* Special notes (less “boxed alert”, more “info section”) */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                📋 Special Instructions
              </h3>

              <ul className="space-y-2">
                {specialNotes.map((note, i) => (
                  <li key={i} className="text-sm text-slate-300 flex gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            </section>

            {/* Follow-up (keep warning but soften UI) */}
            <section className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5 flex gap-3">
              <FiAlertTriangle className="text-yellow-400 mt-1" size={18} />

              <div>
                <p className="text-yellow-300 font-medium text-sm mb-1">
                  Follow-up recommended
                </p>
                <p className="text-yellow-200/70 text-sm">
                  {data.followUp}
                </p>
              </div>
            </section>

          </div>

          {/* ── SIDEBAR (now “Assist Panel”) ── */}
          <aside className="space-y-5">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <ConfidenceMeter score={data.confidenceScore} />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <AudioPlayer language={currentLanguage} />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <PrescriptionPreview imageDataURL={imageURL} />
            </div>

            {/* Disclaimer (visually separated but not loud) */}
            <div className="text-xs text-slate-500 leading-relaxed px-2">
              <span className="text-slate-300 font-medium">Medical note:</span>{' '}
              This tool assists interpretation only. Always follow your doctor’s prescription.
            </div>

            <Link
              to="/upload"
              className="block text-center py-3 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition"
            >
              Analyze another prescription
            </Link>

          </aside>

        </div>
      </div>
    </div>
  )
}

export default ResultsPage