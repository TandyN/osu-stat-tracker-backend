import { gql } from 'apollo-server-lambda';

export default gql`
  type Beatmapset {
    id: ID!
    artist: String!
    title: String!
    creator: String!
    user_id: Int!
    status: String!
  }
`;
