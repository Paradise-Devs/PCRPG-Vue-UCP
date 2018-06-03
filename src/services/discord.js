import Vue from 'vue';
import axios from 'axios';

var baseUri = 'https://discordapp.com/api/guilds/188111558218481664/widget.json';

export default {
    init() {
        return axios.get(baseUri);
    }
}