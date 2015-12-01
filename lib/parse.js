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

                word.name = page.title;
                word.valid = true;

                var i = 0;
                var length = 0;
                var $ = cheerio.load(content);
                var $explanationListTitle = $('p[title=\'Sinn und Bezeichnetes (Semantik)\']');
                var $explanationList = $explanationListTitle.next().children();

                for (i = 0, length = $explanationList.length; i < length; i++) {
                    var explanation = $($explanationList[i]).text();

                    word.explanations.push(explanation);
                }

                var $exampleListTitle = $('p[title=\'Verwendungsbeispielsätze\']');
                var $exampleList = $exampleListTitle.next().children();

                for (i = 0, length = $exampleList.length; i < length; i++) {
                    var example = $($exampleList[i]).text();

                    // It may only contain index number like [3], [4a]
                    if (!/^\s*\[\d{1,2}\w?\]\s*$/i.test(example)) {
                        word.examples.push(example);
                    }
                }

                break;
            }
        }
    } catch (error) {
        word.valid = false;
    }

    return word;
};
