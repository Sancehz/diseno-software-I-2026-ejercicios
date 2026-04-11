/**
 * Script de seed manual para DynamoDB local.
 * Uso: node scripts/seed.js
 *
 * Requiere que DynamoDB local esté corriendo en puerto 8000
 * y que la tabla ya haya sido creada.
 */

const { DynamoDBClient, CreateTableCommand, DescribeTableCommand } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const partes = require('../seed/partes.json');

const client = new DynamoDBClient({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
  credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
});

const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = 'MotoPartes';

async function crearTabla() {
  try {
    await client.send(new DescribeTableCommand({ TableName: TABLE_NAME }));
    console.log(`✓ Tabla "${TABLE_NAME}" ya existe.`);
  } catch {
    console.log(`⟳ Creando tabla "${TABLE_NAME}"...`);
    await client.send(new CreateTableCommand({
      TableName: TABLE_NAME,
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'tipo', AttributeType: 'S' },
      ],
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'tipo-index',
          KeySchema: [{ AttributeName: 'tipo', KeyType: 'HASH' }],
          Projection: { ProjectionType: 'ALL' },
          ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
        },
      ],
      ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
    }));
    console.log(`✓ Tabla "${TABLE_NAME}" creada.`);
  }
}

async function sembrar() {
  console.log(`\n⟳ Insertando ${partes.length} partes de seed...\n`);
  let ok = 0;
  let errores = 0;

  for (const parte of partes) {
    try {
      await docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: parte }));
      console.log(`  ✓ ${parte.id} — ${parte.nombre}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${parte.id} — Error: ${err.message}`);
      errores++;
    }
  }

  console.log(`\n✓ Seed completo: ${ok} insertadas, ${errores} errores.\n`);
}

(async () => {
  try {
    await crearTabla();
    await sembrar();
  } catch (err) {
    console.error('Error en seed:', err.message);
    process.exit(1);
  }
})();
