import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { config as dotenvConfig } from "dotenv";
import * as UserData from "./public/api/users.mjs";

dotenvConfig();
const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "googleMaps")));

// Serve .mjs files with the correct MIME type
app.get("*.mjs", (req, res, next) => {
  res.type("application/javascript");
  next();
});

// Serve CSS files with the correct MIME type
app.get("*.css", (req, res, next) => {
  res.type("text/css");
  next();
});

// Serve map.html file
app.get("/maps", (req, res) => {
  res.sendFile(path.join(__dirname, "googleMaps", "map.html"));
});

// API routes
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
