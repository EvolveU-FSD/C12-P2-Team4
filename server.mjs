import express from "express";
// import * as UserData from "./users.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/users", (req, res) => {
  const users = UserData.getAllUsers();
  res.send(users);
});

app.get("/users/:name", (req, res) => {
  const record = UserData.getUser(req.params.name);
  res.send(record);
});

app.delete("/users/:name", (req, res) => {
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
