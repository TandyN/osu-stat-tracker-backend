import { gql } from 'apollo-server-lambda';

export = gql`
  type Score {
    id: ID!
    user_id: Int!
    beatmap_id: Int!
    beatmapset_id: Int!
    mods: [String!]!
    mods_bitwise: Int!
    accuracy: Float!
    score: Int!
    max_combo: Int!
    passed: Boolean!
    perfect: Boolean!
    statistics: Statistics!
    rank: String!
    created_at: String!
    pp: Float
    mode: String!
    mode_int: Int!
    beatmap: Beatmap!
    beatmapset: Beatmapset!
    user: User!
  }

  extend type Query {
    get_user_scores(user_id: Int!, mode_int: Int!): [Score]
  }
`;
