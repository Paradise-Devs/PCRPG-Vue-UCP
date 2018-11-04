import axios from 'axios';

var baseUri = 'https://gitlab.com/api/v4/';
var groupName = 'pc-rpg';
var token = '_pUgsZVKj-KHg8hAsd5r';

export default {
  getProjects() {
    return axios.get(baseUri + 'groups/' + groupName + '/projects', {
      params: {
        statistics: true,
        private_token: token
      }
    });
  },
  getProjectCommits(project, page, branch) {
    return axios.get(baseUri + 'projects/' + project + '/repository/commits', { 
      params: { 
        page: page,
        per_page: 10,
        ref_name: branch,
        private_token: token
      } 
    });
  },
  getStats(project) {
    return axios.get(baseUri + 'projects/' + project, {
      params: {
        statistics: true,
        private_token: token
      }
    });
  },
  getUserData(userEmail) {
    return axios.get(baseUri + 'users', {
      params: {
        search: userEmail,
        private_token: token
      }
    });    
  }
}