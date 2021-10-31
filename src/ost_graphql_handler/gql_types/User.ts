import { gql } from 'apollo-server-lambda';

export default gql`
  type User {
    id: ID!
    username: String!
  }
`;
