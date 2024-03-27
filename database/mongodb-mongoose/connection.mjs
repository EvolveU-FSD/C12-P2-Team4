//https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/

import mongoose from "mongoose";
import { createUser } from "./model/userOperations.mjs";

mongoose.connect(process.env.MONGODB);

const db = mongoose.connection;
