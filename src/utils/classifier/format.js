const wordFormatter = (
  word = null, 
  current = null, 
  unlapi = null, 
  gitlapi = null, 
  hulapi = null
) => {
  if (current !== null) {
    if (word !== null) current.word.root = word
    if (unlapi !== null) current.unlapi.push(unlapi)
    if (gitlapi !== null) current.gitlapi.push(gitlapi)
    if (hulapi !== null) current.hulapi.push(hulapi)
  
    return current
  }

  return {
    unlapi: [],
    gitlapi: [],
    hulapi: [],
    inDatabase: false,
    word: { 
      root: word, 
      whole: word 
    }
  }
}

module.exports = wordFormatter