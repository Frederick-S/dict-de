var colors = require('colors/safe');

module.exports = function (word) {
    if (word === null || !word.valid) {
        return;
    }
    
    console.log(colors.cyan(word.name));
    console.log('');
    
    if (word.explanations.length > 0) {
        console.log(colors.yellow('Bedeutungen:'));
        
        for (var i = 0, length = word.explanations.length; i < length; i++) {
            console.log(colors.green(word.explanations[i]));
        }
        
        console.log('');
    }
    
    if (word.examples.length > 0) {
        console.log(colors.yellow('Beispiele:'));
        
        for (var i = 0, length = word.explanations.length; i < length; i++) {
            console.log(colors.green(word.examples[i]));
        }
    }
};