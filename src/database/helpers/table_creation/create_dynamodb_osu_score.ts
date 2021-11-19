import { Osu_Score } from '../../../osu_api/ts_interfaces/Osu_Score';
import { Dynamodb_Osu_Score } from '../../ts_interfaces/Dynamodb_Osu_Score';

import { mods_to_bitwise } from './mods_to_bitwise';

export const create_dynamodb_osu_score = (
  osu_api_score: Osu_Score,
): Dynamodb_Osu_Score => {
  const { beatmap, beatmapset, user, ...rest_of_osu_api_score } = osu_api_score; // to remove beatmap, beatmapset, user fields
  const { mods, mode_int } = osu_api_score;

  if (
    // if any of these fields don't exist throw error
    !(mode_int || mode_int === 0) ||
    !beatmap ||
    !beatmapset ||
    !user ||
    !mods ||
    !beatmap.id ||
    !beatmapset.id ||
    !user.id
  ) {
    throw new Error('Detected missing field in create_dynamodb_osu_score');
  }

  const mods_bitwise = mods_to_bitwise(mods);

  const mode_user_id = `${mode_int}~${user.id}`;
  const mode_user_id_beatmap = mode_user_id + `~${beatmap.id}`;
  const mode_user_id_beatmap_mods = mode_user_id_beatmap + `~${mods_bitwise}`;

  return {
    mode_user_id,
    mode_user_id_beatmap,
    mode_user_id_beatmap_mods,
    mods_bitwise,
    beatmap_id: beatmap.id,
    beatmapset_id: beatmapset.id,
    ...rest_of_osu_api_score,
  };
};
