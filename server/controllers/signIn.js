import bcrypt from "bcryptjs"
import userModel from "../model/userModel.js"
import jwt from "jsonwebtoken"

export const SignIn = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("User dosen't exist")
    const validatedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!validatedPassword) return res.status(400).send("Invalid password")
    const secretKey = process.env.SECRET_KEY
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      secretKey
    )
    res.send({ token })
  } catch (error) {
    res.status(400).send(error.message)
    console.log(error.message)
  }
}
