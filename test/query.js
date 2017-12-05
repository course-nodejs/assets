'use strict'

const config = require('../config/default.js')
const MongoClient = require('mongodb').MongoClient
const asset_service = require('../index.js')
const tap = require('tap')

asset_service.init(function () {
  tap.test('test query', function (childTest) {
    asset_service.insert({ name: 'Sedia', state: 'wait'}, function (err, res) {
      if (err) throw err
      asset_service.queryState(res.uuid, function (err, res) {
        if (err) throw err
        console.log(res)
        childTest.equal(res, 'wait')
        childTest.end()
      })
    })
  })
})
