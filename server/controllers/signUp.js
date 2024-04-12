import userModel from "../models/usersOperations"
import bcrypt from "bcryptjs"

export const SignUp = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User already exists")
    const { name, email, password } = req.body
    let newUser = new userModel({
      name,
      email,
      password,
    })
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)
    await newUser.save()
    res.send("user created")
  } catch (error) {
    res.status(400).send(error.message)
    console.log(error.message)
  }
}
