import axios from "axios";

let devEnv = "https://cors-anywhere.herokuapp.com/";

if (window.location.href.indexOf("pc-rpg.com.br") > -1) {
	devEnv = "";
}

var baseUri = devEnv + "https://api.pc-rpg.com.br/api/v1/player/";

var auth = { Authorization: "Bearer " + localStorage.getItem("token") };

export default {
	getUserFriends(username) {
		return axios.get(baseUri + username + "/friends");
	},
	addFriend(username) {
    return axios.put(
      baseUri + username + "/friends", 
      { headers: auth  }
    );
	},
	getFriendDetails(username, friendname) {
    return axios.get(
      baseUri + username + "/friend/" + friendname, 
      { headers: auth }
    );
	},
	removeFriend(username, friendname) {
    return axios.delete(
      baseUri + username + "/friend/" + friendname, 
      { headers: auth  }
    );
	},
	acceptFriendRequest(username, friendname) {
		return axios.post(
			baseUri + username + "/friend/" + friendname + "/accept",
			{ headers: auth }
		);
	},
	rejectFriendRequest(username, friendname) {
		return axios.post(
			baseUri + username + "/friend/" + friendname + "/reject",
			{ headers: auth  }
		);
	}
};
