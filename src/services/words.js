
export const callbackSort = (wordA, wordB) => {
  if (wordA.frequency < wordB.frequency) return 1
  if (wordA.frequency === wordB.frequency) return 0
  if (wordA.frequency > wordB.frequency) return -1
}

export const filterItemsByWord = (items, value) => {
  return items.filter(item => {
    const wordLower = item.word.toLowerCase()
    const searchLower = value.toLowerCase()
    return wordLower.indexOf(searchLower) >= 0
  })
}

export const filterItems = (items, value) => {
  return items.filter(item => {
    const wordLower = item.word.toLowerCase()
    const translateLower = item.translate.toLowerCase()
    const searchLower = value.toLowerCase()
    return wordLower.indexOf(searchLower) >= 0 ||
      translateLower.indexOf(searchLower) >= 0
  })
}
