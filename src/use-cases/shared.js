const { constructTime, constructTimeFromString } = require('@entities/time')
const { MINUTE_GRANULARITY, STANDARD_TIMEZONE } = require('@utils/constants')

const flatMap = (arr, mapFunc) =>
  arr.reduce((resultArr, x) => {
    return resultArr.concat(mapFunc(x))
  }, [])

const aggregateAvailabilities = ({ 
  earliestHourEventCanTakePlaceIn, 
  latestHourEventCanTakePlaceIn, 
  datesEventCanTakePlaceIn, 
  timeZone,
  participantAvailabilities
}) => {
  const aggregatedAvailabilities = convertTimesBasedOnTimeZone(
    constructEmptyAggregatedAvailabilityArray(
      earliestHourEventCanTakePlaceIn,
      latestHourEventCanTakePlaceIn,
      datesEventCanTakePlaceIn,
      timeZone),
    timeZone,
    STANDARD_TIMEZONE
  )

  Object.keys(participantAvailabilities).forEach((participant) => 
    participantAvailabilities[participant].forEach(({ isAvailable }, ind) => 
      isAvailable && aggregatedAvailabilities[ind].participantsAvailable.push(participant)))

  return aggregatedAvailabilities
}

const constructEmptyAggregatedAvailabilityArray = (
  earliestHour,
  latestHour,
  dates,
  timeZone
) => flatMap(
  dates,
  date => constructTime(earliestHour, 0, date, timeZone, false)
          .getListOfTimesTo(constructTime(latestHour, 0, date, timeZone, false).addMinutes(-MINUTE_GRANULARITY), MINUTE_GRANULARITY)
          .map(time => ({ 
            earlyTimeString: time.toStringWithDate(), 
            lateTimeString: time.addMinutes(MINUTE_GRANULARITY).toStringWithDate(), 
            participantsAvailable: []
          }))
)

const convertTimesBasedOnTimeZone = (times, sourceTimeZone, targetTimeZone) =>
  times
  .map(time => ({ 
    ...time,
    earlyTimeString: constructTimeFromString(time.earlyTimeString, sourceTimeZone).toZone(targetTimeZone).toStringWithDate(), 
    lateTimeString: constructTimeFromString(time.lateTimeString, sourceTimeZone).toZone(targetTimeZone).toStringWithDate(), 
  }))

module.exports = {
  aggregateAvailabilities,
  convertTimesBasedOnTimeZone,
  constructEmptyAggregatedAvailabilityArray
}