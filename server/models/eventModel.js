import mongoose from "mongoose"
await mongoose.connect("mongodb://localhost:27017/equinox")

const Schema = mongoose.Schema

// Define a Mongoose schema for itinerary
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
  title: {
    type: String,
    required: [true, "Locationd name required"],
  },
  description: {
    type: String,
    required: [true, "Enter a description"],
  },
})

const Event = mongoose.model("event", eventSchema)

export async function getAllItinerarys() {
  return await Event.find()
}

export async function getItineraryById(id) {
  return await Event.findById(id)
}

export async function deleteItinerary(id) {
  await Event.findByIdAndDelete(id)
}

export async function addEvent(newEventData) {
  const created = new Event(newItineraryData)
  await created.save()
  return created
}

export default Event
