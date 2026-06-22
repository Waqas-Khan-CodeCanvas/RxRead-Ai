// /**
//  * @file gemini.service.js
//  * @description Thin, framework-independent client wrapper around the
//  *              Gemini Vision API (@google/generative-ai SDK).
//  *
//  * Responsibilities:
//  *   - Read image bytes from disk and base64-encode for Gemini
//  *   - Submit the image + prompt to Gemini Vision
//  *   - Apply timeout protection
//  *   - Apply retry with exponential backoff for transient failures
//  *   - Normalize all failure modes into AIServiceError subclasses
//  *   - Never log API keys or raw image bytes
//  *
//  * This service knows nothing about Express, req/res, or HTTP —
//  * it is pure business logic, fully unit-testable in isolation.
//  */

// import { GoogleGenerativeAI } from '@google/generative-ai'
// import fs from 'fs/promises'

// import config from '../config/app.config.js'
// import logger from '../utils/logger.js'
// import retry from '../utils/retry.js'
// import withTimeout from '../utils/withTimeout.js'
// import {
//   AITimeoutError,
//   AIRateLimitError,
//   AIRetryExhaustedError,
//   AIInvalidResponseError,
//   AINetworkError,
// } from '../errors/AIServiceError.js'

// // ── SDK client (instantiated once) ────────────────────────────────────────────

// const genAI = new GoogleGenerativeAI(config.gemini.apiKey)

// // ── Helpers ────────────────────────────────────────────────────────────────────

// /**
//  * Reads an image file from disk and returns it as a base64 string
//  * along with its MIME type, in the shape Gemini's SDK expects.
//  *
//  * @param   {string} filePath
//  * @param   {string} mimeType
//  * @returns {Promise<{inlineData: {data: string, mimeType: string}}>}
//  */
// const buildImagePart = async (filePath, mimeType) => {
//   const fileBuffer = await fs.readFile(filePath)
//   const base64Data = fileBuffer.toString('base64')

//   return {
//     inlineData: {
//       data: base64Data,
//       mimeType,
//     },
//   }
// }

// /**
//  * Classifies a raw error from the Gemini SDK / network layer into
//  * whether a retry should be attempted.
//  *
//  * Retryable: timeouts, 429 rate limits, 500/503 server errors, network errors.
//  * Not retryable: 400 bad request, 401/403 auth errors, invalid API key.
//  *
//  * @param {Error} error
//  * @returns {boolean}
//  */
// const isRetryableError = (error) => {
//   // Our own timeout error — retryable (transient by nature)
//   if (error instanceof AITimeoutError) return true

//   // Gemini SDK errors often carry a `status` or `statusCode` from the HTTP layer
//   const status = error.status || error.statusCode

//   if (status === 429) return true // rate limit
//   if (status >= 500 && status < 600) return true // server-side transient error

//   // Generic network-level failures (no response received at all)
//   if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.code === 'ENOTFOUND') {
//     return true
//   }

//   return false
// }

// /**
//  * Maps a raw error into the appropriate AIServiceError subclass
//  * for consistent API responses.
//  *
//  * @param {Error} error
//  * @returns {ApiError}
//  */
// const normalizeGeminiError = (error) => {
//   if (error instanceof AITimeoutError) return error

//   const status = error.status || error.statusCode

//   if (status === 429) {
//     return new AIRateLimitError()
//   }

//   if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT' || error.code === 'ENOTFOUND') {
//     return new AINetworkError()
//   }

//   if (status >= 500) {
//     return new AINetworkError('AI service is temporarily unavailable. Please try again shortly.')
//   }

//   // Fallback: treat as an invalid/unexpected response from the AI layer
//   return new AIInvalidResponseError(error.message || 'Unexpected AI service error.')
// }

// // ── Core: single Gemini call (no retry/timeout — composed by caller) ──────────

// /**
//  * Performs a single, unwrapped call to Gemini Vision with an image + prompt.
//  *
//  * @param   {string} imagePath
//  * @param   {string} mimeType
//  * @param   {string} promptText
//  * @returns {Promise<string>} - Raw text response from Gemini
//  */
// const callGeminiVision = async (imagePath, mimeType, promptText) => {
//   const model = genAI.getGenerativeModel({ model: config.gemini.model })

//   const imagePart = await buildImagePart(imagePath, mimeType)

//   const result = await model.generateContent([promptText, imagePart])
//   const response = result.response
//   const text = response.text()

//   if (!text || text.trim().length === 0) {
//     throw new AIInvalidResponseError('AI service returned an empty response.')
//   }

//   return text
// }

// // ── Public: analyze image with timeout + retry ────────────────────────────────

// /**
//  * Analyzes a prescription image using Gemini Vision, with timeout
//  * protection and exponential-backoff retry for transient failures.
//  *
//  * @param   {string} imagePath  - Absolute or relative path to the image on disk
//  * @param   {string} mimeType   - MIME type of the image (image/jpeg, image/png, image/webp)
//  * @param   {string} promptText - Instruction prompt to send alongside the image
//  * @returns {Promise<string>}   - Raw text output from Gemini
//  */
// const analyzeImageWithGemini = async (imagePath, mimeType, promptText) => {
//   const startTime = Date.now()

//   logger.info('Submitting prescription image to Gemini Vision', {
//     model:    config.gemini.model,
//     mimeType,
//     timeoutMs: config.gemini.timeoutMs,
//   })

//   try {
//     const rawOutput = await retry(
//       () =>
//         withTimeout(
//           callGeminiVision(imagePath, mimeType, promptText),
//           config.gemini.timeoutMs,
//           () => new AITimeoutError(`Gemini request timed out after ${config.gemini.timeoutMs}ms`),
//         ),
//       {
//         maxRetries:  config.gemini.maxRetries,
//         baseDelayMs: 500,
//         isRetryable: isRetryableError,
//         onRetry: (attempt, error, delayMs) => {
//           logger.warn('Retrying Gemini request after transient failure', {
//             attempt,
//             maxRetries: config.gemini.maxRetries,
//             delayMs,
//             errorType: error.name,
//             errorMessage: error.message,
//           })
//         },
//       },
//     )

//     const durationMs = Date.now() - startTime
//     logger.info('Gemini Vision analysis completed successfully', {
//       durationMs,
//       outputLength: rawOutput.length,
//     })

//     return rawOutput
//   } catch (error) {
//     const durationMs = Date.now() - startTime

//     // If retries were exhausted, the last error bubbles up here
//     const normalizedError = normalizeGeminiError(error)

//     logger.error('Gemini Vision analysis failed', {
//       durationMs,
//       errorType: normalizedError.name,
//       errorMessage: normalizedError.message,
//     })

//     // Distinguish "ran out of retries" from a single non-retryable failure
//     if (isRetryableError(error)) {
//       throw new AIRetryExhaustedError()
//     }

//     throw normalizedError
//   }
// }

// export { analyzeImageWithGemini }








/**
 * @file gemini.service.js
 * @description REST-based Gemini Vision client (v1 API)
 *              Replaces SDK to avoid v1beta routing issues.
 */

import fs from 'fs/promises'
import config from '../config/app.config.js'
import logger from '../utils/logger.js'
import retry from '../utils/retry.js'
import withTimeout from '../utils/withTimeout.js'

import {
  AITimeoutError,
  AIRetryExhaustedError,
  AIInvalidResponseError,
  AINetworkError,
} from '../errors/AIServiceError.js'

// ── Build image payload ───────────────────────────────────────────────────────

const buildImageBase64 = async (filePath) => {
  const fileBuffer = await fs.readFile(filePath)
  return fileBuffer.toString('base64')
}

// ── Error classification ───────────────────────────────────────────────────────

const isRetryableError = (error) => {
  if (error instanceof AITimeoutError) return true

  const status = error.status || error.statusCode

  if (status === 429) return true
  if (status >= 500 && status < 600) return true

  if (
    error.code === 'ECONNRESET' ||
    error.code === 'ETIMEDOUT' ||
    error.code === 'ENOTFOUND'
  ) {
    return true
  }

  return false
}

// ── Normalize errors ───────────────────────────────────────────────────────────

const normalizeGeminiError = (error) => {
  if (error instanceof AITimeoutError) return error

  const status = error.status || error.statusCode

  if (status === 429) {
    return new AINetworkError('Rate limited by AI service.')
  }

  if (
    error.code === 'ECONNRESET' ||
    error.code === 'ETIMEDOUT' ||
    error.code === 'ENOTFOUND'
  ) {
    return new AINetworkError('Network error while reaching AI service.')
  }

  if (status >= 500) {
    return new AINetworkError('AI service temporarily unavailable.')
  }

  return new AIInvalidResponseError(
    error.message || 'Unexpected AI response error.'
  )
}

// ── CORE GEMINI CALL (REST API v1) ─────────────────────────────────────────────

const callGeminiVision = async (imagePath, mimeType, promptText) => {
  const base64Image = await buildImageBase64(imagePath)

  const response = await fetch(
    // `https://generativelanguage.googleapis.com/v1beta/models/${config.gemini.model}:generateContent?key=${config.gemini.apiKey}`,
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${config.gemini.apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: promptText },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: base64Image,
                },
              },
            ],
          },
        ],
      }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    const err = new Error(data?.error?.message || 'Gemini API error')
    err.status = response.status
    throw err
  }

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text || text.trim().length === 0) {
    throw new AIInvalidResponseError('Empty response from Gemini')
  }

  return text
}

// ── Public API ────────────────────────────────────────────────────────────────

const analyzeImageWithGemini = async (imagePath, mimeType, promptText) => {
  const startTime = Date.now()

  logger.info('Submitting prescription image to Gemini Vision (REST v1)', {
    model: config.gemini.model,
    mimeType,
    timeoutMs: config.gemini.timeoutMs,
  })

  try {
    const rawOutput = await retry(
      () =>
        withTimeout(
          callGeminiVision(imagePath, mimeType, promptText),
          config.gemini.timeoutMs,
          () =>
            new AITimeoutError(
              `Gemini timeout after ${config.gemini.timeoutMs}ms`
            )
        ),
      {
        maxRetries: config.gemini.maxRetries,
        baseDelayMs: 2000,
        isRetryable: isRetryableError,
        onRetry: (attempt, error, delayMs) => {
          logger.warn('Retrying Gemini request', {
            attempt,
            delayMs,
            error: error.message,
          })
        },
      }
    )

    const durationMs = Date.now() - startTime

    logger.info('Gemini Vision success', {
      durationMs,
      outputLength: rawOutput.length,
    })

    return rawOutput
  } catch (error) {
    const durationMs = Date.now() - startTime

    const normalizedError = normalizeGeminiError(error)

    logger.error('Gemini Vision failed', {
      durationMs,
      errorType: normalizedError.name,
      errorMessage: normalizedError.message,
    })

    if (isRetryableError(error)) {
      throw new AIRetryExhaustedError()
    }

    throw normalizedError
  }
}

export { analyzeImageWithGemini }