const config = require('./config/default.js')
const Asset = require('./index.js')
const MongoClient = require('mongodb').MongoClient

MongoClient.connect(config.db.dsn, config.db.options, function (err, db) {
  var asset = new Asset(db.collection(config.db.collection_name)) 
  asset.insert({name: 'Tavolo', state: 'wait'}, function (err, res) {
    if (err) throw err
    db.close()
  })
})
