import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		user: {}
	},
	actions: {
		login({ commit }, userdata) {
			return new Promise((resolve) => {
				setTimeout(() => {
					commit('SET_USER_DATA', userdata)
					commit('LOGIN')
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
			localStorage.setItem("token", state.user.token);
			localStorage.setItem("forumToken", state.user.forumToken);
		},
		LOGOUT (state) {
			state.user.token = null;
			state.user.forumToken = null;
			localStorage.removeItem("token");
			localStorage.removeItem("forumToken");
		},
		SET_USER_DATA (state, userdata) {
			state.user = userdata;
		}
	},
	getters: {
		isLoggedIn: state => { return state.user.token != null },
		getToken: state => { return state.user.token; },
		getUserData: state => { return state.user; }
	}
});

export default { }
