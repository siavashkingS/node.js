const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

// Connect and cache the database instance
let db;

async function connect() {
  if (!db) {
    await client.connect();
    db = client.db('sample'); // Replace with your actual DB name
    console.log('✅ MongoDB Connected');
  }
  return db;
}

// Export a promise that resolves to the db instance
module.exports = connect();