const eventsDb = require('@data-access');
const makeCreateEvent = require('./create-event');
const makeGetEvent = require('./get-event')
const makeUpdateParticipant = require('./update-participant.js');

const createEvent = makeCreateEvent(eventsDb);
const getEvent = makeGetEvent(eventsDb)
const updateParticipant = makeUpdateParticipant(eventsDb)

module.exports = {
  createEvent,
  getEvent,
  updateParticipant,
};