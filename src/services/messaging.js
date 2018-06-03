import Vue from 'vue';
import axios from 'axios';

var baseUri;

if((location.hostname != "pc-rpg.com.br") && (location.hostname != "www.pc-rpg.com.br")) {
    baseUri = 'http://dev.pc-rpg.com.br:3000/api/v1/messages/';
} else {
    baseUri = 'https://prod.pc-rpg.com.br:3000/api/v1/messages/';
}

export default {
    //send
    sendMessage(from, to, subject, body) {
        return axios.post(baseUri + 'send', 
            { from: from, to: to, subject: subject, body: body, sendDate: new Date().getTime() },
            { Authorization: "Bearer " + localStorage.getItem('token') }
        );
    },

    //get messages
    getMessageData(msgid) {
        return axios.get(baseUri + msgid, { Authorization: "Bearer " + localStorage.getItem('token') });
    },
    getMessagesTo(user) {
        return axios.get(baseUri + 'to/' + user, { Authorization: "Bearer " + localStorage.getItem('token') });
    },
    getMessagesFrom(user) {
        return axios.get(baseUri + 'from/' + user, { Authorization: "Bearer " + localStorage.getItem('token') });
    },
    getDeletedMessages(user) {
        return axios.get(baseUri + 'from/' + user, { Authorization: "Bearer " + localStorage.getItem('token') });
    },

    //Update
    markMessageAsRead(msgid) {
        return axios.post(baseUri + 'markAsRead', { messageId: msgid }, { Authorization: "Bearer " + localStorage.getItem('token') });
    },

    //delete
    deleteMessage(messagesid) {
        return axios.delete(baseUri + 'delete', { messages: messagesid }, { Authorization: "Bearer " + localStorage.getItem('token') });
    }
}