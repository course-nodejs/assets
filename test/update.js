'use strict'

const config = require('../config/default.js')
const MongoClient = require('mongodb').MongoClient
const asset_service = require('../index.js')
const tap = require('tap')

asset_service.init(function() {
  tap.test('test update', function(childTest) {
    asset_service.insert({ name:'Sedia',state:'wait'}, function(err, res) {
      if (err) throw err
      asset_service.updateState(res.uuid, 'operational', function(err, res) {
        if (err) throw err
	    MongoClient.connect(config.db.dsn, config.db.options, function (err, db) {
          db.collection(config.db.collection_name).find({name: 'Sedia', state:'operational'}).toArray(function (err, res) { 
            if (err) throw err
            db.close()
            childTest.end()
          })
        })
      })
    })
  })
})
