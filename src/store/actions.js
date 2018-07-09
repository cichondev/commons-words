import {
  callbackSort,
  filterItems,
  filterItemsByWord
} from '../services/words'

const actions = {
  /**
   * Init state store with loading data of LocalStorage.
   *
   * @param state
   * @param commit
   * @return {Promise}
   */
  initStore ({ state, commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = window.localStorage.getItem('items')
        let baseItems = items ? JSON.parse(items) : []
        commit('initStore', baseItems.sort(callbackSort))
        resolve()
      }, 1100)
    })
  },

  /**
   * Save state items in LocalStorage.
   *
   * @param state
   * @param commit
   */
  saveItems ({ state, commit }) {
    setTimeout(() => {
      window.localStorage.setItem('items', JSON.stringify(state.baseItems))
      commit('itemsSaved')
    }, 1)
  },

  /**
   * Sort state items.
   *
   * @param state
   * @param commit
   * @param dispatch
   */
  sortItems ({ state, commit, dispatch }) {
    setTimeout(() => {
      commit('setItems', state.itemsDisplayed.sort(callbackSort))
      dispatch('saveItems')
    }, 1)
  },

  /**
   * Exec search by value returned by 'getSearchValue', in state items.
   *
   * @param state
   * @param commit
   * @param payload {Object}
   */
  performSearch ({ state, commit }, payload) {
    clearTimeout(state.lastIDSetTimeOut)
    const lastID = setTimeout(() => {
      const search = payload.getSearchValue()
      commit('setDisplayedItems', filterItems(state.baseItems, search || ''))
      payload.onFinished()
    }, 500)
    commit('changeLastIDSetTimeOut', lastID)
  },

  /**
   * Trigger add item to state items and trigger save state.
   *
   * @param state
   * @param commit
   * @param dispatch
   * @param item
   * @returns {Promise}
   */
  add ({ state, commit, dispatch }, item) {
    return new Promise((resolve) => {
      if (!item.word || item.word.length < 3) return
      if (filterItemsByWord(state.itemsDisplayed, item.word).length > 0) return
      commit('addItem', item)
      dispatch('saveItems')
      resolve()
    })
  },

  /**
   * Trigger remove the 'item' object of state.
   *
   * @param commit
   * @param dispatch
   * @param item
   */
  remove ({ commit, dispatch }, item) {
    commit('removeItem', item)
    dispatch('saveItems')
  }
}

export default actions
