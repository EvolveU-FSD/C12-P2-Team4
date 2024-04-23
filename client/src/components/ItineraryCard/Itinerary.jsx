import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import processInput from "../../../../server/controllers/processInput";
import "./ItineraryCard.css";
import "../../global.css";

function Itinerary() {
  const { auth } = useContext(AuthContext);
  console.log("Printing itinerary auth value:......:.. ", auth);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [eventData, setEventData] = useState({
    date: "",
    username: "",
    eventTime: "",
    eventTitle: "",
    place: "",
    description: "",
  });
  const [loadError, setLoadError] = useState(null);

  const closeModal = () => {
    setModalType(null);
    setShowModal(false);
    setLoadError(null);
  };

  const handleEventCreation = async (event) => {
    event.preventDefault();
    if (!auth || !auth.accessToken) {
      setModalType("signin");
      setShowModal(true);
      return;
    }
    try {
      console.log("1. EventData: ", eventData);
      console.log("2. User:....", auth.user);

      const response = await fetch("/api/dayevent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...eventData,
          eventTitle: eventData.eventTitle,
          email: eventData.email,
        }),
      });
      if (!response.ok) {
        throw new Error("Event creation failed...");
      }
      console.log("Event created successfully:", await response.json());
      closeModal();
    } catch (error) {
      console.error("Event creation error:", error);
      setLoadError(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {showModal && modalType === "signin" && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <section className="flex w-full text-center flex-row justify-center text-primary-night">
              SignUp or SignIn to Continue...
            </section>
            {loadError && <div className="error">{loadError}</div>}
          </div>
        </div>
      )}
      <div className="event-container flex m-4 gap-2 p-2.5 bg-primary-white rounded shadow-md">
        {loadError && <div className="error">{loadError}</div>}
        <form onSubmit={handleEventCreation}>
          <label htmlFor="eventTitle">Event Title:</label>
          <input
            type="text"
            id="eventTitle"
            name="eventTitle"
            required
            maxLength="100"
            value={eventData.eventTitle}
            onChange={handleInputChange}
          />
          <label htmlFor="date">Date:</label>
          <input
            className="bg-[#F0F0F0] text-primary-night flex justify-center"
            type="date"
            id="date"
            name="date"
            required
            value={eventData.date}
            onChange={handleInputChange}
          />
          <label htmlFor="eventTime">Event Time:</label>
          <input
            className="flex justify-center bg-[#f0f0f0] text-primary-night"
            type="time"
            id="eventTime"
            name="eventTime"
            required
            value={eventData.eventTime}
            onChange={handleInputChange}
          />
          <label htmlFor="place">Place:</label>
          <input
            className="flex justify-center bg-[#f0f0f0] text-primary-night"
            type="text"
            id="place"
            name="place"
            required
            value={eventData.place}
            onChange={handleInputChange}
          />
          <label htmlFor="username">Username:</label>
          <input
            className="flex justify-center bg-[#f0f0f0] text-primary-night"
            type="text"
            id="username"
            name="username"
            required
            value={eventData.username}
            onChange={handleInputChange}
          />
          <label htmlFor="description">Description:</label>
          <input
            className="border-solid bg-primary-white  text-primary-night "
            type="string"
            id="description"
            name="description"
            required
            value={eventData.email}
            onChange={handleInputChange}
          />
          <button
            className="eventButton text-1xl justify-items-center ml-3 rounded shadow-md border border-secondary-gold bg-white text-secondary-gold hover:bg-secondary-gold hover:text-white"
            onClick={handleEventCreation}
          >
            <i className="fa-solid fa-pen-to-square text-secondary-gold bg-white hover:bg-transparent hover:text-primary-white">
              {" "}
              Create Event
            </i>
          </button>
        </form>
      </div>
    </>
  );
}

export default Itinerary;
