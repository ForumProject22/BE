import Users from "../models/usersModel"
import UserType from "./types/user/user-type"

const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt } = require('graphql')

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
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
            resolve (_: any, args: any) {
                return (new Users(args).save())
            }
        }
    }
})

module.exports = mutation