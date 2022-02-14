"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersModel_1 = __importDefault(require("../models/usersModel"));
const user_type_1 = __importDefault(require("./types/user/user-type"));
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt } = require('graphql');
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: user_type_1.default,
            args: {
                _id: {
                    type: GraphQLString
                },
                firstName: {
                    type: GraphQLString
                },
                lastName: {
                    type: GraphQLString
                },
                email: {
                    type: GraphQLString
                },
                verified: {
                    type: GraphQLBoolean
                },
                verifiedPass: {
                    type: GraphQLBoolean
                },
                password: {
                    type: GraphQLString
                },
                roles: {
                    type: GraphQLInt
                },
                avatar: {
                    type: GraphQLString
                },
                city: {
                    type: GraphQLString
                },
                state: {
                    type: GraphQLString
                },
            },
            resolve(_, args) {
                return (new usersModel_1.default(args).save());
            }
        }
    }
});
module.exports = mutation;
