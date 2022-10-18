const { aggregateAvailabilities } = require('@use-cases/shared')

module.exports = function makeGetEvent(eventsDb) {
  return async function getEvent(eventId) {
    const event = await eventsDb.getEventById(eventId)
    return { participants: Object.keys(event.participantAvailabilities), aggregatedAvailabilities: aggregateAvailabilities(event) }
  }
}