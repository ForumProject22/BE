import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
  } from 'graphql';
import UserType from './types/user/user-type';
import Users from "../models/usersModel";



const RootQueryType = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        users: {
          type: GraphQLList(UserType),
          description: 'Get list of all users',
          resolve: () => {
            let users = await Users.find().exec()
            return users;
          }
        }
      }),
    })
  });

  export default RootQueryType