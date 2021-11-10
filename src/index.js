require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
  expressCallback,
  getRoom,
  getRoomWithAuth,
  getAvailability,
  putAvailability,
  postRoom
} = require('@controllers');

const app = express();

const port = 2000;

app.use(cors());
app.use(bodyParser.json());

app.get('/room/:roomId', expressCallback(getRoom));
app.get('/room/:roomId/auth', expressCallback(getRoomWithAuth));
app.get('/room/:roomId/availability/:userId', expressCallback(getAvailability));
app.put('/room/:roomId/availability/:userId', expressCallback(putAvailability));
app.post('/room', expressCallback(postRoom));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});