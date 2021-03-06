import {
  Osu_Score,
  Beatmapset,
} from '../../../osu_api/ts_interfaces/Osu_Score';

export const create_dynamodb_osu_beatmapset = (
  score: Osu_Score,
): Beatmapset => {
  if (score.beatmapset) {
    if (score.beatmapset.id) {
      return {
        ...score.beatmapset,
      };
    }
  }
  throw new Error('No beatmapset found in create_dynamodb_osu_beatmapset');
};
