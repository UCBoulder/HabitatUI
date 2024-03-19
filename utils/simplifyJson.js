export const simplifyJson = (input) => {
  const result = {}

  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const value = input[key]

      if (key === 'coords' && value.M) {
        // Parse the nested coordinates object
        const coordsObj = {}
        for (const coordKey in value.M) {
          if (Object.prototype.hasOwnProperty.call(value.M, coordKey)) {
            coordsObj[coordKey] = value.M[coordKey].N || value.M[coordKey].S
          }
        }
        result[key] = coordsObj
      } else if (key === 'Notes' && value.M) {
        const notesObj = {}
        for (const noteKey in value.M) {
          if (Object.prototype.hasOwnProperty.call(value.M, noteKey)) {
            notesObj[noteKey] = value.M[noteKey].S
          }
        }
        result[key] = notesObj
      } else {
        result[key] = value.S || value.N || value
      }
    }
  }

  return result
}
