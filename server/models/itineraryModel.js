import mongoose from "mongoose"
await mongoose.connect("mongodb://localhost:27017/equinox")

const Schema = mongoose.Schema

// Define a Mongoose schema for itinerary
const itinerarySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Itinerary",
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
  },
  place: {
    type: String,
    required: [true, "Please select a destination"],
  },
})

const Itinerary = mongoose.model("itinerary", itinerarySchema)

export async function getAllItinerarys() {
  return await Itinerary.find()
}

export async function getItineraryById(id) {
  return await Itinerary.findById(id)
}

export async function deleteItinerary(id) {
  await Itinerary.findByIdAndDelete(id)
}

export async function addItinerary(newItineraryData) {
  const created = new Itinerary(newItineraryData)
  await created.save()
  return created
}

export default Itinerary
