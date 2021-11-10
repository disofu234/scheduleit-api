module.exports = function makeFetchAvailability(roomsDb) {
  return async function fetchAvailability(roomId, userId) {
    return await roomsDb.findUserAvailability(roomId, userId);
  };
};