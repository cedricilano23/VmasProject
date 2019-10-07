const panlapi = require('../data/panlapi')
const words = require('../data/words')
const panlapiHelper = require('./panlapiHelper')

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

String.prototype.removeAt = function(start, length) {
    return this.substr(0, start) + this.substr(start + length);
}

// Search WORD array for the root word, returns true if found
const wordChecker = (word) => words.indexOf(word) !== -1

/**
 * Unlapi Checker
 * 1. Checks Unlapi array for matching Unlapi from the word, 
 *      if found returns output obj with true status as result 
 * 2. If false, check repetition of syllables, 
 *      if found returns output obj with true status as result 
 * 3. If nothing found, returns output obj with true 
 *      status as result 
 */
const unlapiChecker = (word) => { 
    panlapi.unlapi.forEach((lapi, index) => {
        if(lapi === word.substr(0, lapi.length))
            return panlapiHelper.displayOutput(word, true, word.substr(lapi.length), lapi)
    })

    if(word.charAt(0) === word.charAt(1))
        return panlapiHelper.displayOutput(word, true, word.substr(1), word.charAt(0))
    else if(word.substr(0, 2) === word.substr(2, 2))
        return panlapiHelper.displayOutput(word, true, word.substr(2), word.substr(0, 2))
    
    return panlapiHelper.displayOutput()
}

/**
 * Gitlapi Checker
 * 1. Checks Gitlapi array for matching gitlapi at substr(1, 2) 
 *      from the word, if found returns output obj 
 *      with true status as result 
 * 2. If nothing found, returns output obj with true 
 *      status as result 
 */
const gitlapiChecker = (word) => {
    if(panlapi.gitlapi.indexOf(word.substr(1, 2)) !== -1)
        return panlapiHelper.displayOutput(
            word, 
            true, 
            word.removeAt(1, 2),
            word.substr(1, 2)
        )

    return panlapiHelper.displayOutput(word)
}

/**
 * Hulapi Checker
 * 1. Checks Hulapi array for matching hulapi from the word
 * 2. If nothing found, returns output obj with true 
 *      status as result 
 * 3. If found, checks close 'u' and convert it to 'o'
 */
const hulapiChecker = (word) => {
    let value = 0
    let replaceWord = word

    if(panlapiHelper.endingCheck(word, 3)) value = 4
    else if(panlapiHelper.endingCheck(word, 2)) value = 3

    if(value === 0) return panlapiHelper.displayOutput(word)

    if(word.charAt(word.length-value) === 'u') 
        replaceWord = replaceWord.replaceAt(word.length-value, 'o')
    else if (word.charAt(word.length-(value+1)) === 'u')
        replaceWord = replaceWord.replaceAt(word.length-(value+1), 'o')

    return panlapiHelper.displayOutput( 
        word,
        true, 
        replaceWord.substr(0, replaceWord.length-(value-1)), 
        replaceWord.substr(replaceWord.length-(value-1), (value-1))
    )
}

module.exports = {
    unlapi: unlapiChecker,
    gitlapi: gitlapiChecker,
    hulapi: hulapiChecker,
    word: wordChecker
}