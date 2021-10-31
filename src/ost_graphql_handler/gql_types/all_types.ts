import { gql } from 'apollo-server-lambda';

import Beatmap from './Beatmap';
import Beatmapset from './Beatmapset';
import Score from './Score';
import Statistics from './Statistics';
import User from './User';

const Query = gql`
  type Query
`;

export default [Query, Beatmap, Beatmapset, Score, Statistics, User];
