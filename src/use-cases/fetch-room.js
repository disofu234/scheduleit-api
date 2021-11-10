module.exports = function makeFetchRoom(roomsDb) { 
  return async function fetchRoom(roomId) {
    return await roomsDb.findRoomMetadata(roomId);
  };
};