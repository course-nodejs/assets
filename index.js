'use strict'
const uuidv1 = require('uuid/v1')

function Asset(collection) {
 this.collection = collection
}   

Asset.prototype.insert = function(asset, callback) {
  asset.uuid = uuidv1()
  this.collection.insertOne(asset, function (err, res) {
    if (err) return callback(err)
    callback(null, asset)
  })
}

Asset.prototype.updateState = function (uuid, state, callback) {
  this.collection.updateOne({uuid: uuid}, {state: state}, function (err, res) {
    if (err) return callback(err)
    callback(null, res)
  })
}

Asset.prototype.updateState = function (uuid, callback) {
  this.collection.find({uuid: uuid}).toArray(function (err, res) {
  if (err) return callback(err)
    callback(null, res[0].state)
  })
}

module.exports = Asset;
