import { Document, Schema, model, connect } from 'mongoose';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



interface UsersDocument extends Users, Document {
    matchPassword(enteredPassword: string): Promise<Boolean>
}


const usersSchema = new Schema<Users>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    verifiedPass: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 3,
        required: true,
    },

}, { timestamps: true, _id: true })

usersSchema.index({ createdAt: 1 }, { expires: '24h', partialFilterExpression: { verifiedPass: false } })

usersSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    const user = this as unknown as Users
    return await bcrypt.compare(enteredPassword, user.password)
}

usersSchema.methods.generateVerificationToken = function () {
    const token = process.env.USER_VERIFICATION_TOKEN_SECRET || '';
    const user = this;
    const verificationToken = jwt.sign(
        { ID: user._id },
        token,
        { expiresIn: "7d" }
    )
    return verificationToken
};

usersSchema.pre("save", async function (next) {
    let user = this as unknown as UsersDocument

    if (!user.isModified("password")) {
        next()
    }

    const saltRounds  = 10;

    user.password = await bcrypt.hashSync(user.password, saltRounds)
})

const Users = model<Users>('users', usersSchema)

export default Users;