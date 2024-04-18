import React from "react";

function DayView() {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }

  return (
    <div>
      <h2>Day View</h2>
      <ol>
        {hours.map((hour) => (
          <li key={hour}>{hour}:00</li>
        ))}
      </ol>
    </div>
  );
}
export default DayView;
