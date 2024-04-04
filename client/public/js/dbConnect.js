import mongoose from "mongoose"
import User from "../../../database/models/usersOperations.mjs"
import { config as dotenvConfig } from "dotenv"
dotenvConfig()
mongoose.connect(process.env.MONGODB)

const allUsers = await User.find({})
console.log(allUsers)
console.log("Disconnecting from database")
mongoose.disconnect()
