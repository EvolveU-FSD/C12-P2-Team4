import mongoose from "mongoose"
await mongoose.connect("mongodb://localhost:27017/equinox")

const Schema = mongoose.Schema

// Define a Mongoose schema for event
const eventSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, "Date is required"],
  },

  eventTime: {
    type: String,
    required: true,
  },
  eventTitle: {
    type: String,
    required: [true, "Event name is required"],
  },
  place: {
    type: String,
    required: [true, "Please select a destination"],
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Enter a description"],
  },
})

const Event = mongoose.model("event", eventSchema)

export async function getAllEvents() {
  return await Event.find()
}

export async function getEventById(eventId) {
  return await Event.findById(eventId)
    .populate({
      path: "user",
      select: "email _id -username",
    })
    .exec((err, event) => {
      if (err) {
        console.error("Error fetching event with user data....:...", err)
      } else {
        console.log("Event with populated user:.....: ", event)
      }
    })
}

export async function deleteEvent(id) {
  await Event.findByIdAndDelete(id)
}

export async function addEvent(newEventData) {
  const created = new Event(newEventData)
  await created.save()
  return created
}

//---------- DISCONNECT FROM DATABASE ----------//
//mongoose.disconnect() //

export default Event
