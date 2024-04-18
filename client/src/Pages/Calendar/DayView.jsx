import React from "react";

function DayView() {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }

  //replace with actual events
  const events = [
    { hour: 9, event: "Meeting with team" },
    { hour: 14, event: "Project presentation" },
    // Add more events as needed
  ];

  return (
    <div>
      <h2>Day View</h2>
      <ol>
        {hours.map((hour) => (
          <li key={hour}>
            {hour}:00
            {events
              .filter((event) => event.hour === hour)
              .map((event) => (
                <div key={event.hour}>{event.event}</div>
              ))}
          </li>
        ))}
      </ol>
    </div>
  );
}
export default DayView;
