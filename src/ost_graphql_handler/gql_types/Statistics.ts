import { gql } from 'apollo-server-lambda';

export default gql`
  type Statistics {
    count_50: Int!
    count_100: Int!
    count_300: Int!
    count_geki: Int!
    count_katu: Int!
    count_miss: Int!
  }
`;
