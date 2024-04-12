import mongoose from "mongoose"
import User from "/models/usersOperations.mjs"
import { config as dotenvConfig } from "dotenv"

export function dbConenct() {
  dotenvConfig()

  mongoose.connect(process.env.MONGODB)
  return console.log("Connected......")
}
