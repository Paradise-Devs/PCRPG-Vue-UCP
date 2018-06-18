import Vue from "vue";
import axios from "axios";

var baseUri;

if (
	location.hostname != "pc-rpg.com.br" &&
	location.hostname != "www.pc-rpg.com.br"
) {
	baseUri = "http://dev.pc-rpg.com.br:3000/api/v1/messages/";
} else {
	baseUri = "https://prod.pc-rpg.com.br:3000/api/v1/messages/";
}

var auth = { Authorization: "Bearer " + localStorage.getItem("token") };

export default {
	//send
	sendMessage(from, to, subject, body) {
		let e = new Date();
		let date = e.toISOString();

		return axios.post(
			baseUri + "send",
			{ from: from, to: to, subject: subject, body: body, sendDate: date },
			{ headers: auth }
		);
	},

	replyMessage(from, to, subject, body, msgid) {
		let e = new Date();
		let date = e.toISOString();

		return axios.post(
			baseUri + "send",
			{ from: from, to: to, subject: subject, body: body, sendDate: date, reply: msgid },
			{ headers: auth }
		);
	},

	//get messages
	getMessageData(msgid) {
		return axios.get(baseUri + msgid, { headers: auth });
	},
	getMessagesTo(user) {
		return axios.get(baseUri + "to/" + user, { headers: auth });
	},
	getMessagesFrom(user) {
		return axios.get(baseUri + "from/" + user, { headers: auth });
	},
	getDeletedMessages(user) {
		return axios.get(baseUri + "trash/" + user, { headers: auth });
	},

	//Update
	markMessageAsRead(msgid) {
		return axios.post(
			baseUri + "markAsRead",
			{ messageId: msgid },
			{ headers: auth }
		);
	},

	//delete
	deleteMessage(messagesid) {
		return axios.post(
			baseUri + "delete",
			{ messages: [messagesid] },
			{ headers: auth }
		);
	}
};
