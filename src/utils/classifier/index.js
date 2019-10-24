const checker = require('./checker')
const format = require('./format')

const quota = 5
var counter = 0

/**
 * Word Processing
 * 1. Checks if word is already in the WORDS array as root word
 * 2. Checks the given word for unlapi, gitlapi, and hulapi
 * 3. For each result, if true, checks the word without panlapi
 *      if it is already a root word
 * 4. If not, removes all found panlapi in the word
 * 
 * Recommedation:
 * 1. Make a double to triple check for panlapi for harder words like:
 *      a. pinaglalaruan
 *      b. mambabatas
 *      c. pinaglalabanan
 */

const wordProcess = (item) => {
    if(!checker.word(item.word.root)) {
        var unlapi = checker.unlapi(item.word.root)
        var gitlapi = checker.gitlapi(item.word.root)
        var hulapi = checker.hulapi(item.word.root)

        if(checker.word(unlapi.word.new)) {
            var formatWord = format(unlapi.word.new, item, unlapi.panlapi)
            formatWord.inDatabase = true
            return formatWord
        }
        else if(checker.word(gitlapi.word.new)) {
            var formatWord = format(gitlapi.word.new, item, null, gitlapi.panlapi)
            formatWord.inDatabase = true
            return formatWord
        }
        else if(checker.word(hulapi.word.new)) {
            var formatWord = format(hulapi.word.new, item, null, null, hulapi.panlapi)
            formatWord.inDatabase = true
            return formatWord
        }
        else {
            let getBase = item

            if(unlapi.status)
                getBase = format(unlapi.word.new, getBase, unlapi.panlapi)
            
            if(gitlapi.status) {
                getBase = format(
                    checker.gitlapi(getBase.word.root).word.new,
                    getBase,
                    null,
                    gitlapi.panlapi
                )
            }
                
            if(hulapi.status) {
                getBase = format(
                    checker.hulapi(getBase.word.root).word.new,
                    getBase,
                    null,
                    null,
                    hulapi.panlapi
                )
            }

            if (checker.word(getBase.word.root)) {
                getBase.inDatabase = true
                counter = 0
                return getBase
            } else if (quota > counter) {
                counter++
                return wordProcess(getBase)
            } else {
                counter = 0
                return getBase
            }
        }
    }

    counter = 0
    item.inDatabase = true
    return item
}

module.exports = {
    wordProcess
}