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
exports.login = exports.verifyUser = exports.registerUser = exports.getUserProfileById = exports.getUserProfiles = exports.getAllUsers = void 0;
const usersModel_1 = __importDefault(require("../models/usersModel"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usersModel_1.default.find();
    res.status(200).json(user);
});
exports.getAllUsers = getAllUsers;
// find all users
const getUserProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // find all users
    const user = yield usersModel_1.default.find();
    if (user && user[0].role === 3) {
        res.status(200).json(user);
    }
    else {
        res.status(401).send("Access Denied");
    }
});
exports.getUserProfiles = getUserProfiles;
//find one user By Id
const getUserProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        //find one user
        const user = yield usersModel_1.default.findById(id);
        res.send(user);
    }
    catch (error) {
        res.send("could not find user");
    }
});
exports.getUserProfileById = getUserProfileById;
//Next step set up auth and mailer
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
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
            role: 3,
            password
        });
        yield user.save();
        const savedUser = yield usersModel_1.default.findOne({ email: email });
        // Generate VerificationToken
        const verificationToken = (0, generateToken_1.default)(email);
        // Create and Email user a unique verification Link
        const url = `${process.env.NODE_ENV === "production" ?
            process.env.ROOT_Domain : process.env.local}fd/users/verify/${verificationToken}`;
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
        return res.status(500).send(error);
    }
});
exports.registerUser = registerUser;
// Verify User
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
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
    }
    catch (err) {
        return res.status(500).send({ message: "invalid token" });
    }
    try {
        // find user with matching email
        const user = yield usersModel_1.default.findOne({ email: payload.email });
        //send no userForm located in views "noUser"
        if (!user) {
            return res.render("noUser", { title: "cityFourms" });
        }
        user.verifiedPass = true;
        yield user.save();
        return res.render("verified", { title: "cityFourms" });
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
exports.verifyUser = verifyUser;
// Login 
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield usersModel_1.default.findOne({ email: email });
        if (!user)
            return res.status(400).send("invalid email or password");
        // checks if account has been verifed
        if (user.verifiedPass === false)
            return res.status(400).send("Account not verified");
        //comapre password with hash
        const validPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!validPassword)
            return res.status(400).send("Invalid email or password");
        //send token to client to be userd in headers for logoin and auth routes
        const token = (0, generateToken_1.default)(email);
        res.send(token);
    }
    catch (error) {
        res.status(500).send("An error occured");
    }
});
exports.login = login;
