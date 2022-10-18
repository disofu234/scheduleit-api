const { DateTime } = require("luxon")

const constructTime = (hour, minute, date, timeZone) => {
  const dateTimeObj = DateTime.fromFormat(`${date} ${padWithZeroIfSingleCharacter(hour)}:${padWithZeroIfSingleCharacter(minute)}`, 'DD T', { zone: timeZone })

  return constructTimeFromDateTimeObj(dateTimeObj)
}

const constructTimeFromDateTimeObj = (dateTimeObj) => ({
  dateTimeObj,
  hour: dateTimeObj.hour,
  minute: dateTimeObj.minute,

  isEqualTo(time) {
    return this.dateTimeObj.toMillis() === time.dateTimeObj.toMillis()
  },

  isEarlierThan(time) {
    return this.dateTimeObj < time.dateTimeObj
  },

  isGreaterThan(time) {
    return this.dateTimeObj > time.dateTimeObj
  },

  isHour() {
    return this.minute === 0
  },

  addMinutes(minutes) {
    return constructTimeFromDateTimeObj(this.dateTimeObj.plus({ minutes }))
  },

  getListOfTimesTo(time, minuteGranularity) {
    const listOfTimes = []
    let currTime = this

    while (currTime.dateTimeObj <= time.dateTimeObj) {
      listOfTimes.push(currTime)
      currTime = currTime.addMinutes(minuteGranularity)
    };

    return listOfTimes
  },

  toString() {
    return this.dateTimeObj.toFormat('t')
  },

  toStringWithDate() {
    return this.dateTimeObj.toFormat('DD, T')
  },

  toStringWithoutMinutes() {
    return this.dateTimeObj.toFormat('h a')
  },

  toDate() {
    return this.dateTimeObj.toFormat('DD')
  },

  isValid() {
    return this.dateTimeObj.isValid
  },

  toZone(targetTimeZone) {
    return constructTimeFromDateTimeObj(this.dateTimeObj.setZone(targetTimeZone))
  },

  getNextTimeString(minuteGranularity) {
    return this.addMinutes(minuteGranularity).toStringMilitaryForm()
  },

  getPreviousTimeString(minuteGranularity) {
    return this.addMinutes(-minuteGranularity).toStringMilitaryForm()
  },

  isConsecutiveTo(time, minuteGranularity) {
    return this.addMinutes(minuteGranularity).isEqualTo(time) || this.addMinutes(-minuteGranularity).isEqualTo(time)
  }
})

const constructTimeFromString = (timeString, timeZone) => {
  const isDST = timeString[timeString.length - 1] === 'S'

  if (isDST) {
    timeString = timeString.slice(0, timeString.length - 1)
  }

  const splitTimeString = timeString.split(', ')
  const timeStringNoDate = splitTimeString[2]
  const date = [splitTimeString[0], splitTimeString[1]].join(', ')

  const hour = parseInt(timeStringNoDate.split(":")[0])
  const minute = parseInt(timeStringNoDate.split(":")[1])

  return constructTime(hour, minute, date, timeZone, isDST)
}

const getListOfTimesBetween = (firstHour, secondHour, minuteGranularity) => 
  constructTime(firstHour).getListOfTimesTo(constructTime(secondHour), minuteGranularity).map(time => time.toStringMilitaryForm())

const isMilitaryHour = (hour) =>
  typeof hour === 'number' &&
  Number.isInteger(hour) &&
  hour >= 0 &&
  hour <= 24

const padWithZeroIfSingleCharacter = (number) => {
  if (number < 10) return "0" + number.toString()
  return number.toString()
}

module.exports = { getListOfTimesBetween, isMilitaryHour, constructTime, constructTimeFromString };