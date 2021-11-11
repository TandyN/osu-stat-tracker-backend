interface User_Id {
  user_id: number;
  mode_int: number;
}

export const get_user_scores = async (
  parent: unknown,
  { user_id, mode_int }: User_Id,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { documentClient }: any,
) => {
  const params = {
    TableName: `${process.env.DDB_OSU_SCORES_TABLE}`,
    KeyConditionExpression: 'mode_user_id = :mode_user_id',
    ExpressionAttributeValues: {
      ':mode_user_id': `${mode_int}~${user_id}`,
    },
  };

  const all_user_scores = await documentClient.query(params).promise();

  return all_user_scores.Items;
};
