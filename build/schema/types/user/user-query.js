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
const { GraphQLList, GraphQLString, GraphQLBoolean, GraphQLInt, } = require("graphql");
const user_type_1 = __importDefault(require("./user-type"));
const usersModel_1 = __importDefault(require("../../../models/usersModel"));
const UserQuery = {
    users: {
        type: new GraphQLList(user_type_1.default),
        args: {
            _id: {
                type: GraphQLString,
            },
            firstName: {
                type: GraphQLString,
            },
            lastName: {
                type: GraphQLString,
            },
            email: {
                type: GraphQLString,
            },
            verified: {
                type: GraphQLBoolean,
            },
            verifiedPass: {
                type: GraphQLBoolean,
            },
            password: {
                type: GraphQLString,
            },
            roles: {
                type: GraphQLInt,
            },
            avatar: {
                type: GraphQLString,
            },
            city: {
                type: GraphQLString,
            },
            state: {
                type: GraphQLString,
            },
        },
        resolve: () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield usersModel_1.default.find().exec();
            return users;
        }),
    },
};
console.log(user_type_1.default);
exports.default = UserQuery;
