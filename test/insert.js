var tap = require('tap')
var asset_service = require('../index.js')

// Always call as (found, wanted) by convention
asset_service.init(function() {
  tap.test('test insert', function(childTest) {
    asset_service.insert({ name:'Sedia',state:'wait'}, function(err, res) {
    }
  }
}
    
