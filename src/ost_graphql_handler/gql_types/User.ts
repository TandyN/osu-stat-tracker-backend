import { gql } from 'apollo-server-lambda';

export = gql`
  type User {
    id: ID!
    username: String!
  }
`;
