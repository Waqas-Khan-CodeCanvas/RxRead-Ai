import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiZoomIn, FiZoomOut } from 'react-icons/fi'

const PrescriptionPreview = ({ imageDataURL }) => {
  const [zoomed, setZoomed] = useState(false)

  // If no real image uploaded, show a mock prescription placeholder
  const hasImage = !!imageDataURL

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-white font-semibold text-sm">Original Prescription</p>
        {hasImage && (
          <button
            onClick={() => setZoomed((z) => !z)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            {zoomed ? <FiZoomOut size={14} /> : <FiZoomIn size={14} />}
            {zoomed ? 'Zoom out' : 'Zoom in'}
          </button>
        )}
      </div>

      {hasImage ? (
        <motion.img
          src={imageDataURL}
          alt="Uploaded prescription"
          animate={{ scale: zoomed ? 1.5 : 1 }}
          transition={{ duration: 0.3 }}
          className="w-full rounded-xl object-contain bg-black/20 cursor-pointer"
          style={{ maxHeight: zoomed ? '500px' : '250px' }}
          onClick={() => setZoomed((z) => !z)}
        />
      ) : (
        /* Placeholder mock prescription */
        <div className="bg-slate-800 rounded-xl p-6 font-mono text-xs space-y-2 border border-white/5">
          <div className="flex justify-between text-slate-300">
            <span className="font-bold text-sm">Dr. Aisha Rehman</span>
            <span>15/01/2024</span>
          </div>
          <p className="text-slate-500 text-xs">PMDC-12345 · Shifa International Hospital</p>
          <div className="border-t border-white/10 my-3" />
          <p className="text-slate-300">Rx:</p>
          <p className="text-white">1. Amoxicillin 500mg — TDS × 7 days</p>
          <p className="text-white">2. Paracetamol 1gm — SOS (max 4/day)</p>
          <p className="text-white">3. Cetirizine 10mg — OD × 5 days</p>
          <p className="text-white">4. Vit C 1000mg — OD × 14 days</p>
          <div className="border-t border-white/10 my-3" />
          <p className="text-slate-400 italic">Avoid cold. Rest. F/U after 7 days.</p>
          <div className="mt-4 flex justify-end">
            <div className="w-24 h-10 border-b border-slate-600 text-slate-600 text-xs flex items-end justify-center pb-1">
              Signature
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PrescriptionPreview