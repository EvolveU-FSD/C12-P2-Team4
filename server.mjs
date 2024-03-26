import express from "express";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { config as dotenvConfig } from "dotenv"; // Setup npm i dotenv for use in app
import * as UserData from "./public/api/users.mjs"; // Test route using user data
//import * as UserData from "./users.js";

dotenvConfig();
const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // used to convert filepath to url
const uri = "mongodb://localhost:27017/equinox";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

const publicArtSchema = new mongoose.Schema({}, { collection: "public-art" });
const PublicArt = mongoose.model("PublicArt", publicArtSchema);

app.get("/api/public-art", async (req, res) => {
  const data = await PublicArt.find({}).sort({ title: 1 });
  res.json(data);
});

app.get("/api/users", (req, res) => {
  const users = UserData.getAllUsers();
  res.send(users);
});

app.get("/api/users/:name", (req, res) => {
  const record = UserData.getUser(req.params.name);
  res.send(record);
});

app.delete("/api/users/:name", (req, res) => {
  const name = req.params.name;
  UserData.delete(name);
  res.status(200).send("ok");
});

app.post("/user", (req, res) => {
  var body = req.body;
  UserData.addUser(body);
  res.status(200).send("ok");
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
