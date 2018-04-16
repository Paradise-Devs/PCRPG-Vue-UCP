import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		user: {},
		token: null,
		forumToken: null
	},
	actions: {
		login({ commit }, userdata) {
			return new Promise((resolve) => {
				setTimeout(() => {
					commit('LOGIN')
					commit('SET_USER_DATA', userdata)
					resolve()
				}, 1000)
			})
		},
		logout({ commit }) {
			commit('LOGOUT');
		}
	},
	mutations: {
		LOGIN (state) {
			state.token = state.user.token;
			state.forumToken = state.user.forumToken;
			localStorage.setItem("token", state.token);
			localStorage.setItem("forumToken", state.forumToken);
		},
		LOGOUT (state) {
			state.token = null;
			state.forumToken = null;
			localStorage.removeItem("token");
			localStorage.removeItem("forumToken");
		},
		SET_USER_DATA (state, userdata) {
			state.user = userdata;
		}
	},
	getters: {
		isLoggedIn: state => { return state.token != null },
		getToken: state => { return state.token; },
		getUserData: state => { return state.user; }
	}
});

export default { }
