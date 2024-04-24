import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "../Auth/AuthProvider"
import processInput from "../../../../server/controllers/processInput"
import { ToastContainer, toast } from "react-toastify"
import { css } from "glamor"
import "react-toastify/dist/ReactToastify.css"
import "../ItineraryCard/ItineraryCard.css"
import "../../global.css"

function Events() {
  const { auth } = useContext(AuthContext)
  console.log("1. Printing itinerary auth value:......:.. ", auth)

  const [eventData, setEventData] = useState({
    date: "",
    username: "",
    eventTime: "",
    eventTitle: "",
    place: "",
    description: "",
  })
  const [loadError, setLoadError] = useState(null)

  const clearFields = () => {
    setLoadError(null)
  }

  const handleEventCreation = async (event) => {
    event.preventDefault()
    if (!auth || !auth.accessToken) {
      toast.error("Sign In or Sign Up to continue....")
      return
    }
    try {
      const response = await fetch("/api/dayevent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
        body: JSON.stringify({
          ...eventData,
          eventTitle: eventData.eventTitle,
          email: eventData.email,
        }),
      })
      if (!response.ok) {
        toast.error("Cannot submit event with missing fields...")
      }
      toast.success(
        "Event Saved to Planner Successfully!!",
        await response.json()
      )
      clearFields()
    } catch (error) {
      setLoadError(error.message)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEventData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <div className="event-container  flex  m-4 gap-2 p-2.5">
        {loadError && (
          <div className="error">
            {toast.error("Complete form to continue...")}
          </div>
        )}
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
            className="bg-secondary-gold text-primary-night flex justify-end w-full"
            type="date"
            id="date"
            name="date"
            required
            value={eventData.date}
            onChange={handleInputChange}
          />
          <label htmlFor="eventTime">Event Time:</label>
          <input
            className="flex justify-end bg-secondary-gold text-primary-night w-full"
            type="time"
            id="eventTime"
            name="eventTime"
            required
            value={eventData.eventTime}
            onChange={handleInputChange}
          />
          <label htmlFor="place">Place:</label>
          <input
            className="flex justify-center bg-[#e43535] text-primary-night"
            type="text"
            id="place"
            name="place"
            required
            value={eventData.place}
            onChange={handleInputChange}
          />
          <label htmlFor="username">Username:</label>
          <input
            className="flex justify-center  bg-primary-white text-primary-night"
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
      <ToastContainer
        className="toast-container"
        toastClassName="dark-toast"
        progressClassName={css({
          height: "2px",
        })}
      />
    </>
  )
}

export default Events
