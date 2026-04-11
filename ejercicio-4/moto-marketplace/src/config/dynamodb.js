const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const isLocal =
  process.env.NODE_ENV !== 'production' ||
  process.env.DYNAMODB_ENDPOINT?.includes('localhost');

const clientConfig = isLocal
  ? {
      region: 'us-east-1',
      endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
      credentials: {
        accessKeyId: 'local',
        secretAccessKey: 'local',
      },
    }
  : {
      region: process.env.AWS_REGION || 'us-east-1',
    };

const dynamoClient = new DynamoDBClient(clientConfig);

const docClient = DynamoDBDocumentClient.from(dynamoClient, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertEmptyValues: false,
  },
});

module.exports = { docClient };
