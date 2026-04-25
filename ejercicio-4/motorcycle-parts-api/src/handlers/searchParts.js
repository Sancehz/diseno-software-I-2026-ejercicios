const PartService = require('../services/PartService');

const partService = new PartService();

module.exports.handler = async (event) => {
  try {
    // Get type parameter from query string
    const type = event.queryStringParameters?.type;

    // Search parts
    const parts = await partService.searchParts(type);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: type 
          ? `Found ${parts.length} parts of type "${type}"` 
          : `Found ${parts.length} parts`,
        data: parts.map(part => part.toJSON())
      })
    };
  } catch (error) {
    console.error('Error in searchParts handler:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};
