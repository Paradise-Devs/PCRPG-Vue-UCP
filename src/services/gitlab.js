import Vue from 'vue';
import axios from 'axios';

var baseUri = 'https://gitlab.com/api/v4/projects/6159796';
var token = 'private_token=qn42srqy59sVqMtCnaYp';
var branch = 'development';

export default {
    getCommits(page) {
        return axios.get(baseUri + '/repository/commits?ref_name=' + branch + '&' + token + '&page=1&per_page=10', { params: { page: page } });
    },
    getStats() {
        return axios.get(baseUri + '?statistics=true&' + token)
    },
    getUserData(userEmail) {
        return axios.get(baseUri + '/users?' + token + '&search=' + userEmail)
    }
}