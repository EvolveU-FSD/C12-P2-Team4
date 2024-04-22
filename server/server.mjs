//----- IMPORT STATEMENTS ---------//
import axios from "axios"
import bodyParser from "body-parser"
import express from "express"
import path from "path"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { fileURLToPath } from "url"
import { config as dotenvConfig } from "dotenv"
import User from "./models/userModel.js"
import DayEvent from "./models/dayModel.js"
import cors from "cors"
import { authenticateToken } from "./middleware/token.js"
import jwt from "jsonwebtoken"

//--------------- FUNCTION CALLS ----------------//
dotenvConfig()

//---------------- VARIABLES ---------------------//
const PORT = process.env.PORT || 3000
const app = express()
app.use(bodyParser.json())
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uri = process.env.MONGODB
const apiKey = process.env.GOOGLEMAPS_API_KEY

//-------------- MONGOOSE CONNECTION ------------//
mongoose
  .connect(uri)
  .then(() => console.log("18...MongoDB Connected..."))
  .catch((err) => console.log("17...connection error", err))

const db = mongoose.connection

db.on("error", console.error.bind(console, "16...connection error:"))
db.once("open", function () {
  console.log("15..Connected to MongoDB..")
})

//-------------- SERVER FUNCTIONS ----------------//
app.use(cors())
app.use("*", (req, res, next) => {
  console.log("14. current route...:..", req.originalUrl)
  next()
})
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).json({ error: "Internal server error" })
})

app.use(express.json())

//-------------- MODELS -------------------------//

const itineraryItemSchema = new mongoose.Schema(
  {
    title: String,
    lat: Number,
    lng: Number,
  },
  { collection: "itinerary" }
)

const ItineraryItem = mongoose.model("ItineraryItem", itineraryItemSchema)

const publicArtSchema = new mongoose.Schema({}, { collection: "public-art" })
const PublicArt = mongoose.model("PublicArt", publicArtSchema)
const historicSitesSchema = new mongoose.Schema(
  {},
  { collection: "historic-sites" }
)
const HistoricSites = mongoose.model("HistoricSites", historicSitesSchema)

//---------------- GET API HANDLES ------------------//
app.get("/api/itinerary", async (req, res) => {
  const items = await ItineraryItem.find()
  res.json(items)
})

app.get("/api/public-art", async (req, res) => {
  const data = await PublicArt.find({}).sort({ title: 1 })
  res.json(data)
})

app.get("/api/historic-sites", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const startIndex = (page - 1) * limit

    // Fetch total count of documents
    const totalCount = await HistoricSites.countDocuments()

    // Fetch data slice based on startIndex and limit
    const dataSlice = await HistoricSites.find({})
      .sort({ name: 1 })
      .skip(startIndex)
      .limit(limit)

    res.json({
      items: dataSlice,
      page,
      limit,
      totalCount,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/api/places", async (req, res) => {
  try {
    const { location, radius, keyword } = req.query
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${encodeURIComponent(
      location
    )}&radius=${encodeURIComponent(radius)}&keyword=${encodeURIComponent(
      keyword
    )}&key=${apiKey}`

    const response = await axios.get(url)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

// ---------------------- API END POINTS --------------------------------------- //
app.get("/api/users", (req, res) => {
  const users = UserData.getAllUsers()
  res.send(users)
})

//-------------------  DAY PLAN API  -----------------//

app.get("/api/events", authenticateToken, async (req, res) => {
  if (!req.user) {
    return res.sendStatus(401)
  }
  try {
    const { date } = req.query
    console.log("2. Printing date from events header:", date)
    // if (!userId) {
    //   return res.status(400).json({ message: "User ID is required" })
    // }

    const events = await DayEvent.find({
      date: new Date(date),
      userId: req.user._id,
    })

    events.forEach((event) => {
      console.log("3. Event details:", {
        eventTitle: event.eventTitle,
        eventTime: event.eventTime,
        place: event.place,
        description: event.description,
        eventDate: event.date,
      })
    })

    res.json(events)
  } catch (error) {
    console.error("Failed to fetch events:", error)
    res.status(500).json({ error: error.message })
  }
})

app.put("/api/events/:id", async (req, res) => {
  const { id } = req.params
  const { event } = req.body
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { event },
      { new: true }
    )
    res.json(updatedEvent)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.delete("/api/events/:id", async (req, res) => {
  const { id } = req.params
  try {
    await Event.findByIdAndDelete(id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/api/dayevent/:eventTitle", async (req, res) => {
  try {
    const event = await getDayEventByTitle(req.params.eventTitle)
    if (!event) {
      return res.status(404).send("Event not found.")
    }

    const { email, date, eventTime, eventTitle, place } = event
    res.status(200).send({ email, date, eventTime, eventTitle, place })
  } catch (error) {
    console.log("13. Error in dayevent/eventTitle endpoint: ", error)
    res.status(500).send("An error occurred while retrieving the event.")
  }
})

//vulnerability discovered, add validation to confirm user sending information credentials match username entered...
app.post("/api/dayevent", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })

    const { username, email, date, eventTime, eventTitle, place, description } =
      req.body

    console.log("12. dayevent post email:...", email)
    console.log("11. dayevent post user....:..", user)
    if (!eventTitle || !user) {
      res.status(400).send("Event title and email are required")
      return
    } else if (username === user.username) {
      const newEvent = new DayEvent({
        user: user._id,
        email: user.email,
        date: date || new Date(),
        eventTime,
        eventTitle,
        place,
        description,
      })
      await newEvent.save()
      res.status(201).send(newEvent)
    } else {
      res.status(401).send("Unauthorized action... ")
    }
  } catch (error) {
    console.log("10. Error creating new event:", error)
    res.status(501).send("Failed to create new event")
  }
})

app.post("/api/profile", authenticateToken, async (req, res) => {
  try {
    const profile = await User.findOne({ email: req.body.email })
    console.log("9. Printing out api/profile data: ", profile)
    const username = profile.username
    const email = profile.email
    const _id = profile._id
    const firstname = profile.firstname
    const lastname = profile.lastname

    res.status(201).send({ username, email, _id, firstname, lastname })
  } catch (error) {
    console.log("8. Something is not right...In Profile...", error)
  }
})

//----------------- POST API ROUTE --------------//
app.post("/api/itinerary", async (req, res) => {
  console.log("7. Received POST request to /api/itinerary") // Log when a request is received

  try {
    console.log("6. Creating new itinerary item with body:", req.body) // Log the request body
    const newItem = new ItineraryItem(req.body)
    const savedItem = await newItem.save()
    console.log("5. Saved new itinerary item:", savedItem) // Log the saved item
    res.json(savedItem)
  } catch (error) {
    console.error("Error while handling /api/itinerary POST request:", error) // Log any errors
    res.status(500).json({ error: "Internal server error" })
  }
})

//-------------------- SIGNIN HANDLING ----------------------//
app.post("/api/signin", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials try again" })
    }
    const passwordCompare = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ error: "Enter valid credentials to continue." })
    }
    const email = user.email
    const _id = user.id
    const username = user.name

    const accessToken = jwt.sign(
      { email: user.email, username: username, _id: _id, user },
      process.env.ACCESS_TOKEN_SECRET
    )
    res.json({ email, _id, username, accessToken, user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error =(" })
  }
})

//------------------------------  SIGNUP HANDLING  -------------------------------- //
app.post("/api/signup", async (req, res) => {
  const salt = await bcrypt.genSalt(10)
  const secPass = await bcrypt.hash(req.body.password, salt)
  console.log("4. Secured password...:....", secPass)

  try {
    const { firstname, lastname, username, email, password } = req.body

    // Check if the user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "User exists, Please Signin" })
    }

    //------------- Create a new user --------------//
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: secPass,
    })
    await newUser.save()

    // Return success response

    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

//-------------- Retriver User Data ------------//
app.get("/api/profile/:email", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.params.email })
    console.log("3. profile/email...get...user info:... ", user)
    if (!user) {
      return res.status(400).json({ error: "Some Error Occurred" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

//------------- DELETE API ROUTE ---------------//
app.delete("/api/profile/:name", (req, res) => {
  const name = req.params.name
  UserData.delete(name)
  res.status(200).send("ok")
})

app.delete("/api/itinerary/:id", async (req, res) => {
  const deletedItem = await ItineraryItem.findByIdAndDelete(req.params.id)
  res.json(deletedItem)
})

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`)
})
