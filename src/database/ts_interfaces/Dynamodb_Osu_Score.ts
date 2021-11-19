import { Osu_Score } from '../../osu_api/ts_interfaces/Osu_Score';

export interface Dynamodb_Osu_Score extends Osu_Score {
  mode_user_id: string;
  mode_user_id_beatmap: string;
  mode_user_id_beatmap_mods: string;
  mods_bitwise: number;
  beatmap_id: number;
  beatmapset_id: number;
}
