const { createRoom } = require('@use-cases');

module.exports = async function postRoom(request) {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  try {
    const roomParams = request.body
    const roomId = await createRoom(roomParams);
    return {
      headers,
      body: { roomId },
      statusCode: 201
    };
  } catch (e) {
    console.log(e);
    return {
      headers,
      statusCode: 400,
      body: {
        error: e.message
      }
    }
  }
}