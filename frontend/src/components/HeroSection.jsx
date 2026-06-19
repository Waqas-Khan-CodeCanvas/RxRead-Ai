import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiShield, FiGlobe, FiVolume2 } from 'react-icons/fi'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            AI-Powered Prescription Reader — Phase 1
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6"
          >
            Understand Your{' '}
            <span className="gradient-text block sm:inline">Doctor's Writing</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload a photo of any handwritten prescription. RxRead AI explains every medicine, dosage, and instruction — in your language, in simple words.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/upload" className="btn-primary inline-flex items-center justify-center gap-2 text-base px-8 py-4">
              Analyze a Prescription
              <FiArrowRight />
            </Link>
            <Link to="/about" className="btn-ghost inline-flex items-center justify-center gap-2 text-base px-8 py-4">
              Learn How It Works
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-slate-400"
          >
            {[
              { icon: <FiShield className="text-green-400" />, text: 'Privacy Protected' },
              { icon: <FiGlobe className="text-blue-400" />,   text: '5 Languages' },
              { icon: <FiVolume2 className="text-purple-400" />, text: 'Audio Readout' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Floating prescription card mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 relative max-w-2xl mx-auto"
          >
            <div className="glass-card p-6 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Prescription Analyzed</p>
                  <p className="text-white font-semibold">Dr. Aisha Rehman · Shifa Hospital</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full">
                  <span className="text-green-400 text-sm font-semibold">94% Confidence</span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Amoxicillin 500mg', 'Paracetamol 1000mg', 'Cetirizine 10mg', 'Vitamin C 1000mg'].map((med, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-lg mb-2 flex items-center justify-center text-base">
                      💊
                    </div>
                    <p className="text-white text-xs font-medium leading-tight">{med}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Glow under card */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-blue-500/20 blur-2xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection