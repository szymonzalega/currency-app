import auditService from "../../service/auditService";
import { v4 as uuid } from 'uuid';

const state = () => ({
  audit: []
});

const getters = {
  getAudit: (state) => state.audit
};

const mutations = {
  SET_AUDIT_RECORD(state, payload) {
    state.audit.push(payload);
  },
  GET_AUDIT_RECORDS(state, payload) {
      state.audit = payload;
  }
};

const actions = {
  setAuditRecord({commit}, payload) {
    let documentId = uuid();
    auditService.storeAuditRecord(payload, documentId);
    commit("SET_AUDIT_RECORD", payload);
  },
  getAuditRecords({commit}, payload) {
    return new Promise((resolve, reject) => {
        auditService
          .getAuditRecords(payload)
          .then((response) => {
            commit("GET_AUDIT_RECORDS", response);
            resolve(response);
          })
          .catch((error) => {
            console.error("Problem with getting autit records" + error);
            reject(error);
          });
      });  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
