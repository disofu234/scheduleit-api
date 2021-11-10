const constructTime = (hour, minute = 0) => () => {

  const padWithZeroIfSingleCharacter = (number) => {
    if (number < 10) return "0" + number.toString();
    return number.toString();
  };

  return {
    hour, 
    minute, 
  
    isEqualTo(time) {
      return this.hour === time.hour
        && this.minute === time.minute;
    },
  
    isEarlierThan(time) {
      if (this.hour === time.hour) {
        return this.minute < time.minute;
      }
  
      return this.hour < time.hour;
    },
  
    addMinutes(minutes) {
      const hoursOver = Math.floor((this.minute + minutes) / 60);
      const minutesOver = (this.minute + minutes) % 60;
  
      return constructTime(this.hour + hoursOver, minutesOver);
    },
  
    getListOfTimesTo(time, minuteGranularity) {
      const listOfTimes = [];
      let currTime = this.addMinutes(minuteGranularity);
  
      while (currTime.isEarlierThan(time) || currTime.isEqualTo(time)) {
        listOfTimes.push(currTime);
        currTime = currTime.addMinutes(minuteGranularity);
      };
    
      return listOfTimes;
    },
    
    toStringMilitaryForm() {
      return padWithZeroIfSingleCharacter(this.hour) + ":"
        + padWithZeroIfSingleCharacter(this.minute);
    },
  };
}

const getListOfTimesBetween = (firstHour, secondHour, minuteGranularity) => 
  constructTime(firstHour).getListOfTimesTo(constructTime(secondHour), minuteGranularity).map(time => time.toStringMilitaryForm());

module.exports = { getListOfTimesBetween };