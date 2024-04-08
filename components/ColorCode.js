export const ColorCode = (rating) => {
  // No=0, Default=1, Yes=2, Maybe=3
  // yes
  if (rating === '2') {
    return '#98bd55'
  }
  // no
  else if (rating === '0') {
    return '#b50404'
  }
  // default
  else if (rating === '1') {
    return '#15588f'
  }
  // maybe
  else if (rating === '3') {
    return '#f6fa00'
  } else {
    return null
  }
}
