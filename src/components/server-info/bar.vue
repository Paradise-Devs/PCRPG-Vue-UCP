<template>
    <b-container class="server-info">
        <vue-spinner :loading="serverInfoLoading" color="#303846" size="10px"></vue-spinner>
        <b-row class="loaded" v-if="server.processed">
			<b-col cols="2" class="status online" v-if="server.online">
				Servidor Online
			</b-col>
			<b-col cols="8" class="name" v-if="server.online">
				<span>{{ server.serverName }}</span>
			</b-col>
			<b-col cols="2" class="players" v-if="server.online">
				<span>Jogadores: {{ server.currentPlayers }}/{{ server.maxPlayers}}</span>
			</b-col>
			<b-col cols="12" class="status offline" v-if="!server.online">
				Servidor Offline
			</b-col>
		</b-row>
    </b-container>
</template>

<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import axios from 'axios';

    var serverApi = 'https://cors-anywhere.herokuapp.com/http://master.mta-v.net/api/servers/detailed';

    export default {
        data() {
            return {
                serverInfoLoading: false,
				serverInfoProcessed: false,
				foundServer: false,
				timerServerInfo: '',
				server: {
					processed: false,
					online: false,
				},
            }
        },
        methods: {
			loadServerInfo() {
				this.serverInfoLoading = true;
				this.server.processed = false;

				axios.get(serverApi)
				.then(response => {
					for (let i = 0; i < response.data.list.length; i++) {
						if (response.data.list[i].resolvedIP == "176.57.141.111:4499") {
							this.server = response.data.list[i];
							this.foundServer = true;
							this.server.processed = true;
							this.server.online = true;
							this.serverInfoLoading = false;
							break;
						} else {
							this.foundServer = false;
							this.serverInfoLoading = false;
							this.server.processed = true;
							this.server.online = false;
						}
					}
				})
				.catch(e => {
					console.log(e);
				});
			}
        },
        beforeDestroy() {
			clearInterval(this.timerServerInfo)
		},
		mounted() {
            this.loadServerInfo();
            this.timerServerInfo = setInterval(this.loadServerInfo, 60000)
        },
        components: {
			'vue-spinner': PulseLoader
		}
    }
</script>

<style scoped>
	.server-info {
		margin: 30px 0px;
		padding: 10px;
		min-height: 41px;
		max-height: 41px;
		border-radius: 5px;
		border: 1px solid #303846;
	}

	.server-info .status {
		text-transform: uppercase;
	}

	.server-info .status.online {
		color: #00e676;
	}

	.server-info .status.offline {
		width: 100%;
		text-align: center;
		color: #ff5252;
	}

	.server-info .name {
		text-align: center;
	}

	.server-info .players {
		width: 100%;
		text-align: right;
	}
</style>
