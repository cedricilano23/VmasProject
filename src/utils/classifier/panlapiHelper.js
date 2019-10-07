const panlapi = require('../data/panlapi')

const displayOutput = (current, status = false, newword = '', panlapi = '') => {
    return {
        status,
        panlapi,
        word: {
            current,
            new: newword
        }
    }
}

// Checks the end of the word if there is a hulapi matched 
// from the HULAPI array
const endingCheck = (word, limit) => {
    return panlapi.hulapi.indexOf(word.substr(word.length-limit, limit)) !== -1
}

module.exports = {
    displayOutput,
    endingCheck
}