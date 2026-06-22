/**
 * @file prescription.prompt.js
 * @description Centralized prompt template for prescription analysis.
 *
 * [Sprint 3 UPDATE] Now instructs Gemini to respond with strict JSON
 * matching the canonical prescription shape, since Sprint 3 introduces
 * structured extraction. The schema requested here mirrors
 * schemas/prescription.schema.js so normalization has minimal work to do.
 */

/**
 * Builds the instruction prompt sent alongside the prescription image.
 *
 * @returns {string}
 */
const buildPrescriptionAnalysisPrompt = () => {
  return `You are a medical assistant AI helping a patient understand a handwritten doctor's prescription.

Carefully read the prescription image provided and extract the information into STRICT JSON matching exactly this shape:

{
  "doctorName": "string - the doctor's full name, or \"Unknown\" if not visible",
  "medicines": [
    {
      "name": "string - medicine name",
      "dosage": "string - e.g. 500mg",
      "frequency": "string - e.g. Twice daily",
      "duration": "string - e.g. 7 days",
      "instructions": "string - how to take it, e.g. Take after meals"
    }
  ],
  "warnings": ["string - any warnings or special notes the doctor wrote"],
  "confidenceScore": "number between 0.0 and 1.0 representing how confident you are in this reading"
}

Rules:
- Respond with ONLY the JSON object. Do not include markdown code fences, explanations, or any text before or after the JSON.
- If a field is not visible or legible in the image, use "Not specified" for medicine fields or "Unknown" for the doctor name. Do not invent information.
- If no medicines can be identified, return an empty array for "medicines".
- Base "confidenceScore" honestly on how legible and complete the handwriting is — lower it if parts of the prescription are unclear.
- Ensure the output is valid, parseable JSON with no trailing commas or comments.`
}

export { buildPrescriptionAnalysisPrompt }