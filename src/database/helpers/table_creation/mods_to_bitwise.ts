import { Mods } from '../../../osu_api/ts_interfaces/Mods';

export const mods_to_bitwise = (mods: Array<keyof typeof Mods>): number =>
  mods.reduce((bitwise_accumulator, current_mod: keyof typeof Mods): number => {
    if (typeof Mods[current_mod] !== 'number') {
      throw new Error(`Mod - ${current_mod} - does not exist in enum`);
    }
    return bitwise_accumulator + Mods[current_mod];
  }, 0);
