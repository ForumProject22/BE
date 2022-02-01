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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersSchema = new mongoose_1.Schema({
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
        required: false,
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
});
usersSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        return yield bcryptjs_1.default.compare(enteredPassword, user.password);
    });
};
usersSchema.methods.generateVerificationToken = function () {
    const token = process.env.USER_VERIFICATION_TOKEN_SECRET || '';
    const user = this;
    const verificationToken = jsonwebtoken_1.default.sign({ ID: user._id }, token, { expiresIn: "7d" });
    return verificationToken;
};
usersSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = this;
        console.log("model user", this);
        if (!user.isModified("password")) {
            next();
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(user.password, salt);
    });
});
const Users = (0, mongoose_1.model)('users', usersSchema);
exports.default = Users;
