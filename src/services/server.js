import Vue from "vue";
import axios from "axios";

let devEnv = "https://cors-anywhere.herokuapp.com/";

if (window.location.href.indexOf("pc-rpg.com.br") > -1) {
	devEnv = "";
}

var baseUri = devEnv + "https://api.pc-rpg.com.br/api/v1/";
var authorizationKey = "4vvhw6rrkchEfUgnJLyGRc995ZVvB86PxxzYknUT";

var auth = { Authorization: "Bearer " + localStorage.getItem("token") };

export default {
	//get data
	getPlayers() {
		return axios.get(baseUri + "players");
	},
	getPlayerCharacters(user) {
		return axios.get(baseUri + "player/" + user + "/characters");
	},
	getPlayerData(user) {
		return axios.get(baseUri + "player/", { headers: auth });
	},
	getStats() {
		return axios.get(baseUri + "statistics");
	},

	//update data
	updatePlayerEmail(user, newEmail) {
		return axios.patch(baseUri + "player/" + user, {
			masterkey: authorizationKey,
			email: newEmail
		});
	},
	updatePlayerPassword(user, newPassword) {
		return axios.patch(baseUri + "player/" + user, {
			masterkey: authorizationKey,
			password: newPassword
		});
	},
	updatePlayerUsername(user, newUsername) {
		return axios.patch(baseUri + "player/" + user, {
			masterkey: authorizationKey,
			username: newUsername
		});
	},

	//authentication
	getToken(oldToken) {
		return axios.post(baseUri + "token", { token: oldToken });
	},
	loginPlayer(username, password) {
		return axios.post(baseUri + "login", {
			username: username,
			password: password
		});
	},
	registerPlayer(username, password, email) {
		return axios.post(baseUri + "register", {
			username: username,
			password: password,
			email: email
		});
	}
};
