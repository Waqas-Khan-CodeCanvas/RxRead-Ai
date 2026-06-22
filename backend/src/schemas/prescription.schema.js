/**
 * @file prescription.schema.js
 * @description Zod validation schemas for structured prescription data.
 *
 * Single source of truth for the shape of a "Medicine" and a "Prescription".
 * Used by:
 *   - prescription.parser.js (validating normalized AI output)
 *   - prescription.model.js  (keeping Mongoose schema in sync conceptually)
 *
 * Design notes:
 *   - Fields that are commonly missing from imperfect AI output are optional
 *     with safe defaults, so a partially-correct reading can still pass
 *     validation rather than being rejected outright (handled in the parser's
 *     recovery layer).
 *   - confidenceScore is NOT required from the AI — it is computed/validated
 *     separately by confidenceScorer.js and merged in before final validation.
 */

import { z } from 'zod'

// ── Medicine schema ────────────────────────────────────────────────────────────

export const medicineSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Medicine name cannot be empty'),

  dosage: z
    .string()
    .trim()
    .default('Not specified'),

  frequency: z
    .string()
    .trim()
    .default('Not specified'),

  duration: z
    .string()
    .trim()
    .default('Not specified'),

  instructions: z
    .string()
    .trim()
    .default(''),
})

// ── Prescription schema ───────────────────────────────────────────────────────

export const prescriptionSchema = z.object({
  doctorName: z
    .string()
    .trim()
    .default('Unknown'),

  medicines: z
    .array(medicineSchema)
    .default([]),

  warnings: z
    .array(z.string().trim())
    .default([]),

  confidenceScore: z
    .number()
    .min(0, 'Confidence score cannot be below 0.0')
    .max(1, 'Confidence score cannot exceed 1.0')
    .default(0),
})

/**
 * Looser schema used for the FIRST validation pass before confidence
 * scoring is computed. confidenceScore is fully optional here because
 * the AI may not provide one — confidenceScorer.js fills it in afterward.
 */
export const prescriptionPreScoreSchema = prescriptionSchema.omit({ confidenceScore: true }).extend({
  confidenceScore: z.number().min(0).max(1).optional(),
})