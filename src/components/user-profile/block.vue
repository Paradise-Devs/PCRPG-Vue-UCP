<template>
    <b-container class="page__user-profile">
        <b-row>
            <b-col class="user-profile__block" md="12">
                <userAvatar :user="user" :editable="editable" />
                <userContent :user="user" />
            </b-col>
        </b-row>
        <swiper :options="swiperOption" ref="charsSwiper" class="char__wrapper" v-if="isMobile && charsData.length >= 1">
            <div v-if="charsData.length >= 1">
                <swiper-slide v-for="char in charsData" :key="char.id" class="char__wrapper--item">
                    <char :char='char'/>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </div>
        </swiper>
        <b-row v-else-if="isMobile && charsData.length === 0">
            <char class="col-md-12" empty/>
        </b-row>
        <b-row v-if="!isMobile" class="user-profile__chars">
            <char class="col-md-4" v-for="char in charsData" :key="char.id" :char='char' v-if="charsData.length > 0" />
            <char class="col-md-4" v-if="charsData.length === 0" empty/>
            <char class="col-md-4" v-if="charsData.length === 0" empty/>
            <char class="col-md-4" v-if="charsData.length === 0" empty/>
        </b-row>
        <b-row class="user-profile__data">
            <b-col cols="12" class="user-profile__data__container">
                <b-tabs>
                    <b-tab title="Fórum" active>
                        <forumlog :user="user" />
                    </b-tab>
                    <b-tab title="Servidor">
                        <serverlog :user="user" />
                    </b-tab>
                    <b-tab title="Histórico">
                        <history :user="user" />
                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    import spinner from 'vue-spinner/src/MoonLoader.vue';
    import fontawesome from '@fortawesome/vue-fontawesome';
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { store } from '@/vuex/store';

    import { code, bolt, support, briefcase, pencilAlt } from '@fortawesome/fontawesome-free-solid';

    import userAvatar from './avatar'
    import userContent from './content'
    import char from './char-card'
    import forumlog from './forum-log'
    import serverlog from './server-log'
    import history from './history'

    var userAPI;
    
    if((location.hostname != "pc-rpg.com.br") && (location.hostname != "www.pc-rpg.com.br")) {
		userAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/players/';
	} else {
		userAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/players/';
	}

	var userBaseURI = 'https://forum.pc-rpg.com.br/api/users/';

    export default {
        props: {
            user: Object,
        },
        data() {
			return {
                loading: true,
                editable: false,

                swiperOption: {
                    slidesPerView: 1,
                    init: true,
                    variableWidth: false,
                    pagination: {
                        el: '.swiper-pagination',
                    }
                },       
                charsData: [ ]
            }
        },
        computed: {
            isMobile: function() {
                if(window.innerWidth < 768) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        watch:{
			$route (to, from){
				if(window.innerWidth < 768) {
					this.closeMobNav();
				}
			}
		},
        methods: {
            getUserCharacters: function() {
                axios.get(userAPI + this.user.username + '/characters')
                .then(response => {
                    this.charsData = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
            }
        },
        mounted() {
            if(this.user._id == store.getters.getUserID) {
                this.editable = true;
            }
            this.getUserCharacters();
        },
        components: {
            'spinner': spinner,
            'fa': fontawesome,
            char, forumlog, serverlog, history, userAvatar, userContent,
            swiper,
            swiperSlide
        }
    }
</script>