/**
 * Formats a date string to a readable format.
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

/**
 * Returns a Tailwind color class based on medicine color key.
 */
export const getMedicineColorClasses = (color) => {
  const map = {
    blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/30',   text: 'text-blue-400',   badge: 'bg-blue-500/20 text-blue-300'   },
    green:  { bg: 'bg-green-500/10',  border: 'border-green-500/30',  text: 'text-green-400',  badge: 'bg-green-500/20 text-green-300'  },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-300' },
    red:    { bg: 'bg-red-500/10',    border: 'border-red-500/30',    text: 'text-red-400',    badge: 'bg-red-500/20 text-red-300'      },
    teal:   { bg: 'bg-teal-500/10',   border: 'border-teal-500/30',   text: 'text-teal-400',   badge: 'bg-teal-500/20 text-teal-300'    },
  }
  return map[color] || map.blue
}

/**
 * Validates image file for upload.
 */
export const validateImageFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const maxSizeMB = 10

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload a JPEG, PNG, or WebP image.' }
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    return { valid: false, error: `Image must be smaller than ${maxSizeMB}MB.` }
  }
  return { valid: true, error: null }
}

/**
 * Converts a file to a base64 data URL for preview.
 */
export const fileToDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload  = (e) => resolve(e.target.result)
    reader.onerror = ()  => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Gets a greeting based on time of day.
 */
export const getTimeGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

/**
 * Truncates text to a given length.
 */
export const truncate = (text, length = 100) => {
  if (!text || text.length <= length) return text
  return text.slice(0, length) + '...'
}