// import Vue from 'vue'
import auth from '@/auth'

const state = () => ({
  currencies: [],
  currenciesCodes: [],
  userCurrencies: [],
});

  const getters = {
  getCurrenciesCodes: (state) => state.currencies,
  getUserCurrencies: (state) => state.userCurrencies,
};

const mutations = {
  STORE_CURRENCIES_CODES(state, currencies) {
        state.currenciesCodes = currencies;
  },
  STORE_CURRENCIES(state, currencies) {
    state.currencies = currencies;
  },
  FETCH_USER_CURRENCIES(state, userCurrencies) {
    state.userCurrencies = userCurrencies;
  },
  ADD_USER_CURRENCY(state, userCurrency) {
    for(var i = 0; i< state.currencies.length; i++){
      const rates = state.currencies[i][0].rates;
      if(rates.find(x => x.code === userCurrency.code)){
        userCurrency.table = state.currencies[i][0].table
      }
    }

    console.log(userCurrency)
    auth.addUserCurrency(userCurrency)
    state.userCurrencies.push(userCurrency)
  }
};

const actions = {
  storeCurrenciesCodes({ commit }, payload) {
    commit("STORE_CURRENCIES_CODES", payload);
  },
  storeCurrencies({ commit }, payload) {
    commit("STORE_CURRENCIES", payload);
  },
  fetchUserCurrencies({ commit }, payload) {
    const response = auth.getUserCurrencies(payload);
  
    commit("FETCH_USER_CURRENCIES", response);
  },
  addUserCurrency({commit}, payload) {
    const mockResponseFromApi = 
      {
        code: payload.selected,
        timePerioid: payload.timePerioid,
        uid: payload.user
      }

    commit("ADD_USER_CURRENCY", mockResponseFromApi);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
