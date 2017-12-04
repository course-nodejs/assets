const config = require('./config/default.js')
const MongoClient = require('mongodb').MongoClient
const uuidv1 = require('uuid/v1');


module.exports = {
 // crea/svuota collection
 init: function(callback){
   MongoClient.connect(config.db.dsn, config.db.options, function (err, db) {
    if (err) throw err
    //creo/svuoto la collection
    db.createCollection(config.db.collection_name, function (err) {
      if (err) throw err
      db.collection(config.db.collection_name).drop(function (err, dropped) {
        if (err) throw err
        db.close()
		callback(err)
      })
    })
   })
 },
 insert: function(asset, callback){
   MongoClient.connect(config.db.dsn, config.db.options, function (err, db) {
     if (err) return callback(err)
     //salvo i dati
     asset.uuid = uuidv1();
     db.collection(config.db.collection_name).insertOne(asset, function (err, res) { 
       if (err) callback(err)
       db.close()
       callback(err, asset)
     })
   })
 },
 updateState: function(uuid, state, callback){
   MongoClient.connect(config.db.dsn, config.db.options, function (err, db) {
     if (err) throw err
     //update
     db.collection(config.db.collection_name).updateOne({uuid: uuid}, {state:state}, function (err, res) { 
       if (err) throw err
       db.close()
       callback(err, res)
     })
   })
 },
 queryState: function(uuid, callback){
   MongoClient.connect(config.db.dsn, config.db.options, function (err, db) {
     if (err) throw err
     //query
     db.collection(config.db.collection_name).find({uuid: uuid}).toArray(function (err, res) { 
       if (err) throw err
       db.close()
       callback(err,res[0].state)
     })
   })
 }
}
