import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { processingSteps } from '../data/mockData'

const LoadingAnimation = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completed,   setCompleted]   = useState([])

  useEffect(() => {
    let stepIndex = 0

    const advance = () => {
      if (stepIndex >= processingSteps.length) {
        // All done
        setTimeout(() => onComplete?.(), 600)
        return
      }
      setCurrentStep(stepIndex)
      const step = processingSteps[stepIndex]
      setTimeout(() => {
        setCompleted((prev) => [...prev, stepIndex])
        stepIndex++
        advance()
      }, step.duration)
    }

    advance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const progress = Math.round(((completed.length) / processingSteps.length) * 100)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 px-4">
      {/* Pulsing logo */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-10"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-400 rounded-2xl flex items-center justify-center text-white font-display font-bold text-3xl shadow-2xl shadow-blue-500/30">
          M
        </div>
      </motion.div>

      <h2 className="text-white font-display font-bold text-2xl mb-2 text-center">
        Analyzing Your Prescription
      </h2>
      <p className="text-slate-400 text-sm mb-10 text-center max-w-xs">
        Our AI is carefully reading and interpreting your prescription. This takes just a few seconds.
      </p>

      {/* Steps */}
      <div className="w-full max-w-sm space-y-3 mb-8">
        {processingSteps.map((step, i) => {
          const isDone    = completed.includes(i)
          const isActive  = currentStep === i && !isDone
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                isDone   ? 'bg-green-500/10 border border-green-500/20' :
                isActive ? 'bg-blue-500/10 border border-blue-500/20' :
                           'bg-white/3 border border-white/5'
              }`}
            >
              {/* Icon / Spinner / Check */}
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-lg">
                {isDone ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-400"
                  >✓</motion.span>
                ) : isActive ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full"
                  />
                ) : (
                  <span className="opacity-30">{step.icon}</span>
                )}
              </div>

              <span className={`text-sm font-medium ${
                isDone ? 'text-green-300' : isActive ? 'text-blue-300' : 'text-slate-500'
              }`}>
                {step.label}
              </span>

              {isDone && (
                <span className="ml-auto text-green-400 text-xs">Done</span>
              )}
              {isActive && (
                <span className="ml-auto text-blue-400 text-xs">Processing…</span>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingAnimation