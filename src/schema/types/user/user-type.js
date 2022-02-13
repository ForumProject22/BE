import {
    GraphQLList,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLNonNull
    } from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User Type Definition',
    fields: () => ({
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
    })
})

export default UserType