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
  SELL_USER_BOUGHT_CURRENCY(state, userBoughtCurrencies) {
    state.userBoughtCurrencies.push(userBoughtCurrencies);
  },
  UPDATE_USER_BOUGHT_CURRENCY(state, userBoughtCurrencies) {
    const currencyToUpdate = state.userBoughtCurrencies.find(
      (currency) => currency.code === userBoughtCurrencies.code
    );
    const length = userBoughtCurrencies.transactions.length;
    currencyToUpdate.transactions.push(
      userBoughtCurrencies.transactions[length - 1]
    );
  },
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
    return new Promise((resolve, reject) => {
      userCurrencyService
        .getUserBoughtCurrencies(payload)
        .then((response) => {
          commit("FETCH_USER_BOUGHT_CURRENCIES", response);
          resolve(response);
        })
        .catch((error) => {
          console.error("Problem with fetch user bought currencies" + error);
          reject(error);
        });
    });
  },
  addUserBoughtCurrency({ commit }, payload) {
    const userBoughtCurrencies = {
      code: payload.code,
      uid: payload.user,
      id: uuid(),
    };

    const currencies = this.getters["currency/getCurrenciesCodes"];

    for (var i = 0; i < currencies.length; i++) {
      const rates = currencies[i][0].rates;
      if (rates.find((x) => x.code === userBoughtCurrencies.code)) {
        userBoughtCurrencies.table = currencies[i][0].table;
      }
    }

    let userCurrencies = this.getters["userCurrency/getUserBoughtCurrencies"];
    console.log(userCurrencies);

    let currencyCode = userCurrencies.find((currency) => {
      return currency.code === userBoughtCurrencies.code;
    });

    if (currencyCode !== undefined) {
      console.log("jest taka waluta bede updejtowal");

      const newTransaction = {
        operationType: "BUY",
        mid: payload.mid,
        amount: payload.amount,
        result: payload.result,
        actionDate: payload.actionDate,
      };

      currencyCode.transactions.push(newTransaction);
      userCurrencyService.updateUserBoughtCurrency(currencyCode);
      // commit("UPDATE_USER_BOUGHT_CURRENCY", currencyCode);
    } else {
      console.log("to nowa waluta, kupuje");
      userBoughtCurrencies.transactions = [
        {
          operationType: "BUY",
          mid: payload.mid,
          amount: payload.amount,
          result: payload.result,
          actionDate: payload.actionDate,
        },
      ];
      userCurrencyService.addUserBoughtCurrency(userBoughtCurrencies);
      commit("ADD_USER_BOUGHT_CURRENCY", userBoughtCurrencies);
    }
  },
  sellUserBoughtCurrency({ commit }, payload) {
    const userBoughtCurrencies = {
      code: payload.code,
      uid: payload.user,
      id: uuid(),
    };
    console.log(commit);

    const currencies = this.getters["currency/getCurrenciesCodes"];

    for (var i = 0; i < currencies.length; i++) {
      const rates = currencies[i][0].rates;
      if (rates.find((x) => x.code === userBoughtCurrencies.code)) {
        userBoughtCurrencies.table = currencies[i][0].table;
      }
    }

    let userCurrencies = this.getters["userCurrency/getUserBoughtCurrencies"];
    console.log(userCurrencies);

    let currencyCode = userCurrencies.find((currency) => {
      return currency.code === userBoughtCurrencies.code;
    });

    if (currencyCode !== undefined) {
      console.log("jest taka waluta bede updejtowal");

      const newTransaction = {
        operationType: "SELL",
        mid: payload.mid,
        amount: payload.amount,
        result: payload.result,
        actionDate: payload.actionDate,
      };

      currencyCode.transactions.push(newTransaction);
      userCurrencyService.updateUserBoughtCurrency(currencyCode);
      // commit("UPDATE_USER_BOUGHT_CURRENCY", currencyCode);
    }
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
