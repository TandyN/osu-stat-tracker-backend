import { Mods } from '../helpers/mods_to_bitwise';

export interface Osu_Score {
  mode_int: number;
  mods: Array<keyof typeof Mods>;
  beatmap?: Beatmap;
  beatmapset?: Beatmapset;
  user?: User;
  [index: string]: unknown;
}

export interface Beatmap {
  id: number;
  [index: string]: unknown;
}

export interface Beatmapset {
  id: number;
  [index: string]: unknown;
}

export interface User {
  id: number;
  [index: string]: unknown;
}
