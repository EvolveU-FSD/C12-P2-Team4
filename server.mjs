//----- IMPORT STATEMENTS ---------//
import axios from "axios"
import express from "express"
import path from "path"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { fileURLToPath } from "url"
import { config as dotenvConfig } from "dotenv"
import User from "./database/mongodb-mongoose/model/userOperations.js"

//--------------- FUNCTION CALLS ----------------//
dotenvConfig()

//---------------- VARIABLES ---------------------//
const PORT = process.env.PORT || 3000
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uri = process.env.MONGODB
const apiKey = process.env.GOOGLEMAPS_API_KEY
//-------------- MONGOOSE CONNECTION ------------//
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err))

const db = mongoose.connection

//-------------- SERVER FUNCTIONS ----------------//
app.use(express.json())
app.use(express.static(path.join(__dirname, "public"))) // used to convert filepath to url
app.use(express.static(path.join(__dirname, "googleMaps")))

db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function () {
  console.log("Connected to MongoDB")
})

const publicArtSchema = new mongoose.Schema({}, { collection: "public-art" })
const PublicArt = mongoose.model("PublicArt", publicArtSchema)

//---------------- GET API HANDLES ------------------//
app.get("/api/public-art", async (req, res) => {
  const data = await PublicArt.find({}).sort({ title: 1 })
  res.json(data)
})

app.get("/places", async (req, res) => {
  try {
    const { query } = req.query
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query
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
app.get("/maps", (req, res) => {
  res.send(path.join(__dirname, "googleMaps", "map.html"))
})

// API routes
app.get("/api/users", (req, res) => {
  const users = UserData.getAllUsers()
  res.send(users)
})

app.get("/api/users/:name", (req, res) => {
  const record = UserData.getUser(req.params.name)
  res.send(record)
})

//----------------- POST API ROUTE --------------//
//            SIGNIN HANDLING                    //
app.post("/signin", async (req, res) => {
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
app.post("/signup", async (req, res) => {
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
