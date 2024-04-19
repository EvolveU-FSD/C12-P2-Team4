import React, { useState } from "react"
import axios from "axios"
import { format } from "date-fns"
import DeleteButton from "../../components/ReusableComponents/Delete"
import "../../global.css"
function DayView({ selectedDate }) {
  //replace with actual events
  const [events, setEvents] = useState([
    { id: 1, hour: 9, event: "Meeting with team" },
    { id: 2, hour: 14, event: "Project presentation" },
    // Add more events as needed
  ])
  const [editingEvent, setEditingEvent] = useState(null)
  const [editingEventText, setEditingEventText] = useState("")
  const handleEventChange = (e) => {
    setEditingEvent((prevEvent) => [...prevEvent, event, e.target.value])
  }

  const saveEditingEvent = async () => {
    try {
      const response = await axios.post("/api/events", editingEvent)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const hours = []
  for (let i = 0; i < 24; i++) {
    hours.push(i)
  }

  const addEvent = (hour, event) => {
    const newEvent = { id: Date.now(), hour, event }
    setEvents((prevEvents) => [...prevEvents, newEvent])
  }

  const editEvent = (id, updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === id ? updatedEvent : event))
    )
    setEditingEvent(null)
  }

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id))
  }

  return (
    <>
      <div className="dayView">
        <h2 className="selectedDate flex- gap-2">
          Current Day: {format(selectedDate, "MMMM, d, yyyy")}
        </h2>
        <ol>
          {hours.map((hour) => (
            <li key={hour} className="dayView">
              <div className="hourEventContainer">
                <span>{hour}:00</span>
                {events
                  .filter((event) => event.hour === hour)
                  .map((event) => (
                    <div key={event.id}>
                      <span>{event.event}</span>
                      <button
                        className="eventButton"
                        onClick={() => deleteEvent(event.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="eventButton"
                        onClick={() => setEditingEvent(event)}
                      >
                        <i className="fa-solid fa-pen-to-square">Edit</i>
                      </button>
                      {editingEvent === event && (
                        <div>
                          <input
                            type="text"
                            value={editingEventText}
                            onChange={(e) =>
                              setEditingEventText(e.target.value)
                            }
                          />
                          <button
                            type="submit"
                            onClick={() => {
                              editEvent(editingEvent.id, editingEvent)
                              saveEditingEvent()
                              setEditingEvent(null)
                              setEditingEventText("")
                            }}
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </li>
          ))}
        </ol>
        {/* Add form for adding events */}
      </div>
    </>
  )
}

export default DayView
