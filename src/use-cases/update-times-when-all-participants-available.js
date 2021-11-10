module.exports = function makeUpdateTimesWhenAllParticipantsAvailable(roomsDb) {
  return async function updateTimesWhenAllParticipantsAvailable(roomId, userId, availability) {
    await roomsDb.updateAvailability(roomId, userId, availability);

    
  };
};