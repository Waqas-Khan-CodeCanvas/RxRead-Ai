import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingAnimation from '../components/LoadingAnimation'

const ProcessingPage = () => {
  const navigate = useNavigate()

  // If somehow someone navigates here directly without uploading, redirect
  useEffect(() => {
    const hasImage = sessionStorage.getItem('prescriptionImage')
    // Even without an image we allow it (demo mode uses mock data)
  }, [])

  const handleComplete = () => {
    navigate('/results')
  }

  return <LoadingAnimation onComplete={handleComplete} />
}

export default ProcessingPage