import {
    GraphQLSchema,
    GraphQLObjectType,
  } from 'graphql';
import UserQuery from './user/userQuery';


const RootQueryType = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        ...UserQuery,
      }),
    })
  });

  export default RootQueryType