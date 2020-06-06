import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import currency from './modules/currency'
import balance from './modules/balance'
import userCurrency from './modules/userCurrency'
import audit from './modules/audit'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        user,
        currency,
        balance,
        userCurrency,
        audit
    }
})