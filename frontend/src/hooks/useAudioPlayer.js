import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Hook for browser Speech Synthesis API (text-to-speech).
 */
const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying]   = useState(false)
  const [isPaused,  setIsPaused]    = useState(false)
  const [rate,      setRate]        = useState(1)
  const [voiceLang, setVoiceLang]   = useState('en-US')
  const [voices,    setVoices]      = useState([])
  const utteranceRef = useRef(null)

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices()
      setVoices(available)
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
    return () => { window.speechSynthesis.onvoiceschanged = null }
  }, [])

  const play = useCallback((text) => {
    if (!text) return

    // Cancel any current speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate
    utterance.lang = voiceLang

    // Try to find a matching voice
    const matched = voices.find((v) => v.lang.startsWith(voiceLang.split('-')[0]))
    if (matched) utterance.voice = matched

    utterance.onstart  = () => { setIsPlaying(true);  setIsPaused(false) }
    utterance.onend    = () => { setIsPlaying(false); setIsPaused(false) }
    utterance.onerror  = () => { setIsPlaying(false); setIsPaused(false) }
    utterance.onpause  = () => setIsPaused(true)
    utterance.onresume = () => setIsPaused(false)

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [rate, voiceLang, voices])

  const pause = useCallback(() => {
    window.speechSynthesis.pause()
    setIsPaused(true)
  }, [])

  const resume = useCallback(() => {
    window.speechSynthesis.resume()
    setIsPaused(false)
  }, [])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => window.speechSynthesis.cancel()
  }, [])

  return {
    isPlaying, isPaused, rate, setRate,
    voiceLang, setVoiceLang, voices,
    play, pause, resume, stop,
  }
}

export default useAudioPlayer