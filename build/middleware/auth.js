"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorization = (req, res, next) => {
    const verifyToken = process.env.JWT_Secret || "";
    try {
        const token = req.header("auth-token");
        if (!token)
            return res.status(403).send("Invalid autorization");
        const payload = jsonwebtoken_1.default.verify(token, verifyToken);
        const user = payload;
        next();
    }
    catch (error) {
        res.status(400).send("Invalid Token");
    }
};
exports.authorization = authorization;
