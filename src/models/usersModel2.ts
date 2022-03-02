import { Document, Schema, model, connect } from 'mongoose';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



interface UsersDocument extends Users2, Document {
    matchPassword(enteredPassword: string): Promise<Boolean>
}


const usersSchema = new Schema<Users2>({
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
    verified: {
        type: Boolean,
        default: false
    },
    verifiedPass: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: Number,
        default: 3,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    },
    followers: {
        type: [],
        default: [],
        required: false,
    },
    followings: {
        type: [],
        default: [],
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    socialMedia: [{

        twitter: {
            type: String,
            required: false,
        },
        facebook: {
            type: String,
            required: false,
        },
        instagram: {
            type: String,
            required: false,
        },
    }],
}, { timestamps: true, _id: true })

usersSchema.index({ createdAt: 1 }, { expires: '24h', partialFilterExpression: { verifiedPass: false } })

usersSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    const user = this as unknown as Users2
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

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(user.password, salt)
})

const Users = model<Users2>('users', usersSchema)

export default Users;