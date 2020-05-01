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

    auth.addUserCurrency(userCurrency)
    state.userCurrencies.push(userCurrency)
  },
  UPDATE_USER_CURRENCY_SETTINGS(state, userCurrency){
    console.log(state);
    console.log(userCurrency);
    
    var currencyToUpdate = state.userCurrencies.find(x => x.code == userCurrency.code);
    currencyToUpdate.options = userCurrency.options;
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
    const userCurrency = 
      {
        code: payload.selected,
        options: {
          last: payload.timePerioid,
          type: payload.selectionType
        },
        uid: payload.user,
      }

    commit("ADD_USER_CURRENCY", userCurrency);
  },
  updateUserCurrencySetting({commit}, payload) {
    console.log('from update', payload)
    const userCurrency = 
    {
      code: payload.code,
      options: payload.options,
      uid: payload.user,
      table: payload.table
    }
    console.log('user currency', userCurrency)
    auth.updateUserCurrency(payload.id, userCurrency);
    commit("UPDATE_USER_CURRENCY_SETTINGS", payload)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
