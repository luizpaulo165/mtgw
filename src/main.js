import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

import Providers from "@/providers/ui.js"

new Vue({
  router,
  Providers,
  render: function (h) { return h(App) },
}).$mount('#app')
