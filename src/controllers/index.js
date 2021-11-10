const expressCallback = require('./express-callback');
const getRoom = require('./get-room');
const getAvailability = require('./get-availability');
const putAvailability = require('./put-availability');
const postRoom = require('./post-room');
const getRoomWithAuth = require('./get-room-with-auth');

module.exports = {
  expressCallback,
  getRoom,
  getAvailability,
  getRoomWithAuth,
  putAvailability,
  postRoom
};