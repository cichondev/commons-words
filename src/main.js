import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import { init as googleAnalyticsInit } from './plugins/analytics'
import store from './store'

Vue.prototype.$ga = { init: googleAnalyticsInit }
Vue.use(Vuetify)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
