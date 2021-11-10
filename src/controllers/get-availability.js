const { fetchAvailability } = require('@use-cases');

module.exports = async function getAvailability(request) {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  try {
    const { roomId, userId } = request.params;
    const availability = await fetchAvailability(roomId, userId);
    return {
      headers,
      statusCode: 200,
      body: availability
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
}