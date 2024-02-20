export const simplifyJson = (input) => {
  const result = {}

  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const value = input[key]

      if ((key === 'Notes' || key === 'coords') && value.S) {
        // Parse the inner JSON string if present
        const nestedJsonStr = value.S
        const nestedJson = JSON.parse(nestedJsonStr)

        // Assign the parsed nested JSON to the result
        result[key] = nestedJson
      } else {
        result[key] = value.S || value.N || value
      }
    }
  }

  return result
}
