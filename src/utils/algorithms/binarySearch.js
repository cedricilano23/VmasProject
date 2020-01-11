const binarySearch = (word, list) => {
  if (list.length >= 2) {
    for (var a = 0; a < list.length; a++) {
      if (word === list[a]) return true
    }
    return false
  }

  let mid = Math.floor(list.length / 2)

  if (list[mid] === word) return true

  if (list[mid] > word) {
    return binarySearch(word, list.slice(mid))
  } else {
    return binarySearch(word, list.slice(0, mid))
  }
}

module.exports = binarySearch