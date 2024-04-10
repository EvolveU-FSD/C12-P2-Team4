import generateCalendarDays from "./days"
import PropTypes from "prop-types"

export default function Calendar({ year }) {
  const calendarDays = generateCalendarDays(year)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <div>
      {calendarDays.map((month, index) => (
        <div key={index}>
          <h3>Month {monthNames[index]}</h3>
          <ul>
            {month.map((day, dayIndex) => (
              <li key={dayIndex}>{day.toDateString()}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

Calendar.propTypes = {
  year: (props, propName, componentName) => {
    const year = props[propName]
    if (year && (typeof year !== "number" || year < 1900 || year > 2100)) {
      return new Error(
        `Invalid prop '${propName}' supplied to` +
          ` ${componentName}. Validation failed`
      )
    }
  },
}
