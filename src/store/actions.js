//
// helpers / services
// TODO Mover p/ arquivo separado...
const callbackSort = function (a, b) {
  if (a.frequency < b.frequency) return 1
  if (a.frequency === b.frequency) return 0
  if (a.frequency > b.frequency) return -1
}
const filterItemsByWord = function (value) {
  return this.items.filter(item => {
    const wordLower = item.word.toLowerCase()
    const searchLower = value.toLowerCase()
    return wordLower.indexOf(searchLower) >= 0
  })
}
const filterItems = function (value) {
  return this.baseItems.filter(item => {
    const wordLower = item.word.toLowerCase()
    const translateLower = item.translate.toLowerCase()
    const searchLower = value.toLowerCase()
    return wordLower.indexOf(searchLower) >= 0 ||
      translateLower.indexOf(searchLower) >= 0
  })
}

const actions = {
  /**
   * TODO encapsular em services
   */
  initStore ({ state, commit }) {
    setTimeout(() => {
      const items = window.localStorage.getItem('items')
      let baseItems = items ? JSON.parse(items) : []
      commit('initStore', baseItems.sort(callbackSort))
      // if (this.items.length === 0) {
      //   this.ui.message.isVisible = true
      //   this.ui.message.content = 'Register your first word!'
      // } else {
      //   this.ui.message.isVisible = false
      // }
      // this.ui.isLoading = false
    }, 1100)
  },

  saveItems ({ state, commit }) {
    setTimeout(() => {
      window.localStorage.setItem('items', JSON.stringify(state.baseItems))
      commit('itemsSaved')
    }, 1)
  },

  sort ({ state, commit, dispatch }) {
    setTimeout(() => {
      commit('setItems', state.items.sort(callbackSort))
      dispatch('saveItems')
    }, 1)
  },

  /**
   * TODO O componente deverá passar um callback que retorna o valor do input de busca
   * () => { document.getElementById('search').value }
   */
  performSearch ({ state, commit }, getSearchValue) {
    clearTimeout(state.lastIDSetTimeOut)
    const lastID = setTimeout(() => {
      const search = getSearchValue()
      commit('setFilteredItems', filterItems(search || ''))
      // if (state.items.length === 0) {
      //   this.ui.message.isVisible = true
      //   this.ui.message.content = 'No words found! =('
      // } else {
      //   this.ui.message.isVisible = false
      // }
    }, 500)
    commit('changeLastIDSetTimeOut', lastID)
  },

  addWord ({ state, commit, dispatch }, item) {
    // TODO O componente terá que montar o objeto 'item' abaixo.
    // item = {
    //   word: this.ui.newWord.word,
    //   translate: this.ui.newWord.translate || '?',
    //   frequency: 1
    // }
    // TODO após concluída a action
    // this.ui.newWord = { word: null, translate: null }
    // this.ui.isAddWord = false

    if (!item.word || item.word.length < 3) return
    if (filterItemsByWord(item.word).length > 0) return
    commit('addItem', item)
    dispatch('saveItems')
  },

  removeWord ({ commit, dispatch }, item) {
    commit('removeItem', item)
    dispatch('saveItems')
  }
}

export default actions
