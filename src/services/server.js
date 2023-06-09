import Vue from 'vue';
import axios from 'axios';

var baseUri = 'https://api.pc-rpg.com.br/api/v1/';
var authorizationKey = "4vvhw6rrkchEfUgnJLyGRc995ZVvB86PxxzYknUT";

export default {
    //get data
    getPlayers() {
        return axios.get(baseUri + 'players');
    },
    getPlayerCharacters(user) {
        return axios.get(baseUri + 'players/' + user + '/characters');
    },
    getPlayerData(user) {
        return axios.get(baseUri + 'players/' + user);
    },
    getStats() {
        return axios.get(baseUri + 'statistics');
    },

    //update data
    updatePlayerEmail(user, newEmail) {
        return axios.patch(baseUri + 'players/' + user, { masterkey: authorizationKey, email: newEmail });
    },
    updatePlayerPassword(user, newPassword) {
        return axios.patch(baseUri + 'players/' + user, { masterkey: authorizationKey, password: newPassword });
    },
    updatePlayerUsername(user, newUsername) {
        return axios.patch(baseUri + 'players/' + user, { masterkey: authorizationKey, username: newUsername });
    },

    //authentication
    getToken(oldToken) {
        return axios.post(baseUri + 'token', { token: oldToken });
    },
    loginPlayer(username, password) {
        return axios.post(baseUri + 'login', { username: username, password: password });
    },
    registerPlayer(username, password, email) {
        return axios.post(baseUri + 'register', { username: username, password: password, email: email });
    },
}