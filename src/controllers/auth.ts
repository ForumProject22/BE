import Users from "../models/usersModel";
import { Request, Response } from "express";
import generateToken from "../utils/generateToken";
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"

//get all users
export const getAllUsers = async (req: Request, res: Response) => {
    const user = await Users.find()
    res.status(200).json(user)
}

// find all users
export const getUserProfiles = async (req: Request, res: Response) => {

    // find all users
    const user = await Users.find()

    if (user && user[0].roles === 3) {
        res.status(200).json(user)

    } else {
        res.status(401).send("Access Denied")
    }

}
//find one user By Id
export const getUserProfileById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        //find one user
        const user = await Users.findById(id)
        res.send(user)
    } catch (error) {

        res.send("could not find user")
    }

}


//Next step set up auth and mailer
export const registerUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body


    const transporter = nodemailer.createTransport({
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
        const userExists = await Users.findOne({ email })
        if (userExists) {
            res.status(400)
            return res.send("user already exists")
        }

        // Create and save the user
        const user = await Users.create({
            firstName,
            lastName,
            email,
            role: 3,
            password
        })

        await user.save()
        const savedUser = await Users.findOne({ email: email })


        // Generate VerificationToken
        const verificationToken = generateToken(email);

        // Create and Email user a unique verification Link
        const url = `${process.env.NODE_ENV === "production" ?
            process.env.ROOT_Domain : process.env.local}fd/users/verify/${verificationToken}`

        transporter.sendMail({

            to: email,
            subject: 'Verify Account',
            html: `Click <a href = '${url}'>here</a> to confirm your email.`
        })
        return res.status(201).send({
            message: `${firstName} ${lastName}, We, sent a verification email to ${email} `
        });
    } catch (error) {

        return res.status(500).send(error)
    }
}

// Verify User

export const verifyUser = async (req: Request, res: Response) => {
    const { token } = req.params

    //Get secret to decode token
    const verifyToken = process.env.JWT_Secret || ""

    //Check if we have a token

    if (!token) {
        return res.status(422).send({ message: "Missing Token" })
    }

    //If we have a token Verify it from the url
    let payload = null
    try {
        payload = Jwt.verify(
            token,
            verifyToken,

        );

    } catch (err) {
        return res.status(500).send({ message: "invalid token" })
    }

    try {
        // find user with matching email

        const user = await Users.findOne({ email: (payload as jwtTypes).email })
        //send no userForm located in views "noUser"
        if (!user) {
            return res.render("noUser", { title: "cityFourms" })
        }

        user.verifiedPass = true;
        await user.save();
        return res.render("verified", { title: "cityFourms" })

    } catch (err) {
        return res.status(500).send(err);
    }

}

// Login 

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;


        const user = await Users.findOne({ email: email });
        if (!user) return res.status(400).send("invalid email or password");

        // checks if account has been verifed
        if (user.verifiedPass === false) return res.status(400).send("Account not verified");


        //comapre password with hash
        const validPassword = await bcrypt.compare(
            password,
            user.password
        )
        if (!validPassword)
            return res.status(400).send("Invalid email or password")

        //send token to client to be userd in headers for logoin and auth routes
        const token = generateToken(email);
        res.send(token)

    } catch (error) {

        res.status(500).send("An error occured")
    }
}






