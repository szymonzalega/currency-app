// import Vue from 'vue'
import userCurrencyService from "../../service/userCurrencyService";
import { v4 as uuid } from "uuid";

const state = () => ({
  userBoughtCurrencies: [],
});

const getters = {
  getUserBoughtCurrencies: (state) => state.userBoughtCurrencies,
};

const mutations = {
  //   STORE_CURRENCIES_CODES(state, currencies) {
  //         state.currenciesCodes = currencies;
  //   },
  //   STORE_CURRENCIES(state, currencies) {
  //     state.currencies = currencies;
  //   },
  FETCH_USER_BOUGHT_CURRENCIES(state, userBoughtCurrencies) {
    state.userBoughtCurrencies = userBoughtCurrencies;
  },
  ADD_USER_BOUGHT_CURRENCY(state, userBoughtCurrencies) {
    state.userBoughtCurrencies.push(userBoughtCurrencies);
  },
  //   UPDATE_USER_CURRENCY_SETTINGS(state, userCurrency){
  //     var currencyToUpdate = state.userCurrencies.find(x => x.code == userCurrency.code);
  //     currencyToUpdate.options = userCurrency.options;
  //   },
  DELETE_USER_BOUGHT_CURRENCY(state, id) {
    var userCurrencies = [...state.userCurrencies];
    const curr = userCurrencies.filter(function(item) {
      return item.id !== id;
    });
    state.userCurrencies = curr;
  },
};

const actions = {
  //   storeCurrenciesCodes({ commit }, payload) {
  //     commit("STORE_CURRENCIES_CODES", payload);
  //   },
  //   storeCurrencies({ commit }, payload) {
  //     commit("STORE_CURRENCIES", payload);
  //   },
  fetchUserBoughtCurrencies({ commit }, payload) {
    const response = userCurrencyService.getUserBoughtCurrencies(payload);
    commit("FETCH_USER_BOUGHT_CURRENCIES", response);
  },
  addUserBoughtCurrency({ commit }, payload) {
    const userBoughtCurrencies = {
      code: payload.code,
      mid: payload.mid,
      amount: payload.amount,
      result: payload.result,
      uid: payload.user,
      boughtDate: payload.boughtDate,
      id: uuid(),
    };

    const currencies = this.getters["currency/getCurrenciesCodes"];

    for (var i = 0; i < currencies.length; i++) {
      const rates = currencies[i][0].rates;
      if (rates.find((x) => x.code === userBoughtCurrencies.code)) {
        userBoughtCurrencies.table = currencies[i][0].table;
      }
    }

    userCurrencyService.addUserBoughtCurrency(userBoughtCurrencies);
    commit("ADD_USER_BOUGHT_CURRENCY", userBoughtCurrencies);
  },
  //   updateUserCurrencySetting({commit}, payload) {
  //     const userCurrency =
  //     {
  //       code: payload.code,
  //       options: payload.options,
  //       uid: payload.user,
  //       table: payload.table
  //     }
  //     currencyService.updateUserCurrency(payload.id, userCurrency);
  //     commit("UPDATE_USER_CURRENCY_SETTINGS", payload)
  //   },
  deleteCurrencyWidget({ commit }, payload) {
    userCurrencyService.deleteUserBoughtCurrency(payload.id);
    commit("DELETE_USER_BOUGHT_CURRENCY", payload.id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
