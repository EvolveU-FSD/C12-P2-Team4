// userModel
import mongoose from "mongoose"

await mongoose.connect("mongodb://localhost:27017/equinox")

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
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 32,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 13,
    maxLength: 256,
  },
})

const User = mongoose.model("user", userSchema)

export async function getAllUsers() {
  return await User.find()
}

export async function getUserById(id) {
  return await User.findById(id)
}

export async function deleteUser(id) {
  await User.findByIdAndDelete(id)
}

export async function addUser(newUserData) {
  const created = new User(newUserData)
  await created.save()
  return created
}

export default User
