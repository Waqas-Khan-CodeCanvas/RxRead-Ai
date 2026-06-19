import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiShield, FiZap, FiCheckCircle } from 'react-icons/fi'
import UploadZone from '../components/UploadZone'

const TIPS = [
  'Ensure good lighting — no harsh shadows over the text',
  'Hold your phone parallel to the paper, not at an angle',
  'Make sure all medicines and instructions are in the frame',
  'Clean the camera lens for a sharper image',
]

const FORMATS = [
  { ext: 'JPEG', desc: 'Most common camera format' },
  { ext: 'PNG',  desc: 'Screenshot or scanned image' },
  { ext: 'WebP', desc: 'Modern web image format' },
]

const UploadPage = () => {
  const navigate = useNavigate()
  const [file,     setFile]     = useState(null)
  const [imageURL, setImageURL] = useState(null)

  const handleFileSelected = (selectedFile, dataURL) => {
    setFile(selectedFile)
    setImageURL(dataURL)
  }

  const handleAnalyze = () => {
    // Store the image URL in sessionStorage so ResultsPage can access it
    if (imageURL) sessionStorage.setItem('prescriptionImage', imageURL)
    navigate('/processing')
  }

  return (
    <div className="min-h-screen bg-slate-900 py-28 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-teal-400 font-semibold text-sm uppercase tracking-widest mb-3">Step 1 of 3</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Upload Your Prescription
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Take a clear photo of your handwritten prescription and let RxRead AI explain it in simple language.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload area — takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            <UploadZone onFileSelected={handleFileSelected} />

            {/* Analyze button */}
            <motion.button
              onClick={handleAnalyze}
              disabled={!file}
              whileHover={file ? { scale: 1.02 } : {}}
              whileTap={file ? { scale: 0.98 } : {}}
              className={`w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-3 transition-all duration-300 ${
                file
                  ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40'
                  : 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
              }`}
            >
              {file ? (
                <>
                  <FiZap size={18} />
                  Analyze Prescription Now
                  <FiArrowRight size={18} />
                </>
              ) : (
                'Upload an image to continue'
              )}
            </motion.button>

            {/* Privacy note */}
            <div className="flex items-center gap-2 justify-center text-slate-500 text-xs">
              <FiShield size={13} className="text-green-400" />
              Your image is processed privately and never stored on our servers.
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            {/* Supported formats */}
            <div className="glass-card p-5">
              <p className="text-white font-semibold text-sm mb-4">Supported Formats</p>
              <div className="space-y-3">
                {FORMATS.map((fmt) => (
                  <div key={fmt.ext} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-bold text-xs">
                      {fmt.ext}
                    </div>
                    <p className="text-slate-300 text-sm">{fmt.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 text-xs text-slate-500">
                Maximum file size: 10MB
              </div>
            </div>

            {/* Photo tips */}
            <div className="glass-card p-5">
              <p className="text-white font-semibold text-sm mb-4">📸 Tips for Best Results</p>
              <ul className="space-y-2">
                {TIPS.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300 text-xs leading-relaxed">
                    <FiCheckCircle size={13} className="text-teal-400 mt-0.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default UploadPage