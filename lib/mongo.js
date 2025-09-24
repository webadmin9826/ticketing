const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable');
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

module.exports = clientPromise;
