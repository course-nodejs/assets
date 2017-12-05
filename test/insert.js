'use strict'
const config = require('../config/default.js')
const MongoClient = require('mongodb').MongoClient
const Asset = require('../index.js')
const tap = require('tap')

const test = tap.test

const datatest = { name:'Sedia', state: 'wait' }

MongoClient.connect(config.db.dsn, config.db.options, function (err, db) {
  let asset = new Asset(db.collection(config.db.collection_name)) 
  
  test('test insert', function (childTest) {
    asset.insert({ name: 'Sedia', state: 'wait'}, function (err, res) {
      if (err) throw err
      db.collection(config.db.collection_name).find({name: 'Sedia', state: 'wait'}).toArray(function (err, res) {
        if (err) throw err
        db.close()
        childTest.end()
      })
    })
  })
})
