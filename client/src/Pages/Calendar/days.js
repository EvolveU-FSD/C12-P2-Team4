export default function generateCalendarDays(year) {
  const months = Array.from({ length: 12 }, (_, month) => {
    const numberOfDays = new Date(year, month + 1, 0).getDate()
    return Array.from({ length: numberOfDays }, (_, day) => {
      return new Date(year, month, day + 1)
    })
  })
  return months
}
