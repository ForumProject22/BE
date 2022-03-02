import express from "express"
import { registerUser, getUserProfiles, verifyUser, login, getUserProfileById, getAllUsers } from "../controllers/auth"
import { authorization } from "../middleware/auth"


const router = express.Router()

router.post("/", registerUser)
router.post("/login", login)
router.get("/", authorization, getUserProfiles)
router.get("/admin/get/allusers", getAllUsers)
router.get("/profile/:id", authorization, getUserProfileById)
router.get("/verify/:token", verifyUser)

export default router