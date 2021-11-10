const roomsDb = require('@data-access');
const makeFetchRoom = require('./fetch-room');
const makeFetchAvailability = require('./fetch-availability');
const makeModifyAvailability = require('./modify-availability');
const makeCreateRoom = require('./create-room');
const makeFetchRoomWithAuth = require('./fetch-room-with-auth');

const fetchRoom = makeFetchRoom(roomsDb);
const fetchAvailability = makeFetchAvailability(roomsDb);
const modifyAvailability = makeModifyAvailability(roomsDb);
const createRoom = makeCreateRoom(roomsDb);
const fetchRoomWithAuth = makeFetchRoomWithAuth(roomsDb);

module.exports = { 
  fetchRoom,
  fetchRoomWithAuth,
  fetchAvailability,
  modifyAvailability,
  createRoom
};