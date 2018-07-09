import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    baseItems: [],
    itemsDisplayed: [],
    isLoading: true,
    dataSaved: true,
    lastIDSetTimeOut: null
  },

  mutations,

  actions
})

export default store
