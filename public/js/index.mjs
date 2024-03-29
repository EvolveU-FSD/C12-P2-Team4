import mongoose from "mongoose";
import User from "../../database/mongodb-mongoose/model/userOperations.js";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();
mongoose.connect(process.env.MONGODB);

const allUsers = await User.find({});
console.log(allUsers);
console.log("Disconnecting from database");
mongoose.disconnect();
