import { mods_to_bitwise, Mods } from './mods_to_bitwise';

describe('mods_to_bitwise function', () => {
  it('should return a number by adding up all of the mods enum values', () => {
    let test_mods: Array<keyof typeof Mods> = ['HD'];
    expect(mods_to_bitwise(test_mods)).toBe(8);

    test_mods = [];
    expect(mods_to_bitwise(test_mods)).toBe(0);

    test_mods = ['NF', 'HD', 'HR'];
    expect(mods_to_bitwise(test_mods)).toBe(25);
  });

  it('should throw an error if a mod does not exist as a key in the Mods enum', () => {
    let test_mods: Array<string> = ['HDD'];
    expect(() => {
      mods_to_bitwise(test_mods as never);
    }).toThrow(new Error('Mods - HDD - does not exist in enum'));

    test_mods = ['HD', 'HR', 'BadKey'];
    expect(() => {
      mods_to_bitwise(test_mods as never);
    }).toThrow(new Error('Mods - BadKey - does not exist in enum'));
  });
});
