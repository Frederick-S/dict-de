var assert = require('assert');
var query = require('./lib/query.js');
var parse = require('./lib/parse.js');

describe('Query word', function () {
    it('Query empty string', function (done) {
        query('').done(function (data) {}, function (message) {
            assert.equal('Invalid word.', message);
            
            done();
        });
    });
    
    it('Query non empty string', function (done) {
        query('fahren').done(function (data) {
            assert.notEqual('Request error.', data);
            
            done();
        }, function (message) {
            assert.equal('Request error.', message);
            
            done();
        });
    });
});

describe('Parse data', function () {
    it('Parse invalid word', function (done) {
        query('sdf8234').done(function (data) {
            assert.notEqual('Request error.', data);
            
            var word = parse(data);
            
            assert.equal(false, word.valid);
            
            done();
        }, function (message) {
            assert.equal('Request error.', message);
            
            done();
        });
    });
    
    it('Parse valid word', function (done) {
        query('fahren').done(function (data) {
            assert.notEqual('Request error.', data);
            
            var word = parse(data);
            
            assert.equal('fahren', word.name);
            assert.equal(true, word.valid);
            assert.equal(10, word.explanations.length);
            assert.equal(8, word.examples.length);
            
            done();
        }, function (message) {
            assert.equal('Request error.', message);
            
            done();
        });
    });
});
