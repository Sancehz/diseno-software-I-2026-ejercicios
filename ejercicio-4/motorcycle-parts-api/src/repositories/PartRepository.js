const AWS = require('aws-sdk');
const Part = require('../models/Part');

class PartRepository {
  constructor() {
    // Configure DynamoDB for local development
    const dynamoDBConfig = {
      region: 'localhost',
      endpoint: 'http://localhost:8000',
      accessKeyId: 'DEFAULT_ACCESS_KEY',
      secretAccessKey: 'DEFAULT_SECRET'
    };

    this.dynamoDB = new AWS.DynamoDB.DocumentClient(dynamoDBConfig);
    this.tableName = process.env.PARTS_TABLE;
  }

  async create(part) {
    const params = {
      TableName: this.tableName,
      Item: part.toJSON()
    };

    try {
      await this.dynamoDB.put(params).promise();
      return part;
    } catch (error) {
      console.error('Error creating part:', error);
      throw new Error('Could not create part');
    }
  }

  async findByType(type) {
    const params = {
      TableName: this.tableName,
      IndexName: 'TypeIndex',
      KeyConditionExpression: '#type = :type',
      ExpressionAttributeNames: {
        '#type': 'type'
      },
      ExpressionAttributeValues: {
        ':type': type
      }
    };

    try {
      const result = await this.dynamoDB.query(params).promise();
      return result.Items.map(item => new Part(item));
    } catch (error) {
      console.error('Error querying parts by type:', error);
      throw new Error('Could not query parts');
    }
  }

  async findAll() {
    const params = {
      TableName: this.tableName
    };

    try {
      const result = await this.dynamoDB.scan(params).promise();
      return result.Items.map(item => new Part(item));
    } catch (error) {
      console.error('Error scanning parts:', error);
      throw new Error('Could not retrieve parts');
    }
  }
}

module.exports = PartRepository;
