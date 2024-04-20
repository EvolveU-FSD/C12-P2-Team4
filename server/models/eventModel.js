import mongoose from "mongoose"
await mongoose.connect("mongodb://localhost:27017/equinox")

const Schema = mongoose.Schema

// Define a Mongoose schema for event
const eventSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, "Date is required"],
  },

  day: {
    type: Date,
    default: Date.now,
    required: [true, "Day is required"],
  },
  eventTime: {
    type: Date,
    required: [true, "Event time required"],
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

export async function getEventById(id) {
  return await Event.findById(id)
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
