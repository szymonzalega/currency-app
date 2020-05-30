import balanceService from "../../service/balanceService";

const state = () => ({
  balance: null,
});

const getters = {
  getUserBalance: (state) => state.balance,
};

const mutations = {
  STORE_USER_BALANCE(state, balance) {
    state.balance = balance;
  },
};

const actions = {
  fetchUserCurrencies({ commit }, payload) {
    const response = balanceService.getUserBalance(payload);

    commit("STORE_USER_BALANCE", response);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
