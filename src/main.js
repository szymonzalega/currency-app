import Vue from 'vue'
import App from './App.vue'
import router from './router'
import GAuth from 'vue-google-oauth2'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

const gauthOption = {
  clientId: '639503001155-tgvqp7krv84k0jlajh3ppr8dkg0g4jqb.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)