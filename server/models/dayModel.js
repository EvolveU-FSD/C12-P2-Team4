import mongoose, { Collection } from "mongoose"
await mongoose.connect("mongodb://localhost:27017/equinox")

const Schema = mongoose.Schema

// Define a Mongoose schema for dayEvent
const dayEventSchema = new Schema({
  email: {
    type: Email,
    ref: "user",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, "Date is required"],
  },

  eventTime: {
    type: TimeRanges,
    required: true,
  },
  eventTitle: {
    type: String,
    required: [true, "Event name is required"],
    unique: true,
  },
  place: {
    type: String,
    required: [true, "Please select a destination"],
  },

  Collection: "user",
})

const DayEvent = mongoose.model("day", dayEventSchema, "events")

export async function getAllDayEvent() {
  return await DayEvent.find()
}

export async function getDayEventByTitle(eventTitle) {
  return await DayEvent.findOne({ eventTitle: eventTitle })
}

export async function deleteDayEvent(eventTitle) {
  await DayEvent.findOneAndDelete({ eventTitle: eventTitle })
}

export async function addDayEvent(newDayEventData) {
  const created = await new DayEvent(newDayEventData)
  console.log(DayEvent)
  await created.save()
  return created
}

//---------- DISCONNECT FROM DATABASE ----------//
// mongoose.disconnect()

export default DayEvent
