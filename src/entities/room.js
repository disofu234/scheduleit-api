const { constructAvailabilityObject } = require("@entities/availability");
const { getListOfTimesBetween } = require("@entities/time");

module.exports = function buildMakeRoom(hash, cloneDeep) {
  return function makeRoom({
    firstHourInDay,
    lastHourInDay,
    minuteGranularity,
    weeks,
    users
  }) {
    if (!isMilitaryHour(firstHourInDay)) throw new Error('firstHourInDay must be an integer x such that 0 <= x <= 24');

    if (!isMilitaryHour(lastHourInDay)) throw new Error('lasttHourInDay must be an integer x such that 0 <= x <= 24');

    if (!VALID_MINUTE_GRANULARITIES.includes(minuteGranularity)) throw new Error('minuteGranularity must be an integer and one of 5, 10, 15, 20, or 30');

    const invalidEmails = users.map(({ email }) => email).filter(email => !EMAIL_REGEX.test(email));
    if (invalidEmails.length > 0) throw new Error(`${invalidEmails.join(', ')} are not valid emails`);

    const timesInDay = getListOfTimesBetween(firstHourInDay, lastHourInDay, minuteGranularity);

    const usersObject = users.reduce((usersObject, { name, email }) => 
      assign(
        usersObject,
        hash(email),
        { 
          name, 
          email, 
          availability: constructAvailabilityObject(timesInDay, weeks) }
      ),
    {});

    return {
      firstHourInDay,
      lastHourInDay,
      minuteGranularity,
      weeks,
      users: usersObject
    };
  };
};

const VALID_MINUTE_GRANULARITIES = [5, 10, 15, 20, 30];
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const isMilitaryHour = (hour) =>
  typeof hour === 'number' &&
  Number.isInteger(hour) &&
  hour >= 0 &&
  hour <= 24;

const assign = (obj, key, val) => ({ ...obj, [key]: val });