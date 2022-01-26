import Users from "../models/usersModel";
import { Request, Response } from "express";
import generateToken from "../utils/generateToken";
import Jwt from "jsonwebtoken";



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


        return res.send({ userDataSaved: user })
    } catch (error: any) {
        return res.status(500).send(error.message)
    }







}