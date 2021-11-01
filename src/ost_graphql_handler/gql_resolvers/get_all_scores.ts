import scores from '../test_scores/scores.json';
import beatmaps from '../test_scores/beatmap.json';
import beatmapsets from '../test_scores/beatmapset.json';
import users from '../test_scores/users.json';

export const get_all_scores = () => {
  const score_with_full_details = scores.map((score) => {
    const { user_id, beatmap_id, beatmapset_id, ...rest_of_score_object } =
      score;

    const beatmap = beatmaps.find((beatmap) => beatmap.id === beatmap_id);
    const beatmapset = beatmapsets.find(
      (beatmapset) => beatmapset.id === beatmapset_id,
    );
    const user = users.find((user) => user.id === user_id);

    return {
      user_id,
      beatmap,
      beatmapset,
      user,
      ...rest_of_score_object,
    };
  });

  return score_with_full_details;
};
