// import Vue from 'vue'
import auth from '@/auth'
import userService from '../../service/userService'

const state = {
    user: null,
    appUsers: []
}

const getters = {
    user: state => state.user,
    isLogged: state => (state.user !== null),
    appUsers: state => state.appUsers
}

const mutations = {
    setUser: (state, user) => {
        state.user = user
    },
    store_new_user: (state, user) => {
        state.appUsers.push(user);
    },
    get_app_users: (state, users) => {
        state.appUsers = users;
    }
}

const actions = {
    setCurrentUser: ({ commit }) => {
        commit('setUser', auth.user())
    },
    getAppUsers: ({ commit }) => {
        const users = userService.getUsers(auth.user().uid);

        commit('get_app_users', users)
    },
    storeNewUser: () => {
        const user = auth.user();
        user.uid;
        const userToStore = {userId: user.uid ,email: user.email,displayName: user.displayName};
        userService.storeUser(userToStore);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}