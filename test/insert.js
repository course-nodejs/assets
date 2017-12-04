'use strict'
const config = require('../config/default.js')
const MongoClient = require('mongodb').MongoClient
const asset_service = require('../index.js')
const tap = require('tap')

asset_service.init(function() {
  tap.test('test insert', function(childTest) {
    asset_service.insert({ name:'Sedia',state:'wait'}, function(err, res) {
	  MongoClient.connect(config.db.dsn, config.db.options, function (err, db) {
        if (err) throw err
        db.collection(config.db.collection_name).find({name: 'Sedia', state:'wait'}).toArray(function (err, res) { 
          if (err) throw err
          db.close()
          childTest.end()
        })
      })
    })
  })
})
    
