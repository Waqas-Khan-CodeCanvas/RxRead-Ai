import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingAnimation from '../components/LoadingAnimation'

const steps = [
  'Uploading prescription',
  'Reading handwriting',
  'Identifying medicines',
  'Generating explanation',
  'Finalizing results'
]

const ProcessingPage = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const hasImage = sessionStorage.getItem('prescriptionImage')

    if (!hasImage) {
      navigate('/upload', { replace: true })
      return
    }

    // Fake step progression (makes it feel “alive”)
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval)
          setTimeout(() => navigate('/results', { replace: true }), 800)
          return prev
        }
        return prev + 1
      })
    }, 1200)

    return () => clearInterval(interval)
  }, [navigate])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">

        {/* Loader */}
        <div className="mb-10">
          <LoadingAnimation />
        </div>

        {/* Main status */}
        <h2 className="text-white text-lg font-semibold mb-2">
          Processing your prescription
        </h2>

        <p className="text-slate-400 text-sm mb-8">
          This usually takes a few seconds
        </p>

        {/* Step list */}
        <div className="space-y-3 text-left">
          {steps.map((step, i) => (
            <div
              key={step}
              className="flex items-center gap-3"
            >
              {/* dot */}
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i < currentStep
                    ? 'bg-emerald-400'
                    : i === currentStep
                    ? 'bg-cyan-400 animate-pulse'
                    : 'bg-slate-700'
                }`}
              />

              <span
                className={`text-sm transition-all duration-300 ${
                  i === currentStep
                    ? 'text-white'
                    : i < currentStep
                    ? 'text-slate-300'
                    : 'text-slate-600'
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* subtle footer */}
        <p className="text-slate-600 text-xs mt-10">
          AI is analyzing handwritten text and medical terms
        </p>

      </div>
    </div>
  )
}

export default ProcessingPage