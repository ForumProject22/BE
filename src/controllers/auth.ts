import Users from "../models/usersModel";
import { Request, Response } from "express";
import generateToken from "../utils/generateToken";
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer"


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

export const getUserProfile = async (req: Request, res: Response) => {

    const user = await Users.find()
    console.log(user)
    if (user) {
        res.status(200).json(user)

    } else {
        res.status(401)
        throw new Error('User not found')
    }

}

//Next step set up auth and mailer
export const registerUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body
    console.log("req body", req.body)

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
            password
        })

        await user.save()
        const savedUser = await Users.findOne({ email: email })
        console.log("the saved user", savedUser)

        // Generate VerificationToken
        const verificationToken = generateToken(email);

        // Create and Email user a unique verification Link
        const url = `${process.env.ROOT_Domain}fd/users/verify/${verificationToken}`

        transporter.sendMail({

            to: email,
            subject: 'Verify Account',
            html: `Click <a href = '${url}'>here</a> to confirm your email.`
        })
        return res.status(201).send({
            message: `${firstName} ${lastName}, We, sent a verification email to ${email} `
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

// Verify User

export const verifyUser = async (req: Request, res: Response) => {
    const { token } = req.params
    console.log("thetoken", token)
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
            verifyToken
        );
        console.log("thepayload",)
    } catch (err) {
        return res.status(500).send({ message: "invalid token" })
    }

    // find user with mating email

    const user = await Users.findOne({ email: payload.email })
    console.log("theuser", user)
}









