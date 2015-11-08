var deferred = require('deferred');
var request = require('request');

var api = 'https://de.wiktionary.org/w/api.php?format=json&action=query&prop=extracts&rvprop=content&titles=';

module.exports = function (word) {
    var def = deferred();
    
    if (!word) {
        return def.reject('Invalid word.');
    }
    
    var options = {
        url: api + word
    };
    
    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            return def.resolve(body);
        } else {
            return def.reject('Request error.');
        }
    });
    
    return def.promise;
};