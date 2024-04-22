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
  return (
    <div className="addEvent">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addEvent(hourInput, eventInput);
          setHourInput("");
          setEventInput("");
        }}
      >
        <input
          type="number"
          min="1"
          max="24"
          value={hourInput}
          onChange={(e) => setHourInput(e.target.value)}
          placeholder="Hour"
        />
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
