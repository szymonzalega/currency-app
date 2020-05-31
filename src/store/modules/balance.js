import balanceService from "../../service/balanceService";
import { v4 as uuid } from 'uuid';

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
  SET_AUDIT_RECORD(state, payload) {
    state.audit.push(payload);
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
  setAuditRecord({commit}, payload) {
    let documentId = uuid();
    balanceService.storeAuditRecord(payload, documentId);
    commit("SET_AUDIT_RECORD", payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
