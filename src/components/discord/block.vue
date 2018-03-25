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
                    <a :href="invitation" class="btn btn-primary btn-block">Juntar-se!</a>
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

<style lang="scss">
    .discord {
        .block {
            .block-content {
                max-height: 322px;
                overflow-x: auto;

                .user {
                    height: 55px;
                    padding: 10px;

                    .content {
                        position: relative;

                        img {
                            max-width: 38px;
                            border-radius: 100px;
                            position: absolute;
                            top: 2px;
                            left: 0px;
                        }
                    }

                    .info {
                        vertical-align: top;
                        margin: -3px 48px 0px;
                        height: 38px;

                        .username {
                            margin: 0px;
                            padding: 0px;
                        }

                        .game {
                            font-size: 12px;
                            margin-top: -5px;
                            white-space: nowrap;
                            overflow: hidden;
                            width: 260px;
                            color: #526cff;
                        }

                        .status {
                            .online { color: #00e676; }
                            .away { color: #ffab40; }
                            .busy { color: #ff5252; }
                        }
                    }

                    &:hover {
                        background: #171d23;
                    }
                }
            }
        }
    }
</style>
