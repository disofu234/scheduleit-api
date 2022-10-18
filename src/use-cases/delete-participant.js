const { aggregateAvailabilities } = require('@entities/availability')

module.exports = function makeDeleteParticipant(eventsDb) {
  return async function deleteParticipant(eventId, participant) {
    const { 
      earliestHourEventCanTakePlaceIn,
      latestHourEventCanTakePlaceIn,
      datesEventCanTakePlaceIn,
      participants 
    } = await eventsDb.getEventById(eventId)

    if (!(participant in participants)) {
      throw new Error(`Participant [${participant}] does not exist in event [${eventId}]`)
    }

    delete participants[participant]

    const aggregatedAvailabilities = 
      aggregateAvailabilities(
        Object.keys(participants).map(name => ({ name, ...participants[name] })),
        earliestHourEventCanTakePlaceIn,
        latestHourEventCanTakePlaceIn,
        datesEventCanTakePlaceIn
      )

    await eventsDb.updateEvent(eventId, { participants, aggregatedAvailabilities });

    return aggregatedAvailabilities
  }
}