export const FormatDate = (timestamp) => {
  const compareDate = new Date()
  const date = new Date(+timestamp)
  const day = date.getDate()
  const month = date.getMonth() + 1 // zero based
  const year = date.getFullYear()

  const recent = areDatesWithin15Minutes(compareDate, date)

  const formattedDate = `${month}/${day}/${year}`
  return { formattedDate, recent }
}

const areDatesWithin15Minutes = (date1, date2) => {
  const differenceInMilliseconds = Math.abs(date1 - date2)

  // Return true if the difference is less than or equal to 15 minutes (900,000 milliseconds)
  return differenceInMilliseconds <= 9000
}
