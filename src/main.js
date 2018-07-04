import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import { init as googleAnalyticsInit } from './analytics'

Vue.prototype.$ga = {
  init: googleAnalyticsInit
}
Vue.use(Vuetify)

new Vue({
  el: '#app',
  render: h => h(App)
})
