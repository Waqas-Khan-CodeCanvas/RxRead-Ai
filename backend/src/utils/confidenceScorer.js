/**
 * @file confidenceScorer.js
 * @description Computes or validates the confidence score for a
 *              structured prescription result.
 *
 * Rules:
 *   1. If the AI provided a valid numeric confidence in [0.0, 1.0], use it.
 *   2. Otherwise, calculate a fallback score based on field completeness
 *      across the doctor name and each medicine's fields.
 *
 * The fallback algorithm rewards presence of:
 *   - doctorName        (known vs "Unknown")
 *   - medicines present (at least one)
 *   - per-medicine: dosage, frequency, duration, instructions present
 *     (vs "Not specified" / empty placeholders)
 */

import logger from './logger.js'

const PLACEHOLDER_VALUES = new Set(['not specified', 'unknown', ''])

/**
 * Returns true if a field has a meaningful (non-placeholder) value.
 * @param {string} value
 * @returns {boolean}
 */
const isMeaningful = (value) => {
  if (typeof value !== 'string') return false
  return !PLACEHOLDER_VALUES.has(value.trim().toLowerCase())
}

/**
 * Calculates a fallback confidence score from field completeness.
 *
 * Weighting:
 *   - doctorName present:        10%
 *   - at least one medicine:     10%
 *   - per medicine field completeness (name, dosage, frequency, duration, instructions): 80%
 *     averaged across all medicines
 *
 * @param   {object} prescription - Normalized prescription object (pre-validation)
 * @returns {number}               - Score between 0.0 and 1.0
 */
const calculateFallbackConfidence = (prescription) => {
  const { doctorName, medicines } = prescription

  let score = 0

  // Doctor name presence (10%)
  if (isMeaningful(doctorName)) {
    score += 0.10
  }

  // At least one medicine present (10%)
  if (Array.isArray(medicines) && medicines.length > 0) {
    score += 0.10

    // Per-medicine field completeness (80%, averaged)
    const fieldWeights = ['name', 'dosage', 'frequency', 'duration', 'instructions']
    const perMedicineScores = medicines.map((med) => {
      const presentCount = fieldWeights.filter((field) => isMeaningful(med[field])).length
      return presentCount / fieldWeights.length
    })

    const averageMedicineCompleteness =
      perMedicineScores.reduce((sum, s) => sum + s, 0) / perMedicineScores.length

    score += averageMedicineCompleteness * 0.80
  }

  // Clamp to [0, 1] and round to 2 decimal places for clean output
  const clamped = Math.min(1, Math.max(0, score))
  return Math.round(clamped * 100) / 100
}

/**
 * Resolves the final confidence score for a prescription:
 * uses the AI-provided value if valid, otherwise computes a fallback.
 *
 * @param   {object}      prescription      - Normalized prescription (may have confidenceScore from AI)
 * @returns {number}                        - Final confidence score in [0.0, 1.0]
 */
const resolveConfidenceScore = (prescription) => {
  const aiProvided = prescription.confidenceScore

  if (typeof aiProvided === 'number' && aiProvided >= 0 && aiProvided <= 1) {
    logger.info('Using AI-provided confidence score', { confidenceScore: aiProvided })
    return aiProvided
  }

  const fallback = calculateFallbackConfidence(prescription)
  logger.info('AI did not provide a valid confidence score — calculated fallback', {
    confidenceScore: fallback,
  })

  return fallback
}

export { resolveConfidenceScore, calculateFallbackConfidence }