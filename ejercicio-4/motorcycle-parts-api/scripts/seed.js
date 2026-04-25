const AWS = require('aws-sdk');
const seedData = require('../seed-data/parts.json');

// Configure DynamoDB for local
const dynamoDBConfig = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'DEFAULT_ACCESS_KEY',
  secretAccessKey: 'DEFAULT_SECRET'
};

const dynamoDB = new AWS.DynamoDB.DocumentClient(dynamoDBConfig);
const tableName = 'motorcycle-parts-api-parts-dev';

async function seedDatabase() {
  console.log('Starting database seeding...');
  
  try {
    for (const part of seedData) {
      const params = {
        TableName: tableName,
        Item: part
      };
      
      await dynamoDB.put(params).promise();
      console.log(`✓ Seeded part: ${part.name}`);
    }
    
    console.log('\n✓ Database seeded successfully!');
    console.log(`Total parts inserted: ${seedData.length}`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
