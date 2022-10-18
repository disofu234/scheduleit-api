const { getListOfTimesBetween } = require("@entities/time");
const { isObject } = require("lodash")

const constructAvailabilityObject = (
  earliestHour, 
  latestHour,
  dates,
) => {
  const availabilityInDayObject = getListOfTimesBetween(earliestHour, latestHour, MINUTE_GRANULARITY).reduce(addEntry(false), {});
  
  return dates.reduce(addEntry(availabilityInDayObject), {});
}

const constructEmptyAggregatedAvailabilitiesObject = (
  earliestHour, 
  latestHour,
  dates,
) => {
  const aggregatedAvailabilityInDayObject = getListOfTimesBetween(earliestHour, latestHour, MINUTE_GRANULARITY).reduce(
    (obj, time) => ({ ...obj, [time]: [] }), 
    {}
  );
  
  return dates.reduce(addEntry(aggregatedAvailabilityInDayObject), {});
}

const aggregateAvailabilities = (
  participants,
  earliestHour,
  latestHour,
  dates
) => {
  const aggregatedAvailabilities = 
    constructEmptyAggregatedAvailabilitiesObject(
      earliestHour,
      latestHour,
      dates
    )

  participants.forEach(
    participant => Object.keys(aggregatedAvailabilities).forEach(
      date => 
        Object.keys(aggregatedAvailabilities[date]).filter(time => participant.availability[date][time]).forEach(time => aggregatedAvailabilities[date][time].push(participant.name))
    )
  )

  return aggregatedAvailabilities
}

const MINUTE_GRANULARITY = 15

const addEntry = val => (obj, key) => ({ ...obj, [key]: val });

module.exports = { constructAvailabilityObject, constructEmptyAggregatedAvailabilitiesObject, aggregateAvailabilities };