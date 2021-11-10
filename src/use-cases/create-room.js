const { makeRoom } = require('@entities');

module.exports = function makeCreateRoom(roomsDb) {
  return async function createRoom(roomParams) {
    const room = makeRoom(roomParams);
    return await roomsDb.insertRoom(room);
  };
};