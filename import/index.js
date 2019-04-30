const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const csv = require('csvtojson');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'example';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collection = db.collection('vocab_items');

  csv({
    colParser: {
      'core-index': 'number',
      'optimized-voc-index2k+4kdefault': 'number',
      'vocab-frequency': 'number',
      'jlpt-level': 'number',
      'nukikame-core6k-optimized-voc-index': 'number',
      'vocab-audio': item => item.replace('[sound:', '').replace(']', ''),
      'sentence-audio': item => item.replace('[sound:', '').replace(']', ''),
      'image': item => item.replace(/^.*?src=\"\"(.+)\"\".*$/, '$1'),
    },
  })
    .fromFile('./import.csv')
    .on('json', jsonObj => {
      //console.log(jsonObj);
      collection.insert(jsonObj);
    })
    .on('done', err => {
      client.close();
    });
});
