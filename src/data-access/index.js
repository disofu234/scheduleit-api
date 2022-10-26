const { MongoClient } = require('mongodb');
const makeEventsDb = require('./events-db');

const dbName = 'scheduleit-db';
const client = new MongoClient(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

async function makeDb() {
  console.log('Connecting to database...')
  if (!client.isConnected()) {
    await client.connect();
  }
  console.log('Database connection succesfully established')
  return client.db(dbName);
};

const eventsDb = makeEventsDb(makeDb);
module.exports = eventsDb;