const process = require('../classifier')
const format = require('../classifier/format')

const wordCounter = (data) => {
  var split = data.split(' ')
  var words = { known: [], unknown: [] }

  split.forEach(word => {
    word = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    var formatWord = format(word)
    var rootWord = process.wordProcess(formatWord)

    if (rootWord.inDatabase)
      words.known.push(rootWord)
    else
      words.unknown.push(rootWord)
  });

  return words
}

module.exports = wordCounter