var cheerio = require('cheerio');
var Word = require('./word.js');

module.exports = function (data) {
    var word = new Word();
    
    try {
        var json = JSON.parse(data);
        var pages = json.query.pages;
        
        if (pages['-1']) {
            word.valid = false;
        } else {
            for (var key in pages) {
                var page = pages[key];
                var content = page.extract;
                
                word.name = page.title
                word.valid = true;
                
                var $ = cheerio.load(content);
                var $explanationListTitle = $('p[title=\'Sinn und Bezeichnetes (Semantik)\']');
                var $explanationList = $explanationListTitle.next().children();
                
                for (var i = 0, length = $explanationList.length; i < length; i++) {
                    var explanation = $($explanationList[i]).text();
                    
                    word.explanations.push(explanation);
                }
                
                var $exampleListTitle = $('p[title=\'Verwendungsbeispielsätze\']');
                var $exampleList = $exampleListTitle.next().children();
                
                for (var j = 0, length = $exampleList.length; j < length; j++) {
                    var example = $($exampleList[j]).text();
                    
                    word.examples.push(example);
                }
                
                break;
            }
        }
    } catch (error) {
        word.valid = false;
    }
    
    return word;
};