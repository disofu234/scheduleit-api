const { MongoClient } = require('mongodb');
const makeEventsDb = require('./events-db');

const uri = 'mongodb+srv://scheduleit-dev:Dd(Amd5-{m>,Uq42@cluster0.29gek.mongodb.net/scheduleit-db?retryWrites=true&w=majority';
const dbName = 'scheduleit-db';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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