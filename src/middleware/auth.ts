import Jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";

export const authorization = (req: Request, res: Response, next: NextFunction) => {
    const verifyToken = process.env.JWT_Secret || ""
    try {
        const token = req.header("auth-token");

        if (!token) return res.status(403).send("Invalid autorization");

        const payload = Jwt.verify(
            token,
            verifyToken
        )
        const user = payload

        next()

    } catch (error) {
        res.status(400).send("Invalid Token")
    }
}