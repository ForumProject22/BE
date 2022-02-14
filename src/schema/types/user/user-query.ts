const {
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} = require("graphql");

import UserType from "./user-type";
import Users from "../../../models/usersModel";

const UserQuery = {
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
    resolve: async () => {
      const users = await Users.find().exec();
      return users;
    },
  },
};

console.log(UserType);

export default UserQuery;
