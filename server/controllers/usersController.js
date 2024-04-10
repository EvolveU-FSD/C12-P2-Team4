import express from "express"
import * as UserData from "../models/userModel.js"

const router = express.Router()

router.get("/", async (req, res) => {
  const users = await UserData.getAllUsers()
  res.send(users)
})

router.get("/:id", async (req, res) => {
  const id = req.params.id
  const record = await UserData.getUserById(id)
  res.send(record)
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id
  await UserData.deleteUser(id)
  res.status(200).send("Ok.")
})

router.post("/", async (req, res) => {
  const body = req.body
  const newUser = await UserData.addUser(body)
  res.send(newUser)
})

export default router
