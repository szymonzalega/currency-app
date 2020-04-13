import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from '@/store'
import auth from '@/auth'


Vue.config.productionTip = false

new Vue({
  store,
  router,
  beforeCreate () {
    auth.init(this)
  },
  render: h => h(App)
}).$mount('#app')