import React, { useState } from "react";

const DateTimeModal = ({ showModal, handleClose, handleConfirm }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleConfirm(date, time);
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select Date and Time</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <button type="submit">Confirm</button>
          <button onClick={handleClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default DateTimeModal;
