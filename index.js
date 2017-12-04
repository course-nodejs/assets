const config = require('./config/default.js')
const MongoClient = require('mongodb').MongoClient
const uuidv1 = require('uuid/v1');


module.exports = {
 // crea/svuota collection
 init: function(callback){
   MongoClient.connect(config.db.dsn, config.db.options, function (err, db) {
    if (err) return trow err
    //creo/svuoto la collection
    db.createCollection(config.db.collection_name, function (err) {
      if (err) return trow err
      db.collection(config.db.collection_name).drop(function (err, dropped) {
        if (err) trow err
		callback()
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
 updateState: function(uuid, state){
   MongoClient.connect(config.db.dsn, config.db.options, function (err, db) {
     if (err) return trow err
     //update
     db.collection(config.db.collection_name).updateOne({uuid: uuid}, {state:state}, function (err, res) { 
       if (err) trow err
       console.log(res)
       db.close()
     })
   })
 },
 queryState: function(uuid){
   MongoClient.connect(config.db.dsn, config.db.options, function (err, db) {
     if (err) return trow err
     //query
     db.collection(config.db.collection_name).find({uuid: uuid}).toArray(function (err, res) { 
       if (err) trow err
       console.log(res)
       db.close()
     })
   })
 }
}
