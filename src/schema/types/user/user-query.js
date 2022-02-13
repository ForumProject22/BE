import {
    GraphQLList,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLNonNull,
  } from "graphql";
  
  const { findUsers } = require('../../controllers/auth')
  import UserType from "./user-type";
  
  const UserQuery = {
    
    users: {
      type: new GraphQLList(UserType),
      resolve: (parentValue, args) => findUsers()
    }
  };
  
  console.log(UserType)
  
  export default UserQuery;