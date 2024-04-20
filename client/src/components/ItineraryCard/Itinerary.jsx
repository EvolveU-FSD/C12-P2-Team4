import React, { useContext, useState } from "react"
import { AuthContext } from "../Auth/AuthProvider"
import "../SignIn/signin.css"

function Itinerary() {
  const { auth } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [eventData, setEventData] = useState({
    date: "",
    day: "",
    eventTime: "",
    eventTitle: "",
    place: "",
  })
  const [loadError, setLoadError] = useState(null)

  const closeModal = () => {
    setModalType(null)
    setShowModal(false)
    setLoadError(null)
  }

  const handleEventCreation = async (event) => {
    event.preventDefault()
    if (!auth || !auth.accessToken) {
      setModalType("signin")
      setShowModal(true)
      return
    }
    try {
      const response = await fetch("/api/dayevent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...eventData, user: auth.user }),
      })
      if (!response.ok) {
        throw new Error("Event creation failed...")
      }
      console.log("Event created successfully:", await response.json())
      closeModal()
    } catch (error) {
      console.error("Event creation error:", error)
      setLoadError(error.message)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEventData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <button className="eventButton" onClick={handleEventCreation}>
        <i className="fa-solid fa-pen-to-square">Add Event</i>
      </button>
      {showModal && modalType === "signin" && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {loadError && <div className="error">{loadError}</div>}
            {/* Authentication form should be here */}
          </div>
        </div>
      )}
      <div className="event-container">
        {loadError && <div className="error">{loadError}</div>}
        <form onSubmit={handleEventCreation}>
          <label htmlFor="eventTitle">Event Title:</label>
          <input
            type="text"
            id="eventTitle"
            name="eventTitle"
            required
            minLength="3"
            maxLength="100"
            value={eventData.eventTitle}
            onChange={handleInputChange}
          />
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={eventData.date}
            onChange={handleInputChange}
          />
          {/* Additional fields like time, day, place */}
          <button type="submit">Create Event</button>
        </form>
      </div>
    </>
  )
}

export default Itinerary
