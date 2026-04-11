const { PutCommand, QueryCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { docClient } = require('../config/dynamodb');

const TABLE_NAME = process.env.TABLE_NAME || 'MotoPartes';
const TIPO_INDEX = 'tipo-index';

/**
 * Repository: PartesRepository
 * Capa de acceso a datos — solo habla con DynamoDB.
 * No contiene lógica de negocio.
 */
const PartesRepository = {
  /**
   * Persiste una parte en DynamoDB.
   * @param {Object} item - Objeto listo para guardar (desde Parte.toItem())
   */
  async guardar(item) {
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
      ConditionExpression: 'attribute_not_exists(id)',
    });

    await docClient.send(command);
    return item;
  },

  /**
   * Lista partes filtrando por tipo usando el GSI.
   * @param {string} tipo
   * @returns {Array}
   */
  async listarPorTipo(tipo) {
    const command = new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: TIPO_INDEX,
      KeyConditionExpression: '#tipo = :tipo',
      ExpressionAttributeNames: {
        '#tipo': 'tipo',
      },
      ExpressionAttributeValues: {
        ':tipo': tipo.toLowerCase(),
      },
    });

    const result = await docClient.send(command);
    return result.Items || [];
  },

  /**
   * Lista todas las partes (sin filtro de tipo).
   * @returns {Array}
   */
  async listarTodas() {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
    });

    const result = await docClient.send(command);
    return result.Items || [];
  },
};

module.exports = { PartesRepository };
