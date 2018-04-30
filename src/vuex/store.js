import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		user: {},
		masterToken: 'jYtEGxXc66LzfnCHflISprQQRzZAU5ZODT63PAUx; ',
		updateDataToken: '4vvhw6rrkchEfUgnJLyGRc995ZVvB86PxxzYknUT'
	},
	actions: {
		setData({commit}, userdata) {
			commit('SET_USER_DATA', userdata)
		},
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
		},
		LOGOUT (state) {
			state.user.token = null;
			localStorage.removeItem("token");
		},
		SET_USER_DATA (state, userdata) {
			state.user = userdata;
		}
	},
	getters: {
		isLoggedIn: state => { return state.user.token != null },
		getToken: state => { return state.user.token; },
		getUserData: state => { return state.user; },
		getMasterToken: state => { return state.masterToken; },
		getUpdateMasterToken: state => { return state.updateDataToken; }
	}
});

export default { }
