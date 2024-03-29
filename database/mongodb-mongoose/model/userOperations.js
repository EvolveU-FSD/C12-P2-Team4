// userOperations.mjs
import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
    maxLength: 32,
  },
});

const User = mongoose.model("User", userSchema);
export default User;

// // Define the model
// const User = mongoose.model("User", userSchema);

// // Function to create a new user
// export async function createUser(name, email, age) {
//   // Create a new user document
//   const newUser = new User({ name, email, age });

//   try {
//     // Save the user document to the database
//     const savedUser = await newUser.save();
//     console.log("User saved to database:", savedUser);
//     return savedUser;
//   } catch (error) {
//     console.error("Error saving user:", error);
//     throw error;
//   }
// }
