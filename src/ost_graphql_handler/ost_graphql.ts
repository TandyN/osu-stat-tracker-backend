import { ApolloServer } from 'apollo-server-lambda';

import { documentClient } from '../database/dynamodb';

import { typeDefs } from './gql_types/all_types';
import { resolvers } from './gql_resolvers/all_resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    documentClient,
  }),
});

export const ost_graphql = server.createHandler();
