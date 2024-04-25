import React, { useContext, useEffect, useState } from "react"
import { format } from "date-fns"
import "../../global.css"
import { AuthContext } from "../../components/Auth/AuthProvider"

function DayView({ selectedDate }) {
  const { auth } = useContext(AuthContext)
  const [events, setEvents] = useState([])
  const [editingEventId, setEditingEventId] = useState(null)
  const [editingText, setEditingText] = useState("")

  useEffect(() => {
    const fetchEvents = async () => {
      const formattedDate = format(selectedDate, "yyyy-MM-dd")
      try {
        const response = await fetch(`/api/events/?date=${formattedDate}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
        const data = await response.json()
        if (response.ok) {
          setEvents(
            data.map((event) => ({
              id: event._id,
              hour: parseInt(event.eventTime, 10),
              event: event.eventTitle,
              place: event.place,
            }))
          )
        } else {
          throw new Error(data.message || "Failed to fetch events")
        }
      } catch (error) {
        console.error("Error fetching events:", error.message)
      }
    }

    fetchEvents()
  }, [selectedDate, auth.accessToken])

  const handleEditChange = (id) => {
    const event = events.find((e) => e.id === id)
    setEditingEventId(id)
    setEditingText(event ? event.event : "")
  }

  const saveEditingEvent = async () => {
    try {
      const response = await fetch(`/api/events/${editingEventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify({ event: editingText }),
      })
      if (response.ok) {
        setEvents((prev) =>
          prev.map((e) =>
            e.id === editingEventId ? { ...e, event: editingText } : e
          )
        )
        setEditingEventId(null)
        setEditingText("")
      } else {
        throw new Error("Failed to update event")
      }
    } catch (error) {
      console.error("Error saving event:", error.message)
    }
  }

  function showRoute() {
    const [lat, lng] = event.place.split(",")
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    window.open(url, "_blank")
  }

  return (
    <>
      <div className="dayView">
        <h2 className="selectedDate flex-gap-2">
          Selected Day: {format(selectedDate, "MMMM d, yyyy")}
        </h2>
        <ol>
          {events.length > 0 ? (
            events.map((event) => (
              <li key={event.id} className="dayViewHour">
                <div className="hourEventContainer flex text-bold gap-5">
                  <span>{event.hour}:00</span>
                  <div className="eventName prompt_card">
                    <span>{event.event}</span>
                    <div className="eventButton-container">
                      <button
                        className="eventButton"
                        onClick={() => handleEditChange(event.id)}
                      >
                        <i className="fa-solid fa-pen-to-square"> Edit</i>
                      </button>
                      <button
                        className="eventButton"
                        onClick={() =>
                          setEvents((prev) =>
                            prev.filter((e) => e.id !== event.id)
                          )
                        }
                      >
                        <i className="fa-solid fa-trash"> Delete</i>
                      </button>
                      <button className="eventButton" onClick={showRoute}>
                        <i className="fa-solid fa-map "> Route</i>
                      </button>
                      {editingEventId === event.id && (
                        <div>
                          <input
                            className="editInput"
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                          />
                          <button
                            className="saveButton"
                            onClick={saveEditingEvent}
                          >
                            <i className="fa-solid fa-save"> Save</i>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="flex flex-row justify-center">
              {" "}
              <div className="prompt-card text-bold text-primary-red rounded-5 mt-5 p-5">
                Looks like there are no events Today...
              </div>
            </div>
          )}
        </ol>
      </div>
    </>
  )
}

export default DayView

// import React, { useContext, useEffect, useState } from "react"
// import { format, set } from "date-fns"
// import DeleteButton from "../../components/ReusableComponents/Delete"
// import "../../global.css"
// import { AuthContext } from "../../components/Auth/AuthProvider"
// function DayView({ selectedDate }) {
//   const { auth } = useContext(AuthContext)

//   //replace with actual events
//   const [events, setEvents] = useState([
//     { id: "", hour: "", event: "" },
//     { id: "", hour: "", event: "" },
//     { id: "", hour: "", event: "" },
//     { id: "", hour: "", event: "" },
//   ])
//   //useState for Adding events
//   const [hourInput, setHourInput] = useState("")
//   const [eventInput, setEventInput] = useState("")
//   //useState for Editing events
//   const [editingEvent, setEditingEvent] = useState(null)
//   const [editingEventText, setEditingEventText] = useState("")
//   const handleEventChange = (e) => {
//     setEditingEvent((prevEvent) => [...prevEvent, event, e.target.value])
//   }

//   const saveEditingEvent = async () => {
//     try {
//       const response = await fetch("/api/events", editingEvent, {
//         method: "POST",
//         header: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + auth.accessToken,
//         },
//       })

//       console.log(response.data)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   // const saveEditingEvent = async () => {
//   //   try {
//   //     const response = await axios.post("/api/events", editingEvent)
//   //     console.log(response.data)
//   //   } catch (error) {
//   //     console.error(error)
//   //   }
//   // }

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
//   const fetchEvents = async () => {
//     try {
//       const formattedDate = format(selectedDate, "yyyy-MM-dd")
//       const response = await fetch(`/api/events/?date=${formattedDate}`, {
//         method: "GET",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: "Bearer " + auth.accessToken,
//         },
//       })
//       const data = await response.json()
//       const convertedEvents = data.map((event) => ({
//         id: event._id,
//         hour: Number.parseInt(event.eventTime),
//         event: event.eventTitle,
//       }))
//       console.log("2. convertedEvents....:...", convertedEvents)
//       setEvents(convertedEvents)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   useEffect(() => {
//     fetchEvents()
//   }, [selectedDate])

//   return (
//     <>
//       <div className="dayView">
//         <h2 className="selectedDate flex- gap-2">
//           Selected Day: {format(selectedDate, "MMMM, d, yyyy")}
//         </h2>
//         <ol>
//           {hours.map((hour) => (
//             <li key={hour} className="dayViewHour">
//               <div className="hourEventContainer">
//                 <span>{hour}:00</span>
//                 {events
//                   .filter((event) => event.hour === hour)
//                   .map((event) => (
//                     <div key={event.id} className="eventName">
//                       <span>
//                         {event.event}
//                         <span>{".....   "}</span>
//                       </span>

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
//       </div>
//       <div></div>
//     </>
//   )
// }

// export default DayView
