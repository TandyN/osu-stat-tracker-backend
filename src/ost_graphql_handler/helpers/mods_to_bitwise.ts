/* Mostly references https://github.com/ppy/osu-api/wiki
 * DoubleTime & NightCore are the same since it's basically the same mode.
 * Renamed osu mode mods to match current array of mods query
 * example from osu!API v2: {..., mods: [ "HD", "HR" ] }
 */
export enum Mods {
  None = 0,
  NF = 1, // NoFail
  EZ = 2, // Easy
  TouchDevice = 4,
  HD = 8, // Hidden
  HR = 16, // HardRock
  SD = 32, // SuddenDeath
  DT = 64, // DoubleTime
  NC = 64, // Nightcore
  Relax = 128,
  HT = 256, // Halftime
  FL = 512, // Flashlight
  Autoplay = 1024,
  SpunOut = 2048,
  Relax2 = 4096, // Autopilot
  PF = 8192, // Perfect. Only set along with SuddenDeath. i.e: PF only gives 16416
  Key4 = 16384,
  Key5 = 32768,
  Key6 = 65536,
  Key7 = 131072,
  Key8 = 262144,
  FadeIn = 524288,
  Random = 1048576,
  Cinema = 2097152,
  Target = 4194304,
  Key9 = 8388608,
  KeyCoop = 16777216,
  Key1 = 33554432,
  Key3 = 67108864,
  Key2 = 134217728,
  ScoreV2 = 268435456,
  Mirror = 536870912,
}

export const mods_to_bitwise = (mods: Array<keyof typeof Mods>) =>
  mods.reduce((bitwise_accumulator, current_mod: keyof typeof Mods): number => {
    if (typeof Mods[current_mod] !== 'number') {
      throw new Error(`Mods - ${current_mod} - does not exist in enum`);
    }
    return bitwise_accumulator + Mods[current_mod];
  }, 0);
