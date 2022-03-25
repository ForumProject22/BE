import jwt from "jsonwebtoken"

const generateToken = (email: string) => {
    return jwt.sign({ email }, process.env.JWT_SECRET || "", {
        expiresIn: "15d"
    })
}

export default generateToken