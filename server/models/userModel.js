// userOperations.mjs
import mongoose from "mongoose"

const Schema = mongoose.Schema

// Define a Mongoose schema for user
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  lastname: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  username: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 32,
  },
  password: {
    type: String,
    required: true,
    minLength: 13,
    maxLength: 256,
  },
})

const userModel = mongoose.model("User", userSchema)
export default userModel
