import { gql } from 'apollo-server-lambda';

export = gql`
  type Beatmap {
    id: ID!
    difficulty_rating: Float!
    mode: String!
    status: String!
    version: String!
    accuracy: Float!
    ar: Float!
    bpm: Int!
    cs: Float!
    count_circles: Int!
    count_sliders: Int!
    count_spinners: Int!
  }
`;
