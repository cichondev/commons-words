// Copy and Run this code in console
// of browser for seed items.

let arrItems = []
for (let i = 0; i < 100; i++) {
	let word = `word_${i}`
	let translate = `translate_${i}`

	arrItems.push({
    word: word,
    translate: translate,
    frequency: (Math.floor(Math.random() * (10 - 1)) + 1)
  })
}

window.localStorage.setItem('items', JSON.stringify(arrItems))
