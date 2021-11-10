const { modifyAvailability } = require('@use-cases');

module.exports = async function putAvailability(request) {
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const availability = request.body;
    const { roomId, userId } = request.params;
    await modifyAvailability(roomId, userId, availability);
    return {
      headers,
      statusCode: 201
    };
  } catch (e) {
    console.log(e);
    return {
      headers,
      statusCode: 404,
      body: {
        error: e.message
      }
    };
  };
};