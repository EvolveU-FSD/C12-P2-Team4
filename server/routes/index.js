import express from "express"
import { SignUp } from "../controllers/signUp.js"
import { SignIn } from "../controllers/signIn.js"

const router = express.Router()

router.post("/signin", SignIn)

router.post("/", SignUp)

export default router
