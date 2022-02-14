const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
  } = require('graphql');
import Users from "../models/usersModel"
import UserType from "./types/user/user-type"


const RootQueryType = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        users: {
          type: new GraphQLList(UserType),
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
          resolve: async (parentValue: any, args: any) => {
            const users = await Users.find(args)
            return users;
          },
        },
      }),
    })
  });

  export default RootQueryType