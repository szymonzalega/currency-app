import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import currency from './modules/currency'

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
        currency
    }
})