import Vue from 'vue';
import axios from 'axios';

let devEnv = 'https://cors-anywhere.herokuapp.com/'

if(window.location.href.indexOf('pc-rpg.com.br') > -1) {
  devEnv = '';
}

var baseUri = devEnv + 'https://forum.pc-rpg.com.br/api/';
var auth = { "Authorization": "Token jYtEGxXc66LzfnCHflISprQQRzZAU5ZODT63PAUx; userId=1" }

export default {
  //get data
  getForumNews() {
    return axios.get(baseUri + 'discussions?filter[q]=tag:novidades,patchnotes,devlog&sort=-startTime');
  },
  getPatchnotes() {
    return axios.get(baseUri + 'discussions?filter[q]=tag:patchnotes&sort=-startTime');
  },
  getLastestDiscussions() {
    return axios.get(baseUri + 'discussions?sort=-startTime');
  },
  getUserData(user) {
    return axios.get(baseUri + 'users/' + user, { headers: auth });
  },
  getAllUsers() {
    return axios.get(baseUri + 'users', { headers: auth });
  },
  getAllGroups() {
    return axios.get(baseUri + 'groups', { headers: auth });
  },
  getTags() {
    return axios.get(baseUri + 'tags');
  },
  getLastestPostsByUser(user) {
    return axios.get(baseUri + 'posts?filter[user]=' + user + '&sort=-time');
  },
  getDiscussionData(discussionId) {
    return axios.get(baseUri + 'discussions/' + discussionId);
  },
  getAssigment(user) {
    let self = this;
    return new Promise(function(resolve, reject) {
      self.getUserData(user)
      .then(userdata => {
        if(userdata.data.included) {
          setTimeout(function() {
            resolve(userdata.data.included[0].attributes);
          }, 500);
        } else {
          setTimeout(function() {
            resolve(null);
          }, 500);
        }
        
      })
      .catch(err => {
        reject(err);
      })
    });
  },

  //update data
  updateUserData(userId, newData) {
    return axios.patch(baseUri + 'users/' + userId, { data: newData }, { headers: auth });
  },

  updateUserAvatar(userId, avatarData) {
    return axios.patch(baseUri + 'users/' + userId + '/avatar', avatarData, { headers: auth });
  },

  //authentication
  getUserToken(username, password) {
    return axios.post(baseUri + 'token', { identification: username, password: password });
  },
  registerUser(data) {
    return axios.post(baseUri + 'users', { data: data }, { headers: auth });
  }
}