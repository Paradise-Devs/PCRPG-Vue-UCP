<template>
    <div class="discord">
        <vue-spinner :loading="loading" color="#303846" size="10px"></vue-spinner>
        <div v-if="processed">
            <div class="block">
                <div class="block__header">
                    <h3><fa :icon="['fab', 'discord']" /> {{ name }}</h3>
                </div>
                <div class="block__content">
                    <ul class="user__list">
                        <li class="user" v-for="member in members" :key="member.id">
                            <div class="user__content">
                                <img :src="member.avatar_url"/>
                                <ul class="user__info">
                                    <li class="user__info__name">{{ member.username }}</li>
                                    <li class="user__info__game" v-if="member.game">Jogando {{ member.game.name}}</li>
                                    <li class="user__info__status" v-else>
                                        <span class="user__info__status--online" v-if="member.status == 'online'">online</span>
                                        <span class="user__info__status--away" v-if="member.status == 'idle'">ausente</span>
                                        <span class="user__info__status--busy" v-if="member.status == 'dnd'">ocupado</span>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="block__footer">
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
    @import '../../assets/sass/base/variables.scss';

    .discord {
        .block {
            .block__content {
                max-height: 322px;
                overflow-x: auto;

                .user__list {
                    .user {
                        height: 55px;
                        padding: 6px 10px;

                        &__content {
                            position: relative;

                            img {
                                max-width: 38px;
                                border-radius: 100px;
                                position: absolute;
                                top: 2px;
                                left: 0px;
                            }
                        }

                        &__info {
                            vertical-align: top;
                            margin: -12px 48px 0px;
                            height: 38px;

                            &__name {
                                margin: 0px;
                                padding: 0px;
                            }

                            &__game {
                                font-size: 12px;
                                white-space: nowrap;
                                overflow: hidden;
                                width: 260px;
                                color: $blue;
                            }

                            li {
                                display: block;
                            }

                            &__status {
                                &--online { color: $green; }
                                &--away { color: $orange; }
                                &--busy { color: $red; }
                            }
                        }

                        &:hover {
                            background: $gray-hover;
                        }
                    }
                }
            }
        }
    }
</style>
