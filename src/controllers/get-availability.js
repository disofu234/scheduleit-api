const { fetchAvailability } = require('@use-cases');

module.exports = async function getAvailabilityController(request) {
  const { roomId, userId } = request.params;
  const availability = await fetchAvailability(roomId, userId);
  return {
    headers,
    statusCode: 200,
    body: availability
  }
}