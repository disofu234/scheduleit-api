const { 
  aggregateAvailabilities,
  convertTimesBasedOnTimeZone,
  constructEmptyAggregatedAvailabilityArray
} = require('@use-cases/shared')

const { STANDARD_TIMEZONE } = require('@utils/constants')

module.exports = function makeUpdateParticipant(eventsDb) {
  return async function updateParticipant(eventId, participant, availability, timeZone) {
    console.log(`updating availability for participant '${participant}', is availability null? ${availability == null}`)
    const event = await eventsDb.getEventById(eventId)

    if (!availability && !event.participantAvailabilities[participant]) {
      availability = constructEmptyAggregatedAvailabilityArray(
        event.earliestHourEventCanTakePlaceIn,
        event.latestHourEventCanTakePlaceIn,
        event.datesEventCanTakePlaceIn,
        event.timeZone)
    }

    if (!timeZone) {
      timeZone = event.timeZone
    }

    if (!(!availability && event.participantAvailabilities[participant])) {
      console.log("updating availability")
      await eventsDb.updateAvailability(
        eventId, 
        participant, 
        convertTimesBasedOnTimeZone(availability, timeZone, STANDARD_TIMEZONE))
    }

    const newEvent = await eventsDb.getEventById(eventId)

    return { 
      participants: Object.keys(newEvent.participantAvailabilities), 
      aggregatedAvailabilities: aggregateAvailabilities(newEvent) 
    }
  }
}