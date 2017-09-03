var assert = require('assert');

const db = require('../db/db.js')

describe('db', function() {
  describe('addTask', function() {
    it('should successfully add a task when given one', function() {
      return db.addTask("sdfsd");
    });
    it('should error if given a blank task', function() {
      return db.addTask("")
        .catch(function(err){
          assert.deepEqual(err, new Error());
        });
    });
  });
});
