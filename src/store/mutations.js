const mutations = {

  initStore (state, items) {
    state.baseItems = items
    state.items = [...state.baseItems]
    state.isLoading = false
  },

  setItems (state, items) {
    state.baseItems = items
    state.items = [...state.baseItems]
  },

  setFilteredItems (state, items) {
    state.items = [...items]
  },

  itemsSaved (state) {
    state.dataSaved = true
  },

  itemsNotSaved (state) {
    state.dataSaved = false
  },

  removeItem(state, item) {
    let index = state.items.indexOf(item)
    state.items.splice(index, 1)
    index = state.baseItems.indexOf(item)
    state.baseItems.splice(index, 1)
  },

  addItem(state, item) {
    state.items.push(item)
    state.baseItems.push(item)
  },

  addFrequency(state, item) {
    item.frequency++
    state.dataSaved = false
  },

  decreaseFrequency (state, item) {
    if (item.frequency > 0) {
      item.frequency--
      state.dataSaved = false
    }
  },

  changeLastIDSetTimeOut (state, newID) {
    state.lastIDSetTimeOut = newID
  }
}

export default mutations
