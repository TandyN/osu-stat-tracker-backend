import { ApolloServer } from 'apollo-server-lambda';

import typeDefs from './gql_types/all_types';
import resolvers from './gql_resolvers/all_resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default server.createHandler();
