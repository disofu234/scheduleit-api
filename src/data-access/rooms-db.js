const { ObjectId } = require('mongodb');

module.exports = function makeRoomsDb(makeDb) {
  async function _findById(id) {
    const db = await makeDb();
    const query = { _id: new ObjectId(id) };
    const projection = { _id: 0 };
    const result = await db.collection('rooms').findOne(query, { projection });
    if (result === null) {
      throw new Error(`Could not find room ${id}`);
    };
    return result;
  };

  async function findRoomMetadata(id) {
    const { 
      firstHourInDay, 
      lastHourInDay,
      minuteGranularity,
      weeks
    } = await _findById(id);

    return {
      firstHourInDay,
      lastHourInDay,
      minuteGranularity,
      weeks
    };
  };

  async function findRoomWithAuth(id) {
    return await _findById(id);
  };

  async function findUserAvailability(roomId, userId) {
    const { users } = await _findById(roomId);

    if (!users.hasOwnProperty(userId)) {
      throw new Error(`Could not find user ${userId} in room ${roomId}`);
    };

    return users[userId].availability;
  };

  async function updateAvailability(roomId, userId, availability) {
    const db = await makeDb();
    const query = { '_id': new ObjectId(roomId) };
    const updateDocument = {
      $set: {
        ["users." + userId + ".availability"]: availability
      }
    };
    const result = await db.collection('rooms').updateOne(query, updateDocument);
    if (result.matchedCount === 0) {
      throw new Error(`Could not find room ${roomId}`);
    };
  };

  async function insertRoom(room) {
    const db = await makeDb();
    const result = await db.collection('rooms').insertOne(room);
    if (result.insertedCount !== 1) {
      throw new Error('Could not create room');
    };
    return result.insertedId;
  };

  return Object.freeze({
    findRoomMetadata,
    findUserAvailability,
    findRoomWithAuth,
    updateAvailability,
    insertRoom
  });
};