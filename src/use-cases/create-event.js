const { makeEvent } = require('@entities');

module.exports = function makeCreateEvent(eventsDb) {
  return async function createEvent(eventParams) {
    const event = makeEvent(eventParams);
    const eventId = await eventsDb.addEvent(event);

    return { eventId }
  };
};