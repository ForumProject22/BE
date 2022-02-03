import express from "express"
import { registerUser, getUserProfiles, verifyUser, login, getUserProfileById } from "../controllers/auth"
import { authorization } from "../middleware/auth"


const router = express.Router()

router.post("/", registerUser)
router.post("/login", login)
router.get("/", authorization, getUserProfiles)
router.get("/profile/:id", authorization, getUserProfileById)
router.get("/verify/:token", verifyUser)

export default router