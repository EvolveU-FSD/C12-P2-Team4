fetch("/api/dayevent/SomeEventTitle")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching data:", error))

// app.get("/api/dayevent/:eventTitle", async (req, res) => {
//   try {
//     // Using the model function to find one document by title
//     const event = await DayEvent.findOne({
//       eventTitle: req.params.eventTitle,
//     }).populate("user")
//     if (!event) {
//       return res.status(404).send("Event not found.")
//     }

//     console.log("Event details from api/dayevent: ", event)
//     const { user, date, day, eventTime, eventTitle, place } = event

//     // Simplify 'day' to a more readable format if it's a Date object
//     const simplifiedDay = day.toDateString() // This assumes 'day' is a Date object

//     res
//       .status(200)
//       .send({ user, date, day: simplifiedDay, eventTime, eventTitle, place })
//   } catch (error) {
//     console.log("Error in dayEvent endpoint: ", error)
//     res.status(500).send("An error occurred while retrieving the event.")
//   }
// })
