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
exports.verifyUser = exports.registerUser = exports.getUserProfile = void 0;
const usersModel_1 = __importDefault(require("../models/usersModel"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
// export const transporter = nodemailer.createTransport({
//     "host": "smtp.gmail.com",
//     "port": 587,
//     secure: false,
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASS,
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });
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
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });
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
        yield user.save();
        const savedUser = yield usersModel_1.default.findOne({ email: email });
        console.log("the saved user", savedUser);
        // Generate VerificationToken
        const verificationToken = (0, generateToken_1.default)(email);
        // Create and Email user a unique verification Link
        const url = `${process.env.ROOT_Domain}fd/users/verify/${verificationToken}`;
        transporter.sendMail({
            to: email,
            subject: 'Verify Account',
            html: `Click <a href = '${url}'>here</a> to confirm your email.`
        });
        return res.status(201).send({
            message: `${firstName} ${lastName}, We, sent a verification email to ${email} `
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});
exports.registerUser = registerUser;
// Verify User
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    console.log("thetoken", token);
    //Get secret to decode token
    const verifyToken = process.env.JWT_Secret || "";
    //Check if we have a token
    if (!token) {
        return res.status(422).send({ message: "Missing Token" });
    }
    //If we have a token Verify it from the url
    let payload = null;
    try {
        payload = jsonwebtoken_1.default.verify(token, verifyToken);
        console.log("thepayload", payload.email);
    }
    catch (err) {
        return res.status(500).send({ message: "invalid token" });
    }
    // find user with mating email
    const user = yield usersModel_1.default.findOne({ email: payload.email });
    // console.log("theuser", user)
});
exports.verifyUser = verifyUser;
