import { documentClient } from '../../database/dynamodb';

interface UserId {
  id: number;
}

export const get_user_scores = async (parent: unknown, { id }: UserId) => {
  const params = {
    TableName: `${process.env.DDB_OST_SCORES_TABLE}`,
    KeyConditionExpression: 'user_id = :user_id',
    ExpressionAttributeValues: {
      ':user_id': id,
    },
  };

  const all_user_scores = await documentClient.query(params).promise();

  return all_user_scores.Items;
};
