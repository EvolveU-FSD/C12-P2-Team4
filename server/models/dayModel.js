import mongoose from "mongoose"
await mongoose.connect("mongodb://localhost:27017/equinox")

const Schema = mongoose.Schema

// Define a Mongoose schema for dayEvent
const dayEventSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Day",
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
  eventTitle: {
    type: String,
    required: [true, "Event name is required"],
  },
  place: {
    type: String,
    required: [true, "Please select a destination"],
  },
})

const DayEvent = mongoose.model("day", dayEventSchema)

export async function getAllDayEvent() {
  return await DayEvent.find()
}

export async function getDayEventBy(eventTitle) {
  return await DayEvent.findOne(eventTitle)
}

export async function deleteDayEvent(eventTitle) {
  await DayEvent.findOneAndDelete(eventTitle)
}

export async function addDayEvent(newDayEventData) {
  const created = new DayEvent(newDayEventData)
  await created.save()
  return created
}

//---------- DISCONNECT FROM DATABASE ----------//
mongoose.disconnect()

export default DayEvent
