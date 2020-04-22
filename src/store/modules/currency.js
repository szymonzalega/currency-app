// import Vue from 'vue'

const state = {
  currencies: [],
  userCurrencies: [],
};

const getters = {
  getCurrencies: (state) => state.currencies,
  getUserCurrencies: (state) => state.userCurrencies,
};

const mutations = {
  FETCH_CURRENCIES(state, currencies) {
    state.currencies = currencies;
  },
  FETCH_USER_CURRENCIES(state, userCurrencies) {
    state.userCurrencies = userCurrencies;
  },
};

const actions = {
  fetchCurrencies({ commit }) {
    console.log(commit);

    //tu jest laczenie trzech tablic, A, B, C bo tak zwraca NBP w API
    //oraz zmapowanie odpowiedzi na jedynie nazwe waluty i jej kod
    //mozliwe ze takie cos bedzie trzeba robic nie tu a w komponencie
    const getAllCurrenciesCode = (currencies) => {
      return currencies
        .map((currency) => currency[0].rates)
        .reduce((a, b) => [...a, ...b])
        .map(({ code, currency }) => {
          return {
            code,
            currency,
          };
        });
    };

    const APIUrls = [
      "https://api.nbp.pl/api/exchangerates/tables/A/?format=json",
      "https://api.nbp.pl/api/exchangerates/tables/B/?format=json",
      "https://api.nbp.pl/api/exchangerates/tables/C/?format=json",
    ];

    Promise.all(APIUrls.map((url) => fetch(url)))
      .then((responses) => Promise.all(responses.map((r) => r.json())))
      .then((currencies) => {
        commit("FETCH_CURRENCIES", getAllCurrenciesCode(currencies));
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
        id: 1,
        code: "CHF",
        table: 'A',
      },
      {
        id: 2,
        code: "EUR",
        table: 'A',
      },
      {
        id: 3,
        code: "USD",
        table: 'A',
      }
    ];
    commit("FETCH_USER_CURRENCIES", mockResponseFromApi);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
