"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/", auth_1.registerUser);
router.post("/login", auth_1.login);
router.get("/", auth_2.authorization, auth_1.getUserProfiles);
router.get("/profile/:id", auth_2.authorization, auth_1.getUserProfileById);
router.get("/verify/:token", auth_1.verifyUser);
exports.default = router;
