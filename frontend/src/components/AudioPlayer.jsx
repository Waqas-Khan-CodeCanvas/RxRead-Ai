import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FiPlay, FiPause, FiSquare, FiVolume2 } from 'react-icons/fi'
import useAudioPlayer from '../hooks/useAudioPlayer'
import { mockPrescriptionData } from '../data/mockData'

const VOICE_LANG_OPTIONS = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'ar-SA', label: 'Arabic' },
]

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2]

const AudioPlayer = ({ language = 'en' }) => {
  const { isPlaying, isPaused, rate, setRate, voiceLang, setVoiceLang, play, pause, resume, stop } = useAudioPlayer()

  // Build plain-text summary for speech
  const speechText = useMemo(() => {
    const summary = mockPrescriptionData.summary[language] || mockPrescriptionData.summary.en
    const meds = mockPrescriptionData.medicines
      .map((m) => `${m.name}, ${m.dosage}, ${m.frequency}, for ${m.duration}.`)
      .join(' ')
    const notes = (mockPrescriptionData.specialNotes[language] || mockPrescriptionData.specialNotes.en).join('. ')
    return `Prescription Summary: ${summary}. Medicines: ${meds}. Special Notes: ${notes}`
  }, [language])

  const handlePlayPause = () => {
    if (!isPlaying && !isPaused) { play(speechText); return }
    if (isPlaying)  { pause();  return }
    if (isPaused)   { resume(); return }
  }

  return (
    <div className="glass-card p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
          <FiVolume2 className="text-purple-400" size={16} />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">Audio Readout</p>
          <p className="text-slate-400 text-xs">Listen to your prescription instructions</p>
        </div>

        {/* Playing indicator */}
        {isPlaying && (
          <div className="ml-auto flex items-center gap-1">
            {[0, 0.2, 0.1].map((delay, i) => (
              <motion.div
                key={i}
                className="w-1 bg-purple-400 rounded-full"
                animate={{ height: ['8px', '20px', '8px'] }}
                transition={{ duration: 0.6, repeat: Infinity, delay }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-3 mb-5">
        {/* Play/Pause */}
        <motion.button
          onClick={handlePlayPause}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
          aria-label={isPlaying ? 'Pause audio' : isPaused ? 'Resume audio' : 'Play audio'}
        >
          {isPlaying
            ? <><FiPause size={16} /> Pause</>
            : isPaused
              ? <><FiPlay size={16} /> Resume</>
              : <><FiPlay size={16} /> Play</>
          }
        </motion.button>

        {/* Stop */}
        <button
          onClick={stop}
          disabled={!isPlaying && !isPaused}
          className="flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          aria-label="Stop audio"
        >
          <FiSquare size={14} /> Stop
        </button>
      </div>

      {/* Settings row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Speed selector */}
        <div>
          <label className="text-xs text-slate-400 font-medium mb-1.5 block">Reading Speed</label>
          <select
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded-xl focus:outline-none focus:border-purple-400/50 transition-colors"
          >
            {SPEED_OPTIONS.map((s) => (
              <option key={s} value={s} className="bg-slate-800">
                {s === 1 ? 'Normal' : `${s}x`}
              </option>
            ))}
          </select>
        </div>

        {/* Voice language selector */}
        <div>
          <label className="text-xs text-slate-400 font-medium mb-1.5 block">Voice Language</label>
          <select
            value={voiceLang}
            onChange={(e) => setVoiceLang(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded-xl focus:outline-none focus:border-purple-400/50 transition-colors"
          >
            {VOICE_LANG_OPTIONS.map((v) => (
              <option key={v.value} value={v.value} className="bg-slate-800">{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-slate-500 text-xs mt-3">
        * Audio availability depends on your browser's text-to-speech support.
      </p>
    </div>
  )
}

export default AudioPlayer