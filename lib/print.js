var colors = require('colors/safe');

module.exports = function (word) {
    if (word === null || !word.valid) {
        return;
    }

    console.log(colors.cyan(word.name));
    console.log('');

    var i = 0;
    var length = 0;

    if (word.explanations.length > 0) {
        console.log(colors.yellow('Bedeutungen:'));

        for (i = 0, length = word.explanations.length; i < length; i++) {
            console.log(colors.green(word.explanations[i]));
        }

        console.log('');
    }

    if (word.examples.length > 0) {
        console.log(colors.yellow('Beispiele:'));

        for (i = 0, length = word.examples.length; i < length; i++) {
            console.log(colors.green(word.examples[i]));
        }
    }
};
