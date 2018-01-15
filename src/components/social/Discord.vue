<template>
    <div class="discord">
        <vue-spinner :loading="loading" color="#303846" size="10px"></vue-spinner>
        <div v-if="processed">
            <div class="block no-bottom">
                <div class="block-header">
                    <h3><fa :icon="['fab', 'discord']" /> {{ name }}</h3>
                </div>
                <div class="block-content">
                    <ul>
                        <li class="user" v-for="member in members" :key="member.id">
                            <div class="content">
                                <img :src="member.avatar_url"/>
                                <ul class="info">
                                    <li class="username">{{ member.username }}</li>
                                    <li class="game" v-if="member.game">Jogando {{ member.game.name}}</li>
                                    <li class="status" v-else>
                                        <span class="online" v-if="member.status == 'online'">online</span>
                                        <span class="away" v-if="member.status == 'idle'">ausente</span>
                                        <span class="busy" v-if="member.status == 'dnd'">ocupado</span>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="block-footer">
                    <a :href="invitation" class="button primary block">Juntar-se!</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import fontawesome from '@fortawesome/vue-fontawesome'
    import discord from '@fortawesome/fontawesome-free-brands';
    import axios from 'axios';
    
    var discordApi = 'https://discordapp.com/api/guilds/188111558218481664/widget.json';

    export default {
        data() {
            return {
                members: [ 
                    {
                        game: null
                    }
                ],
                channels: [],
                name: '',
                loading: false,
                processed: false,
                invitation: ''
            }
        },
		mounted() {
            this.loading = true;
            this.processed = false;

            axios.get(discordApi)
            .then(response => {
                this.members = response.data.members;
                this.channels = response.data.channels;
                this.name = response.data.name;
                this.invitation = response.data.instant_invite;
                this.processed = true;
                this.loading = false;
            })
            .catch(e => {
                console.log(e);
            });
        },
        components: {
			'vue-spinner': PulseLoader, 'fa': fontawesome
		}
    }
</script>

<style>
    .discord .block .block-content {
        max-height: 280px;
        overflow-x: auto;
    }

    .discord .user img {
        max-width: 38px;
        border-radius: 100px;
        position: absolute;
        top: 2px;
        left: 0px;
    }

    .discord .user {
        height: 55px;
        padding: 10px;
    }

    .discord .user .content {
        position: relative;
    }

    .discord .user:hover {
        background: #171d23;
    }

    .discord .user .info {
        vertical-align: top;
        margin: -3px 48px 0px;
        height: 38px;
    }

    .discord .user .info .username {
        margin: 0px;
        padding: 0px;
    }

    .discord .user .info .game {
        font-size: 12px;
        margin-top: -5px;
        white-space: nowrap;
        overflow: hidden;
        width: 260px;
        color: #526cff;
    }

    .discord .user .info .status {
        font-size: 12px;
        opacity: .5;
        margin-top: -5px;
    }

    .discord .user .info .status .online {
        color: #00e676;
    }

    .discord .user .info .status .away {
        color: #ffab40;
    }

    .discord .user .info .status .busy {
        color: #ff5252;
    }

    /* scrollbar */
	.discord .block .block-content::-webkit-scrollbar-track {
		background-color: transparent;
        box-shadow: none;
	}

	.discord .block .block-content::-webkit-scrollbar {
		background-color: transparent;
        width: 6px;
        right: -100px;
	}

	.discord .block .block-content::-webkit-scrollbar-thumb {
		background-color: #1B2028;
        border: 0;
        padding: 2px;
	}
</style>
