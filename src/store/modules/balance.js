import balanceService from "../../service/balanceService";

const state = () => ({
  balance: null,
  audit: []
});

const getters = {
  getUserBalance: (state) => state.balance,
  getAudit: (state) => state.audit
};

const mutations = {
  GET_USER_BALANCE(state, balance) {
    state.balance = balance;
  },
  ADD_USER_BALANCE(state, balance) {
    state.balance = balance;
  },
  TRANSFER_MONEY(state, balance) {
    state.balance = balance;
  }
};

const actions = {
  getUserBalance({ commit }, payload) {
    balanceService.getUserBalance(payload, commit);    
  },
  addUserBalance({commit}, payload) {
    balanceService.storeUserBalance(payload);

    commit("ADD_USER_BALANCE", payload.currencyAmount)
  },
  setUserBalance({commit}, payload) {
    let currentBalance = {user: payload.user, currencyAmount: payload.newAmount };
    balanceService.storeUserBalance(currentBalance);
    commit('TRANSFER_MONEY', payload.newAmount)
  } ,
  transferMoney({commit}, payload) {
    let transferMoneyEvent = { user: payload.userToTransferMoney, currencyAmount: payload.amount }
    let removeMoneyEvent = {user: payload.user, currencyAmount: payload.newAmount };
    balanceService.transferMoney(transferMoneyEvent);
    balanceService.storeUserBalance(removeMoneyEvent);
    commit('TRANSFER_MONEY', payload.newAmount)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
