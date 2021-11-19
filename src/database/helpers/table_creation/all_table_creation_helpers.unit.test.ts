import _ from 'lodash';

import { Dynamodb_Osu_Score } from '../../ts_interfaces/Dynamodb_Osu_Score';
import { Osu_Score } from '../../../osu_api/ts_interfaces/Osu_Score';
import { Mods } from '../../../osu_api/ts_interfaces/Mods';

import {
  create_dynamodb_osu_score,
  mods_to_bitwise,
} from './all_table_creation_helpers';

import user_recent_query from '../../../osu_api/test_data/user_recent_query.json';

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
    }).toThrow(new Error('Mod - HDD - does not exist in enum'));

    test_mods = ['HD', 'HR', 'BadKey'];
    expect(() => {
      mods_to_bitwise(test_mods as never);
    }).toThrow(new Error('Mod - BadKey - does not exist in enum'));
  });
});

describe('create_dynamodb_osu_score function', () => {
  it('should return score with mode_user_id, mode_user_id_beatmap, mode_user_id_beatmap_mods, beatmap_id, beatmapset_id, mods_bitwise fields & remove beatmap, beatmapset, and user fields', () => {
    /*
     * If the osu!API v2 score returned the following fields ...
     * mode_int = 1
     * user_id - 2
     * beatmap.id = 3
     * beatmapset.id = 4
     * mods = []
     *
     * ... the correct format for the fields are
     * mode_user_id = '1~2'
     * mode_user_id_beatmap = '1~2~3'
     * mode_user_id_beatmap_mods = '1~2~3~0'
     *
     * Note: For mode_user_id_beatmap_mods this field, the 0 reperesent the mods_bitwise.
     *        Please refer to the enum values and how mods_bitwise is calculated in mods_to_bitwise.ts
     */
    const expected_additions: Array<object> = [
      {
        mode_user_id: '0~1602343',
        mode_user_id_beatmap: '0~1602343~1644684',
        mode_user_id_beatmap_mods: '0~1602343~1644684~0',
        mods_bitwise: 0,
        beatmap_id: 1644684,
        beatmapset_id: 783213,
      },
      {
        mode_user_id: '0~1602343',
        mode_user_id_beatmap: '0~1602343~1069082',
        mode_user_id_beatmap_mods: '0~1602343~1069082~0',
        mods_bitwise: 0,
        beatmap_id: 1069082,
        beatmapset_id: 412460,
      },
      {
        mode_user_id: '0~1602343',
        mode_user_id_beatmap: '0~1602343~1069081',
        mode_user_id_beatmap_mods: '0~1602343~1069081~8',
        mods_bitwise: 8,
        beatmap_id: 1069081,
        beatmapset_id: 412460,
      },
      {
        mode_user_id: '0~1602343',
        mode_user_id_beatmap: '0~1602343~1069081',
        mode_user_id_beatmap_mods: '0~1602343~1069081~0',
        mods_bitwise: 0,
        beatmap_id: 1069081,
        beatmapset_id: 412460,
      },
      {
        mode_user_id: '0~1602343',
        mode_user_id_beatmap: '0~1602343~1069081',
        mode_user_id_beatmap_mods: '0~1602343~1069081~1',
        mods_bitwise: 1,
        beatmap_id: 1069081,
        beatmapset_id: 412460,
      },
    ];

    user_recent_query.forEach((score, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { beatmap, beatmapset, user, ...rest_of_osu_score } = score; // to remove beatmap, beatmapset, user fields
      const actual_dynamodb_osu_score: Dynamodb_Osu_Score =
        create_dynamodb_osu_score(score as Osu_Score);

      const expected_dynamodb_osu_score = {
        ...expected_additions[index],
        ...rest_of_osu_score,
      };

      expect(actual_dynamodb_osu_score).toEqual(expected_dynamodb_osu_score);
    });
  });

  it('should throw an error if a required field from API is missing', () => {
    // required fields from osu!API v2 are mods, mode_int, beatmap.id, beatmapset.id, user.id
    interface Missing_Field {
      mods?: Array<string>;
      mode_int?: number;
      beatmap?: { id?: number };
      beatmapset?: { id?: number };
      user?: { id?: number };
    }

    const missing_mode_int: Missing_Field = _.cloneDeep(user_recent_query[0]);
    delete missing_mode_int.mode_int;

    const missing_beatmap: Missing_Field = _.cloneDeep(user_recent_query[0]);
    delete missing_beatmap.beatmap;

    const missing_beatmap_id: Missing_Field = _.cloneDeep(user_recent_query[0]);
    if (missing_beatmap_id.beatmap) {
      delete missing_beatmap_id.beatmap.id;
    }

    const missing_beatmapset: Missing_Field = _.cloneDeep(user_recent_query[0]);
    delete missing_beatmapset.beatmapset;

    const missing_beatmapset_id: Missing_Field = _.cloneDeep(
      user_recent_query[0],
    );
    if (missing_beatmapset_id.beatmapset) {
      delete missing_beatmapset_id.beatmapset.id;
    }

    const missing_user: Missing_Field = _.cloneDeep(user_recent_query[0]);
    delete missing_user.user;

    const missing_user_id: Missing_Field = _.cloneDeep(user_recent_query[0]);
    if (missing_user_id.user) {
      delete missing_user_id.user.id;
    }

    const missing_mods: Missing_Field = _.cloneDeep(user_recent_query[0]);
    delete missing_mods.mods;

    expect(() => {
      create_dynamodb_osu_score(missing_mode_int as never);
    }).toThrow(
      new Error('Detected missing field in create_dynamodb_osu_score'),
    );

    expect(() => {
      create_dynamodb_osu_score(missing_beatmap as never);
    }).toThrow(
      new Error('Detected missing field in create_dynamodb_osu_score'),
    );

    expect(() => {
      create_dynamodb_osu_score(missing_beatmap_id as never);
    }).toThrow(
      new Error('Detected missing field in create_dynamodb_osu_score'),
    );

    expect(() => {
      create_dynamodb_osu_score(missing_beatmapset as never);
    }).toThrow(
      new Error('Detected missing field in create_dynamodb_osu_score'),
    );

    expect(() => {
      create_dynamodb_osu_score(missing_beatmapset_id as never);
    }).toThrow(
      new Error('Detected missing field in create_dynamodb_osu_score'),
    );

    expect(() => {
      create_dynamodb_osu_score(missing_user as never);
    }).toThrow(
      new Error('Detected missing field in create_dynamodb_osu_score'),
    );

    expect(() => {
      create_dynamodb_osu_score(missing_user_id as never);
    }).toThrow(
      new Error('Detected missing field in create_dynamodb_osu_score'),
    );

    expect(() => {
      create_dynamodb_osu_score(missing_mods as never);
    }).toThrow(
      new Error('Detected missing field in create_dynamodb_osu_score'),
    );
  });
});
