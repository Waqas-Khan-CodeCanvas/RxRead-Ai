import React, { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUploadCloud, FiImage, FiX, FiCheck } from 'react-icons/fi'
import { validateImageFile, fileToDataURL } from '../utils/helpers'

const UploadZone = ({ onFileSelected }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [preview,    setPreview]    = useState(null)
  const [fileName,   setFileName]   = useState('')
  const [fileSize,   setFileSize]   = useState('')
  const [error,      setError]      = useState('')
  const inputRef = useRef(null)

  const handleFile = useCallback(async (file) => {
    setError('')
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setError(validation.error)
      return
    }
    try {
      const dataURL = await fileToDataURL(file)
      setPreview(dataURL)
      setFileName(file.name)
      setFileSize((file.size / 1024 / 1024).toFixed(2) + ' MB')
      onFileSelected(file, dataURL)
    } catch {
      setError('Failed to read the image. Please try again.')
    }
  }, [onFileSelected])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const onDragOver  = (e) => { e.preventDefault(); setIsDragging(true)  }
  const onDragLeave = ()  => setIsDragging(false)
  const onInputChange = (e) => {
    const file = e.target.files[0]
    if (file) handleFile(file)
  }

  const clearFile = () => {
    setPreview(null)
    setFileName('')
    setError('')
    onFileSelected(null, null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {preview ? (
          /* ── Preview state ── */
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card p-4 relative"
          >
            {/* Remove button */}
            <button
              onClick={clearFile}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 rounded-lg flex items-center justify-center text-red-400 transition-colors"
              aria-label="Remove image"
            >
              <FiX size={14} />
            </button>

            {/* Image preview */}
            <img
              src={preview}
              alt="Prescription preview"
              className="w-full max-h-72 object-contain rounded-xl mb-3 bg-black/20"
            />

            {/* File info */}
            <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="w-9 h-9 bg-green-500/20 rounded-lg flex items-center justify-center">
                <FiCheck className="text-green-400" size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{fileName}</p>
                <p className="text-slate-400 text-xs">{fileSize} · Ready to analyze</p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ── Drop zone ── */
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => inputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? 'border-blue-400 bg-blue-500/10 scale-[1.02]'
                : 'border-white/10 bg-white/3 hover:border-white/25 hover:bg-white/5'
            }`}
          >
            <motion.div
              animate={{ y: isDragging ? -8 : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex flex-col items-center gap-4"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isDragging ? 'bg-blue-500/20' : 'bg-white/5'
              }`}>
                {isDragging
                  ? <FiImage className="text-blue-400" size={28} />
                  : <FiUploadCloud className="text-slate-400" size={28} />
                }
              </div>
              <div>
                <p className="text-white font-semibold text-lg mb-1">
                  {isDragging ? 'Drop your prescription here' : 'Upload Prescription Image'}
                </p>
                <p className="text-slate-400 text-sm">
                  Drag & drop or{' '}
                  <span className="text-blue-400 font-medium">click to browse</span>
                </p>
                <p className="text-slate-500 text-xs mt-2">JPEG, PNG, WebP · Max 10MB</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={onInputChange}
        className="hidden"
        aria-label="Upload prescription image"
      />

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-red-400 text-sm flex items-center gap-2"
          >
            <FiX size={14} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UploadZone