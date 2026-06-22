/**
 * @file responseNormalizer.js
 * @description Normalizes raw extracted JSON into the canonical shape
 *              expected by prescriptionSchema, before Zod validation.
 *
 * Responsibilities:
 *   - Map snake_case / alternate field names to camelCase canonical names
 *   - Normalize whitespace in strings
 *   - Ensure arrays are actually arrays (Gemini sometimes returns a
 *     single string instead of a one-item array)
 *   - Normalize each medicine entry's field names the same way
 *   - Fill missing optional fields with safe defaults handled later by Zod
 *
 * This layer NEVER throws — it always returns its best-effort normalized
 * object. Validation failures are Zod's responsibility, not this layer's.
 */

import logger from './logger.js'

// ── Field name aliasing ──────────────────────────────────────────────────────

/**
 * Maps known alternate/snake_case field names to canonical camelCase names.
 * Add new aliases here as Gemini's output drifts — single point of change.
 */
const PRESCRIPTION_FIELD_ALIASES = {
  doctor_name:   'doctorName',
  doctorname:    'doctorName',
  physician:     'doctorName',
  physician_name: 'doctorName',
  confidence_score: 'confidenceScore',
  confidence:    'confidenceScore',
}

const MEDICINE_FIELD_ALIASES = {
  medicine_name: 'name',
  drug_name:     'name',
  drugname:      'name',
  medication:    'name',
  dose:          'dosage',
  dosage_amount: 'dosage',
  freq:          'frequency',
  how_often:     'frequency',
  length:        'duration',
  duration_days: 'duration',
  notes:         'instructions',
  instruction:   'instructions',
  note:          'instructions',
}

/**
 * Renames keys on an object according to an alias map.
 * Keys not present in the alias map pass through unchanged.
 *
 * @param {object} obj
 * @param {object} aliasMap
 * @returns {object}
 */
const applyFieldAliases = (obj, aliasMap) => {
  const result = {}

  for (const [key, value] of Object.entries(obj)) {
    const normalizedKey = key.trim()
    const lowerKey = normalizedKey.toLowerCase()
    const canonicalKey = aliasMap[lowerKey] || normalizedKey
    result[canonicalKey] = value
  }

  return result
}

/**
 * Collapses repeated whitespace and trims a string.
 * Non-string values pass through unchanged.
 *
 * @param {*} value
 * @returns {*}
 */
const normalizeWhitespace = (value) => {
  if (typeof value !== 'string') return value
  return value.replace(/\s+/g, ' ').trim()
}

/**
 * Ensures a value is an array. If Gemini returned a single string
 * where an array was expected, wrap it. If null/undefined, return [].
 *
 * @param {*} value
 * @returns {Array}
 */
const ensureArray = (value) => {
  if (Array.isArray(value)) return value
  if (value === null || value === undefined || value === '') return []
  return [value]
}

// ── Medicine normalization ──────────────────────────────────────────────────────

/**
 * Normalizes a single raw medicine object into canonical shape.
 *
 * @param {object} rawMedicine
 * @returns {object}
 */
const normalizeMedicine = (rawMedicine) => {
  if (typeof rawMedicine !== 'object' || rawMedicine === null) {
    logger.warn('Skipping malformed medicine entry during normalization', {
      received: typeof rawMedicine,
    })
    return null
  }

  const aliased = applyFieldAliases(rawMedicine, MEDICINE_FIELD_ALIASES)

  return {
    name:         normalizeWhitespace(aliased.name) || '',
    dosage:       normalizeWhitespace(aliased.dosage) || 'Not specified',
    frequency:    normalizeWhitespace(aliased.frequency) || 'Not specified',
    duration:     normalizeWhitespace(aliased.duration) || 'Not specified',
    instructions: normalizeWhitespace(aliased.instructions) || '',
  }
}

// ── Top-level prescription normalization ────────────────────────────────────────

/**
 * Normalizes a raw, freshly-extracted JSON object into the canonical
 * prescription shape, ready for Zod validation.
 *
 * @param   {object} rawData - Output of jsonExtractor.extractJson()
 * @returns {object}         - Normalized object (NOT yet validated)
 */
const normalizePrescriptionResponse = (rawData) => {
  if (typeof rawData !== 'object' || rawData === null) {
    logger.warn('Normalizer received non-object input, returning empty shell')
    return { doctorName: 'Unknown', medicines: [], warnings: [], confidenceScore: undefined }
  }

  const aliased = applyFieldAliases(rawData, PRESCRIPTION_FIELD_ALIASES)

  // Normalize medicines array — filter out any entries that failed normalization
  const rawMedicines = ensureArray(aliased.medicines)
  const medicines = rawMedicines
    .map(normalizeMedicine)
    .filter((m) => m !== null && m.name.length > 0)

  if (rawMedicines.length > 0 && medicines.length < rawMedicines.length) {
    logger.warn('Some medicine entries were dropped during normalization', {
      originalCount: rawMedicines.length,
      keptCount: medicines.length,
    })
  }

  // Normalize warnings array — coerce each entry to a trimmed string
  const warnings = ensureArray(aliased.warnings)
    .map((w) => normalizeWhitespace(typeof w === 'string' ? w : String(w)))
    .filter((w) => w.length > 0)

  // confidenceScore: only carry it through if it's a valid number in [0,1]
  let confidenceScore
  if (typeof aliased.confidenceScore === 'number' && aliased.confidenceScore >= 0 && aliased.confidenceScore <= 1) {
    confidenceScore = aliased.confidenceScore
  } else if (typeof aliased.confidenceScore === 'string') {
    const parsed = parseFloat(aliased.confidenceScore)
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) confidenceScore = parsed
  }

  return {
    doctorName: normalizeWhitespace(aliased.doctorName) || 'Unknown',
    medicines,
    warnings,
    confidenceScore, // may be undefined — confidenceScorer.js handles that
  }
}

export { normalizePrescriptionResponse }