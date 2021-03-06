import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Balance from '../views/Balance.vue'
import CurrencyHistory from '../views/CurrencyHistory.vue'
import auth from '@/auth'
import AccountHistory from '../views/History.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/balance',
    name: 'Balance',
    component: Balance,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/currencyHistory/:id',
    name: 'CurrencyHistory',
    component: CurrencyHistory,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/accountHistory',
    name: 'AccountHistory',
    component: AccountHistory,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '*',
    redirect: '/dashboard'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let currentUser = auth.user()
  let requireAuth = to.matched.some(record => record.meta.requireAuth)
  let guestOnly = to.matched.some(record => record.meta.guestOnly)

  if (requireAuth && !currentUser) next('login')
  else if (guestOnly && currentUser) next('dashboard')
  else next()
})

export default router
