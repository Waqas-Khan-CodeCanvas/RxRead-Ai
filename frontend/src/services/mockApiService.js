// Simulated API service — replace with real Gemini/backend calls in Phase 2
import { mockPrescriptionData } from '../data/mockData'

/**
 * Simulates uploading an image and processing a prescription.
 * Returns a promise that resolves after a realistic delay.
 */
export const analyzePrescription = (imageFile) => {
  return new Promise((resolve, reject) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic']
    if (imageFile && !allowedTypes.includes(imageFile.type)) {
      reject(new Error('Unsupported file format. Please upload a JPEG, PNG, or WebP image.'))
      return
    }

    // Simulate network + AI processing delay
    setTimeout(() => {
      resolve({
        success: true,
        data: mockPrescriptionData,
        processingTime: '4.2s',
      })
    }, 7500) // Total simulated processing time
  })
}

/**
 * Simulates fetching prescription history.
 */
export const getPrescriptionHistory = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: [mockPrescriptionData],
      })
    }, 800)
  })
}