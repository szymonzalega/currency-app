// import Vue from 'vue'

const state = () => ({
  allCurrencies: [],
  currenciesCodes: [],
  userCurrencies: [],
});

  const getters = {
  getCurrenciesCodes: (state) => state.currenciesCodes,
  getUserCurrencies: (state) => state.userCurrencies,
};

const mutations = {
  FETCH_CURRENCIES_CODES(state) {
    const currenciesCodes =  state.allCurrencies
    .map((currency) => currency[0].rates)
    .reduce((a, b) => [...a, ...b])
    .map(({ code, currency }) => {
      return {
        code,
        currency,
      };
    });

    state.currenciesCodes = currenciesCodes;
  },
  FETCH_CURRENCIES(state, currencies) {
    state.allCurrencies = currencies;
  },
  FETCH_USER_CURRENCIES(state, userCurrencies) {
    state.userCurrencies = userCurrencies;
  },
  ADD_USER_CURRENCY(state, userCurrency) {
    for(var i = 0; i< state.allCurrencies.length; i++){
      const rates = state.allCurrencies[i][0].rates;
      if(rates.find(x => x.code === userCurrency.code)){
        userCurrency.table = state.allCurrencies[i][0].table
      }
    }

    console.log(userCurrency)
    state.userCurrencies.push(userCurrency)
  }
};

const actions = {
  fetchCurrenciesCodes({ commit }) {
    commit("FETCH_CURRENCIES_CODES");
  },
  fetchCurrencies({ commit }) {
    const APIUrls = [
      "https://api.nbp.pl/api/exchangerates/tables/A/?format=json",
      "https://api.nbp.pl/api/exchangerates/tables/B/?format=json",

    ];

    Promise.all(APIUrls.map((url) => fetch(url)))
      .then((responses) => Promise.all(responses.map((r) => r.json())))
      .then((currencies) => {
        commit("FETCH_CURRENCIES",currencies);
      });
  },  
  fetchUserCurrencies({ commit }, payload) {
    //tutaj trzeba zrobic fetcha do API po waluty uzytkownika
    //w payload trzeba wyslac jakies id usera
    //i w rozwiazanej promisie trzeba zrobic commit z responsem
    //tak jak zrobione to jest w fetchCurrencies, czyli wyzej
    //aktualnie jako dane wsadzam mocka

    //musialem uzyc payload bo linter sie czepial :(
    console.log(payload);

    const mockResponseFromApi = [
      {
        code: "CHF",
        table: 'A',
      },
      {
        code: "EUR",
        table: 'A',
      },
      {
        code: "USD",
        table: 'A',
      }
    ];
    commit("FETCH_USER_CURRENCIES", mockResponseFromApi);
  },
  addUserCurrency({commit}, payload) {
    const mockResponseFromApi = 
      {
        code: payload.selected,
        timePerioid: payload.timePerioid,
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
