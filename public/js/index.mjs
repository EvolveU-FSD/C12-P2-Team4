import mongoose from "mongoose";
import User from "../../database/mongodb-mongoose/model/userOperations.mjs";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();
mongoose.connect(process.env.MONGODB);

//Create a new user object
const user = new User({
  name: "Maalkum Frater",
  email: "test-email@gmail.com",
});

await user.save();

const allUsers = await User.find({});
console.log(allUsers);
