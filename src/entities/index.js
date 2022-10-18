const buildMakeEvent = require('./event');
const { DateTime } = require("luxon")

const makeEvent = buildMakeEvent(DateTime);

module.exports = {
  makeEvent
};