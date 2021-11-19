import { Osu_Score, User } from '../../../osu_api/ts_interfaces/Osu_Score';

export const create_dynamodb_osu_user = (score: Osu_Score): User => {
  if (score.user) {
    if (score.user.id) {
      return {
        ...score.user,
      };
    }
  }
  throw new Error('No user found in create_dynamodb_osu_user');
};
