const PartService = require('../services/PartService');

const partService = new PartService();

module.exports.handler = async (event) => {
  try {
    // Parse request body
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          error: 'Invalid JSON in request body'
        })
      };
    }

    // Create part
    const part = await partService.createPart(body);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: 'Part created successfully',
        data: part.toJSON()
      })
    };
  } catch (error) {
    console.error('Error in createPart handler:', error);
    
    return {
      statusCode: 400,
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
