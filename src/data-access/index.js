const { MongoClient } = require('mongodb');
const makeRoomsDb = require('./rooms-db');

const uri = 'mongodb+srv://scheduleit-dev:Dd(Amd5-{m>,Uq42@cluster0.29gek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName = 'scheduleit-db';
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function makeDb() {
  console.log('Connecting to database...')
  if (!client.isConnected()) {
    await client.connect();
  }
  console.log('Database connection succesfully established')
  return client.db(dbName);
};

const roomsDb = makeRoomsDb(makeDb);
module.exports = roomsDb;