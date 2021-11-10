const { fetchRoom } = require('@use-cases');

module.exports = async function getRoom(request) {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  try {
    const room = await fetchRoom(request.params.roomId);
    return {
      headers,
      statusCode: 200,
      body: room
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