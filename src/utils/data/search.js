const dictionary = require('./dictionary')

const cleanString = (string) => {
  return string.toLowerCase().replace(/[^\w\s]/gi, '')
}

const cleanMessage = (message) => {
  return message.replace(/\n/g, '')
}

const searchDictionary = (word) => {
  const types = Object.keys(dictionary)
  var result = null
  var resultType = null

  types.forEach(typeKey => {
    const type = dictionary[typeKey]
    const found = type[word]

    if (found === undefined || result != null) return

    result = found
    resultType = typeKey
  })

  return { result, type: resultType }
}

const runner = (message) => {
  const splitMessage = cleanMessage(message).split(' ')
  var results = {}

  splitMessage.forEach(rawWord => {
    var cleanWord = cleanString(rawWord)
    var foundWord = searchDictionary(cleanWord)

    if (foundWord.result != null) {
      if (results[foundWord.type] === undefined) {
        results[foundWord.type] = {
          words: {},
          count: 0
        }
      }

      if (results[foundWord.type].words[cleanWord] === undefined) {
        results[foundWord.type].words[cleanWord] = {
          data: foundWord.result,
          count: 1
        }
      } else {
        results[foundWord.type].words[cleanWord].count++
      }

      results[foundWord.type].count++
    }
  })

  return results
}

module.exports = runner