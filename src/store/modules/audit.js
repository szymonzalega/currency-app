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
  }
};

const actions = {
  setAuditRecord({commit}, payload) {
    let documentId = uuid();
    auditService.storeAuditRecord(payload, documentId);
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
