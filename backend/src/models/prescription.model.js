/**
 * @file prescription.model.js
 * @description Mongoose schema for persisted prescription analysis records.
 *
 * Stores both the raw AI output (for audit/debugging) and the final
 * structured/validated prescription, decoupled from the in-flight
 * Zod schema so database documents remain stable even if the Zod
 * schema evolves in later sprints.
 */

import mongoose from 'mongoose'

const { Schema } = mongoose

// ── Sub-schema: Medicine ──────────────────────────────────────────────────────

const medicineSubSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dosage: {
      type: String,
      trim: true,
      default: 'Not specified',
    },
    frequency: {
      type: String,
      trim: true,
      default: 'Not specified',
    },
    duration: {
      type: String,
      trim: true,
      default: 'Not specified',
    },
    instructions: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { _id: false }, // Medicines are embedded — no need for their own ObjectId
)

// ── Top-level schema: Prescription ─────────────────────────────────────────────

const prescriptionSchema = new Schema(
  {
    originalFileName: {
      type: String,
      required: true,
      trim: true,
    },

    extractedPrescription: {
      doctorName: {
        type: String,
        trim: true,
        default: 'Unknown',
      },
      medicines: {
        type: [medicineSubSchema],
        default: [],
      },
      warnings: {
        type: [String],
        default: [],
      },
    },

    rawAiOutput: {
      type: String,
      required: true,
      // Not indexed — this field is for audit/debugging only, never queried directly
    },

    confidenceScore: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  },
)

// ── Indexes ────────────────────────────────────────────────────────────────────

// Most common future query pattern: "recent analyses" — supports Sprint 5 history
prescriptionSchema.index({ createdAt: -1 })

// Useful for filtering low-confidence results for review
prescriptionSchema.index({ confidenceScore: 1 })

const Prescription = mongoose.model('Prescription', prescriptionSchema)

export default Prescription