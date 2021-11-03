import { DynamoDB } from 'aws-sdk';

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'test',
    secretAccessKey: 'test',
  };
}

export const documentClient = new DynamoDB.DocumentClient(options);
