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
import cors from "cors"
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
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err))

// const db = mongoose.connection

// db.on("error", console.error.bind(console, "connection error:"))
// db.once("open", function () {
//   console.log("Connected to MongoDB")
// })

//-------------- SERVER FUNCTIONS ----------------//
app.use("", cors())
app.use("*", (req, res, next) => {
  console.log(req.originalUrl)
  next()
})
app.use(express.json())
app.use(express.static(path.join(__dirname, "../client/public/"))) // used to convert filepath to url
app.use(express.static(path.join(__dirname, "../googleMaps")))

const publicArtSchema = new mongoose.Schema({}, { collection: "public-art" })
const PublicArt = mongoose.model("PublicArt", publicArtSchema)
const historicSitesSchema = new mongoose.Schema(
  {},
  { collection: "historic-sites" }
)
const HistoricSites = mongoose.model("HistoricSites", historicSitesSchema)

//---------------- GET API HANDLES ------------------//
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

// Serve .mjs files with the correct MIME type
app.get("*.mjs", (req, res, next) => {
  res.type("application/javascript")
  next()
})

// Serve CSS files with the correct MIME type
app.get("*.css", (req, res, next) => {
  res.type("text/css")
  next()
})

// Serve map.html file
app.get("/api/maps", (req, res) => {
  res.send(path.join(__dirname, "../googleMaps", "map.html"));
});

// ---------------------- API END POINTS --------------------------------------- //
// app.get("/api/users", (req, res) => {
//   const users = UserData.getAllUsers()
//   res.send(users)
// })

//----------------- POST API ROUTE --------------//
//            SIGNIN HANDLING                    //
app.post("/api/signin", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username })

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
        .join({ error: "Enter valid credntials to continue." })
    }

    res.json({ sucess: "Authenication Accepted" })
    console.log(`Logged in as ${user}`)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

//               SIGNP HANDLING                  //
app.post("/api/signup", async (req, res) => {
  console.log("Made iT here...")
  const salt = await bcrypt.genSalt(10)
  const secPass = await bcrypt.hash(req.body.password, salt)
  console.log(secPass)

  try {
    const { firstname, lastname, username, email, password } = req.body

    // Check if the user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists, Please Signin" })
    }

    // Create a new user
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

// -------- Retriver User Data ------------//
app.get("/api/users/:email", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.params.email })
    console.log(user)
    if (!user) {
      return res.status(400).json({ error: "Some Error Occurred" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

//------------- DELETE API ROUTE ---------------//
app.delete("/api/users/:name", (req, res) => {
  const name = req.params.name
  UserData.delete(name)
  res.status(200).send("ok")
})

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`)
})

//---------- DISCONNECT FROM DATABASE ----------//
//           mongoose.disconnect();            //
