export const ColorCode = (rating) => {
  // No=0 Maybe=1 Yes=2 increasing level of assurity
  if (rating === '2') {
    return '#031cfc'
  } else if (rating === '0') {
    return '#f7a202'
  } else if (rating === '1') {
    return '#f3f702'
  } else {
    return null
  }
}
