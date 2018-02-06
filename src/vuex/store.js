import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		user: {},
		token: null
	},
	actions: {
		login({ commit }, userdata) {
			return new Promise((resolve) => {
				setTimeout(() => {
					commit('LOGIN', userdata.token)
					commit('SET_USER_DATA', userdata)
					resolve()
				}, 1000)
			})
		},
		logout({ commit }) {
			localStorage.removeItem("token");
			commit(LOGOUT);
		}
	},
	mutations: {
		LOGIN (state, token) {
			state.isLoggedIn = true;
			state.token = token;
			localStorage.setItem("token", token);
		},
		LOGOUT (state) {
			state.isLoggedIn = false;
			state.token = null;
			localStorage.removeItem("token");
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
