"use strict";
const User = `
    type User {
        id: ID!
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        timestamps: Boolean!
        verifiedPass: Boolean!
    }
    type Token {
        jwt: ID!
    }
    type Query {
        getUser(id: ID!): User
        getUsers: [User]
    }
    type Mutation {
        signup(email: String!, password: String!, firstName: String!, lastName: String!): String!,
        login(email: String, password: String!): Token!,
      }`;
module.exports = User;
