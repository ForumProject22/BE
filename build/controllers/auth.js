"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.getUserProfile = exports.transporter = void 0;
const usersModel_1 = __importDefault(require("../models/usersModel"));
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
    "host": "smtp.gmail.com",
    "port": 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});
//Register
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usersModel_1.default.find();
    console.log(user);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(401);
        throw new Error('User not found');
    }
});
exports.getUserProfile = getUserProfile;
//Next step set up auth and mailer
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    console.log("req body", req.body);
    try {
        // Check if the email is in use
        const userExists = yield usersModel_1.default.findOne({ email });
        if (userExists) {
            res.status(400);
            return res.send("user already exists");
        }
        // Create and save the user
        const user = yield usersModel_1.default.create({
            firstName,
            lastName,
            email,
            password
        });
        return res.send({ userDataSaved: user });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.registerUser = registerUser;
