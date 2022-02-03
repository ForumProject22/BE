import express from "express"
import { registerUser, getUserProfile, verifyUser } from "../controllers/auth"


const router = express.Router()

router.post("/", registerUser)
router.get("/", getUserProfile)
router.get("/verify/:token", verifyUser)

export default router