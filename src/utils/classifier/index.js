const checker = require('./checker')

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
const wordProcess = (word) => {
    if(!checker.word(word)) {
        var unlapi = checker.unlapi(word)
        var gitlapi = checker.gitlapi(word)
        var hulapi = checker.hulapi(word)

        if(checker.word(unlapi.word.new))
            return unlapi.word.new
        else if(checker.word(gitlapi.word.new))
            return gitlapi.word.new
        else if(checker.word(hulapi.word.new))
            return hulapi.word.new
        else {
            let getBase = word

            if(unlapi.status)
                getBase = unlapi.word.new
            
            if(gitlapi.status)
                getBase = checker.gitlapi(getBase).word.new
                
            if(hulapi.status)
                getBase = checker.hulapi(getBase).word.new

            return getBase
        }
    }

    return word
}

module.exports = {
    wordProcess
}