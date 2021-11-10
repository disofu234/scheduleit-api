module.exports = constructAvailabilityObject;

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const constructAvailabilityObject = (timesInDay, weeks) => 
  weeks.reduce(addEntry(constructAvailabilityInWeekObject(timesInDay)), {});

const constructAvailabilityInWeekObject = (timesInDay) =>
  DAYS.reduce(addEntry(constructAvailabilityInDayObject(timesInDay)), {});

const constructAvailabilityInDayObject = (timesInDay) =>
  timesInDay.reduce(addEntry(false), {});

const addEntry = val => (obj, key) => ({ ...obj, [key]: val });