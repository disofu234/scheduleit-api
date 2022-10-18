require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
  expressCallback
} = require('@controllers')
const {
  createEvent,
  getEvent,
  updateParticipant,
} = require('@use-cases');

const app = express();

const port = 2000;

app.use(cors());
app.use(bodyParser.json());

app.post('/event', expressCallback(req => createEvent(req.body)))
app.get('/event/:eventId', expressCallback(req => getEvent(req.params.eventId)))
app.post('/event/:eventId', expressCallback(req => updateParticipant(req.params.eventId, req.body.participant, req.body.availability, req.body.timeZone)))

app.listen((process.env.PORT || port), () => {
  console.log(`App listening at ${port}`);
});