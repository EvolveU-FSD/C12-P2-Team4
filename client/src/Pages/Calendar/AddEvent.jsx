import React, { useState } from "react";
import { format, set } from "date-fns";
import axios from "axios";

//useState for Adding events

const addEvent = (hour, event) => {
  const newEvent = { id: Date.now(), hour, event };
  setEvents((prevEvents) => [...prevEvents, newEvent]);
};
function AddEvent({ selectedDate, hour, addEvent }) {
  const [hourInput, setHourInput] = useState("");
  const [eventInput, setEventInput] = useState("");
  const [amPm, setAmPm] = useState("AM");
  return (
    <div className="addEvent">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const hour = parseInt(hourInput);
          if (isNaN(hour) || hour < 1 || hour > 12) {
            alert("Hour must be a number between 1 and 12");
            return;
          }
          addEvent(hourInput + ":00 " + amPm, eventInput);
          setHourInput("");
          setEventInput("");
          setAmPm("AM");
        }}
      >
        <input
          type="text"
          pattern="(1[0-2]|0?[1-9]):[0-5][0-9]"
          value={hourInput}
          onChange={(e) => setHourInput(e.target.value)}
          placeholder="Hour"
        />
        <select value={amPm} onChange={(e) => setAmPm(e.target.value)}>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
        <input
          type="text"
          value={eventInput}
          onChange={(e) => setEventInput(e.target.value)}
          placeholder="Event"
        />
        <button className="addButton" type="submit">
          Add Event
        </button>
      </form>
    </div>
  );
}

export default AddEvent;
