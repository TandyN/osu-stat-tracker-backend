import { Osu_Score, Beatmap } from '../ts_interfaces/osu_api';

export const create_dynamodb_osu_beatmap = (score: Osu_Score): Beatmap => {
  if (score.beatmap) {
    if (score.beatmap.id) {
      return score.beatmap;
    }
  }
  throw new Error('No beatmap found in create_dynamodb_osu_beatmap');
};
