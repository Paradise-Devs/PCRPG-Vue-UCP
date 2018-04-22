<template>
    <b-container>
        <div v-if="!playerProcessed" class="loader">
            <spinner :loading="loading" color="#303846" size="90px"></spinner>
            <h2>Procurando jogador...</h2>
		</div>
		<div v-else>
            <div v-if="playerFound">
                <b-card>
                    <div class="card-body--avatar">
                        <img :src="forumData.avatarUrl"/>
                    </div>
                    <div class="card-body--content user__info">
                        <h1 class="username">{{ username }}</h1>
                        <div class="tags">
                            <b-badge 
                                v-for="group in groupsData"
                                :key="group.id"
                                :style="{ borderColor: group.color }"
                            >
                                <span class="icon" :style="{ backgroundColor: group.color }"> 
                                    <fa :icon="['fas', group.icon]" />
                                </span>
                                <span :style="{ color: group.color }">{{ group.nameSingular}}</span>
                            </b-badge>
                        </div>
                        <div class="stats">
                            <ul>
                                <li>Membro desde {{ forumData.joinTime | moment }}</li>
                            </ul>
                        </div>
                    </div>
                </b-card>
                <swiper :options="swiperOption" ref="charsSwiper" class="char__wrapper">
                    <swiper-slide v-for="char in charsData" :key="char.id" class="char__wrapper--item">
                        <char :char='char'/>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                <b-row class="charnav">
                    <b-col cols="12">
                        <b-tabs>
                            <b-tab title="Fórum" active>
                                <forumlog/>
                            </b-tab>
                            <b-tab title="Servidor">

                            </b-tab>
                            <b-tab title="Histórico">

                            </b-tab>
                        </b-tabs>
                    </b-col>
                </b-row>
            </div>
            <div v-if="playerProcessed && !playerFound" id="player_not_found">
                <h2>Não encontramos o jogador que você está procurando</h2>
                <b-input-group>
                    <b-form-input type="text" placeholder="Que tal uma nova busca?"></b-form-input>

                    <b-input-group-append>
                        <b-btn variant="outline-secondary">Button</b-btn>
                    </b-input-group-append>
                </b-input-group>
            </div>
		</div>
    </b-container>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    import spinner from 'vue-spinner/src/MoonLoader.vue';
    import fontawesome from '@fortawesome/vue-fontawesome';
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    import code from '@fortawesome/fontawesome-free-solid';
    import bolt from '@fortawesome/fontawesome-free-solid';
    import support from '@fortawesome/fontawesome-free-solid';
    import briefcase from '@fortawesome/fontawesome-free-solid';

    import char from '@/components/char/card.vue'
    import forumlog from '@/components/char/ForumLog.vue'
    
    var usersBaseURI = 'http://forum.pc-rpg.com.br/api/users/';
    var groupsBaseURI = 'http://forum.pc-rpg.com.br/api/groups';

    export default {
        data() {
			return {
                forumData: [ ],
                groupsData: [ ],
                loading: true,
                serverData: [
                    {

                    }
                ],
                swiperOption: {
                    slidesPerView: 3,
                    init: false,

                    breakpoints: {
                        768: {
                            init: true,
                            slidesPerView: 1,
                            spaceBetween: 10
                        }
                    },
                    pagination: {
                        el: '.swiper-pagination',
                    }
                },       
                charsData: [
                    {
                        level: 240,
                        name: 'Antonio Nunes',
                        job: 'Entregador de Pizza',
                        faction: 'Sem Tetos',
                        timeplayed: '14h 22m',
                        empty: false,
                    },
                    {
                        empty: true,
                    },
                    {
                        empty: true,
                    }
                ],
                username: this.$route.params.username,
                playerFound: false,
                playerProcessed: false,
            }
        },
        beforeMount() {
            axios.get(usersBaseURI + this.username)
			.then(response => {
                this.forumData = response.data.data.attributes;
                for(var i = 0; i < response.data.included.length; i++) {
                    if(response.data.included[i].type == 'groups') {
                        this.groupsData.push(response.data.included[i].attributes);
                    }
                }
                this.playerFound = true;
                this.playerProcessed = true;
            })
            .catch(error => {
                console.log(error);
                this.playerFound = false;
                this.playerProcessed = true;
                document.getElementById('player_not_found').style.display = 'block';
            })
        },
        filters: {
            bio: function(text) {
				return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
            },
            moment: function(time) {
				return moment(time).format('LL');
			}
        },
        mounted() {
            this.playerProcessed = true;
            this.$refs.charsSwiper.swipe.destroy(false, true);
        },
        components: {
            'spinner': spinner,
            'fa': fontawesome,
            char, forumlog,
            swiper,
            swiperSlide
        }
    }
</script>

<style scoped>
    .container {
        margin-bottom: 20px;
    }
</style>
