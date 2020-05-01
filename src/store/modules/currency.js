// import Vue from 'vue'
import auth from '@/auth'
import { v4 as uuid } from 'uuid';

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
<<<<<<< HEAD
  STORE_CURRENCIES_CODES(state, currencies) {
        state.currenciesCodes = currencies;
=======
  FETCH_CURRENCIES_CODES(state, currenciesCodes) {
    state.currenciesCodes = currenciesCodes;
>>>>>>> usuwanie widgetu
  },
  STORE_CURRENCIES(state, currencies) {
    state.currencies = currencies;
  },
  FETCH_USER_CURRENCIES(state, userCurrencies) {
    state.userCurrencies = userCurrencies;
  },
  ADD_USER_CURRENCY(state, userCurrency) {
    state.userCurrencies.push(userCurrency)
  },
  UPDATE_USER_CURRENCY_SETTINGS(state, userCurrency){
    var currencyToUpdate = state.userCurrencies.find(x => x.code == userCurrency.code);
    currencyToUpdate.options = userCurrency.options;
  },
  DELETE_CURRENCY_WIDGET(state, id) {
    var userCurrencies = [...state.userCurrencies];
    const curr = userCurrencies.filter(function(item) {
      return item.id !== id
  })
    state.userCurrencies = curr;
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
  addUserCurrency({commit, state}, payload) {
    const userCurrency = 
      {
        code: payload.selected,
        options: {
          last: payload.timePerioid,
          type: payload.selectionType
        },
        uid: payload.user,
      }
      for(var i = 0; i< state.allCurrencies.length; i++){
        const rates = state.allCurrencies[i][0].rates;
        if(rates.find(x => x.code === userCurrency.code)){
          userCurrency.table = state.allCurrencies[i][0].table
        }
      }
      userCurrency.id = uuid();
      auth.addUserCurrency(userCurrency);
    commit("ADD_USER_CURRENCY", userCurrency);
  },
  updateUserCurrencySetting({commit}, payload) {
    const userCurrency = 
    {
      code: payload.code,
      options: payload.options,
      uid: payload.user,
      table: payload.table
    }
    auth.updateUserCurrency(payload.id, userCurrency);
    commit("UPDATE_USER_CURRENCY_SETTINGS", payload)
  },
  deleteCurrencyWidget({commit}, payload) {
    auth.deleteUserCurrency(payload.id);
    commit("DELETE_CURRENCY_WIDGET", payload.id)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
