import { ApolloServer, gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Query {
    hello: [HelloType]
  }

  type HelloType {
    id: Int!
    phrase: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return [{ id: 1, phrase: 'test' }];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export const ost_graphql = server.createHandler();
