// userOperations.mjs
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    minLength: 10,
    required: true,
    lowercase: true,
  },
});

const User = model("User", userSchema);
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
