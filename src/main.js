import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BIcon, BIconGear, BIconCheck, BIconX} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {store} from '@/store'
import auth from '@/auth'

Vue.use(BootstrapVue)
Vue.component('BIcon', BIcon)
Vue.component('BIconGear', BIconGear)
Vue.component('BIconCheck', BIconCheck)
Vue.component('BIconX', BIconX)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  beforeCreate () {
    auth.init(this)
  },
  render: h => h(App)
}).$mount('#app')