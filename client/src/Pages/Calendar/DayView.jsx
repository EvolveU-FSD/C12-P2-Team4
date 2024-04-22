import React, { useState, useEffect } from "react"
import axios from "axios"
import { format } from "date-fns"
import DeleteButton from "../../components/ReusableComponents/Delete"

import "../../global.css"

function DayView({ selectedDate }) {
  const [events, setEvents] = useState([])
  const [editingEvent, setEditingEvent] = useState(null)
  const [editingEventText, setEditingEventText] = useState([
    { id: "1", hour: 10, event: "Meeting", date: "2024-04-21T10:00:00.000Z" },
    {
      id: "2",
      hour: 14,
      event: "Doctor Appointment",
      date: "2024-04-21T14:00:00.000Z",
    },
  ])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `/api/events?date=${format(selectedDate, "yyyy-MM-dd")}`
        )
        setEvents(response.data || [])
      } catch (error) {
        console.error("Failed to fetch events:", error)
      }
    }

    fetchEvents()
  }, [selectedDate])

  const addEvent = async (hour, eventText) => {
    const newEvent = { id: Date.now(), hour, event: eventText }
    try {
      const response = await axios.post("/api/events", newEvent)
      setEvents((prevEvents) => [...prevEvents, response.data])
    } catch (error) {
      console.error("Failed to add event:", error)
    }
  }

  const editEvent = async (id, updatedEventText) => {
    const updatedEvent = { ...editingEvent, event: updatedEventText }
    try {
      await axios.put(`/api/events/${id}`, updatedEvent)
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === id ? updatedEvent : event))
      )
    } catch (error) {
      console.error("Failed to update event:", error)
    }
    setEditingEvent(null)
    setEditingEventText("")
  }

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`/api/events/${id}`)
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id))
    } catch (error) {
      console.error("Failed to delete event:", error)
    }
  }

  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <>
      <div className="dayView">
        <h2 className="selectedDate flex-gap-2">
          Selected Day: {format(selectedDate, "MMMM d, yyyy")}
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
                        onClick={() => {
                          setEditingEvent(event)
                          setEditingEventText(event.event)
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square">Edit</i>
                      </button>
                      {editingEvent === event && (
                        <div>
                          <input
                            className="editInput"
                            type="text"
                            value={editingEventText}
                            onChange={(e) =>
                              setEditingEventText(e.target.value)
                            }
                          />
                          <button
                            className="saveButton"
                            type="submit"
                            onClick={() =>
                              editEvent(editingEvent.id, editingEventText)
                            }
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

// import React, { useState } from "react"
// import axios from "axios"
// import { format } from "date-fns"
// import DeleteButton from "../../components/ReusableComponents/Delete"
// import "../../global.css"

// function DayView({ selectedDate }) {
//   const [events, setEvents] = useState([
//     { id: 1, hour: "", event: "" },
//     { id: 2, hour: "", event: "" },
//   ])
//   const [editingEvent, setEditingEvent] = useState(null)
//   const [editingEventText, setEditingEventText] = useState("")
//   const handleEventChange = (e) => {
//     setEditingEvent((prevEvent) => [...prevEvent, event, e.target.value])
//   }

//   const saveEditingEvent = async () => {
//     try {
//       const response = await axios.post("/api/events", editingEvent)
//       console.log(response.data)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const hours = []
//   for (let i = 0; i < 24; i++) {
//     hours.push(i)
//   }

//   const addEvent = (hour, event) => {
//     const newEvent = { id: Date.now(), hour, event }
//     setEvents((prevEvents) => [...prevEvents, newEvent])
//   }

//   const editEvent = (id, updatedEvent) => {
//     setEvents((prevEvents) =>
//       prevEvents.map((event) => (event.id === id ? updatedEvent : event))
//     )
//     setEditingEvent(null)
//   }

//   const deleteEvent = (id) => {
//     setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id))
//   }

//   return (
//     <>
//       <div className="dayView">
//         <h2 className="selectedDate flex- gap-2">
//           Selected Day: {format(selectedDate, "MMMM, d, yyyy")}
//         </h2>
//         <ol>
//           {hours.map((hour) => (
//             <li key={hour} className="dayView">
//               <div className="hourEventContainer">
//                 <span>{hour}:00</span>
//                 {events
//                   .filter((event) => event.hour === hour)
//                   .map((event) => (
//                     <div key={event.id}>
//                       <span>{event.event}</span>
//                       <button
//                         className="eventButton"
//                         onClick={() => deleteEvent(event.id)}
//                       >
//                         Delete
//                       </button>

//                       <button
//                         className="eventButton"
//                         onClick={() => setEditingEvent(event)}
//                       >
//                         <i className="fa-solid fa-pen-to-square">Edit</i>
//                       </button>

//                       {editingEvent === event && (
//                         <div>
//                           <input
//                             className="editInput"
//                             type="text"
//                             value={editingEventText}
//                             onChange={(e) =>
//                               setEditingEventText(e.target.value)
//                             }
//                           />
//                           <button
//                             className="saveButton"
//                             type="submit"
//                             onClick={() => {
//                               editEvent(editingEvent.id, editingEvent)
//                               saveEditingEvent()
//                               setEditingEvent(null)
//                               setEditingEventText("")
//                             }}
//                           >
//                             Save
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             </li>
//           ))}
//         </ol>
//         {/* Add form for adding events */}
//       </div>
//     </>
//   )
// }

// export default DayView
