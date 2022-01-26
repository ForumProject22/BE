import express from "express"
import { registerUser, getUserProfile } from "../controllers/auth"


const router = express.Router()

router.post("/", registerUser)
router.get("/", getUserProfile)

export default router