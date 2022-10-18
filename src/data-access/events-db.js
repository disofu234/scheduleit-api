module.exports = function makeEventsDb(makeDb) {
  async function getEventById(id) {
    const db = await makeDb();
    const query = { _id: id };
    const projection = { _id: 0 };
    const result = await db.collection('events').findOne(query, { projection });
    if (result === null) {
      throw new Error(`Could not find event [${id}]`);
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

  async function updateEvent(eventId, eventUpdate) {
    const db = await makeDb();
    const query = { '_id': eventId };
    const updateDocument = {
      $set: eventUpdate
    };
    const result = await db.collection('events').updateOne(query, updateDocument);
    if (result.matchedCount === 0) {
      throw new Error(`Could not find event [${eventId}]`);
    };
  }

  async function updateParticipants(eventId, participants) {
    const db = await makeDb();
    const query = { '_id': eventId };
    const updateDocument = {
      $set: {
        participants,
      }
    };
    const result = await db.collection('events').updateOne(query, updateDocument);
    if (result.matchedCount === 0) {
      throw new Error(`Could not find event [${eventId}]`);
    };
  };

  async function updateAvailability(eventId, participant, availability) {
    const db = await makeDb();
    const query = { '_id': eventId };
    const updateDocument = {
      $set: {
        [`participantAvailabilities.${participant}`]: availability
      }
    };
    const result = await db.collection('events').updateOne(query, updateDocument);
    if (result.matchedCount === 0) {
      throw new Error(`Could not find event ${eventId}`);
    };
  };

  async function addEvent(event) {
    const db = await makeDb();
    const result = await db.collection('events').insertOne(event);
    if (result.insertedCount !== 1) {
      throw new Error('Could not create room');
    };
    return result.insertedId;
  };

  return Object.freeze({
    findRoomMetadata,
    findUserAvailability,
    findRoomWithAuth,
    addEvent,
    getEventById,
    updateEvent,
    updateParticipants,
    updateAvailability
  });
};