module.exports = function makeModifyAvailability(roomsDb) {
  return async function modifyAvailability(roomId, userId, availability) {
    await roomsDb.updateAvailability(roomId, userId, availability);

    
  };
};