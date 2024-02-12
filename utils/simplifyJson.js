export const simplifyJson = (input) => {
  const result = {}

  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const value = input[key]

      if (key === 'coords' && value.S) {
        // Parse the inner JSON string if present
        result[key] = JSON.parse(value.S)
      } else {
        // Use the original value or the simplified string
        result[key] = value.S || value.N || value
      }
    }
  }

  return result
}
