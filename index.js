var colors = require('colors/safe');
var query = require('./lib/query.js');
var parse = require('./lib/parse.js');
var print = require('./lib/print.js');

module.exports = function (word) {
    query(word).done(function (data) {
        var word = parse(data);
        
        print(word);
    }, function (message) {
        console.log(colors.red(message));
    });
};