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
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// retrieve env vars
dotenv.config();
class Auth {
    constructor() { }
    static hashPassword(pwd) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            return bcrypt.hashSync(pwd, salt);
        });
    }
    static matchPasswords(requestPwd, userPwd) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.compare(requestPwd, userPwd);
        });
    }
    static generateJwt({ email, userId }) {
        return jwt.sign({ userId, email }, process.env.TOKEN_SECRET, { expiresIn: '30 days' });
    }
    static getJwtPayload(token) {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    }
    static getUserId({ req = {}, authToken = '' }) {
        var _a;
        if ((_a = req.request) === null || _a === void 0 ? void 0 : _a.headers) {
            const authHeader = req.request.headers.authorization;
            if (authHeader) {
                const token = authHeader.replace('Bearer ', '');
                if (!token) {
                    return null;
                }
                const { userId } = this.getJwtPayload(token);
                return userId;
            }
        }
        else if (authToken) {
            const { userId } = this.getJwtPayload(authToken);
            return userId;
        }
        return null;
    }
}
module.exports = Auth;
