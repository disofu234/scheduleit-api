const { 
  constructAvailabilityObject, 
  constructEmptyAggregatedAvailabilitiesObject,
} = require("@entities/availability");
const {
  isMilitaryHour
} = require("@entities/time");
const {
  VALID_TIMEZONES
} = require("@utils/constants")

module.exports = function buildMakeEvent(DateTime) {
  return function makeEvent({
    earliestHourEventCanTakePlaceIn,
    latestHourEventCanTakePlaceIn,
    datesEventCanTakePlaceIn,
    timeZone
  }) {
    if (!isMilitaryHour(earliestHourEventCanTakePlaceIn)) throw new Error(`earliestHourEventCanTakePlaceIn [${earliestHourEventCanTakePlaceIn}] must be an integer x such that 0 <= x <= 24`);
    if (!isMilitaryHour(latestHourEventCanTakePlaceIn)) throw new Error(`latestHourEventCanTakePlaceIn [${latestHourEventCanTakePlaceIn}] must be an integer x such that 0 <= x <= 24`);
    if (earliestHourEventCanTakePlaceIn >= latestHourEventCanTakePlaceIn) throw new Error(`earliestHourEventCanTakePlaceIn [${earliestHourEventCanTakePlaceIn}] must be less than latestHourEventCanTakePlaceIn [${latestHourEventCanTakePlaceIn}]`);

    datesEventCanTakePlaceIn.forEach(date => { if (!DateTime.fromFormat(date, 'MMM d, yyyy').isValid) throw new Error(`Date [${date}] is invalid (not in the format MMM d, yyyy)`) })

    return {
      _id: makeId(10),
      earliestHourEventCanTakePlaceIn,
      latestHourEventCanTakePlaceIn,
      datesEventCanTakePlaceIn,
      timeZone,
      participantAvailabilities: {}
    };
  };
};

const makeId = (length) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const ID_LENGTH = 10