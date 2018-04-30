<template>
    <b-container class="profile__component">
        <b-row>
            <b-card class="col-12">
                <div class="card-body--avatar">
                    <img :src="user.forumAtt.attributes.avatarUrl"/>
                </div>
                <div class="card-body--content user__info">
                    <h1 class="username">{{ user.forumAtt.attributes.username }}</h1>
                    <div class="tags">
                        <b-badge 
                            v-for="group in user.groups"
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
                            <li>Membro desde {{ user.forumAtt.attributes.joinTime | moment }}</li>
                        </ul>
                    </div>
                </div>
            </b-card>
        </b-row>
        <swiper :options="swiperOption" ref="charsSwiper" class="char__wrapper" v-if="IsMobile()">
            <swiper-slide v-for="char in charsData" :key="char.id" class="char__wrapper--item">
                <char :char='char'/>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <b-row v-else class="profile__component__chars">
            <char class="col-md-4" v-for="char in charsData" :key="char.id" :char='char'/>
        </b-row>
        <b-row class="profile__component__data">
            <b-col cols="12" class="profile__component__data__container">
                <b-tabs>
                    <b-tab title="Fórum" active>
                        <forumlog :user="user" />
                    </b-tab>
                    <b-tab title="Servidor">

                    </b-tab>
                    <b-tab title="Histórico">

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

    import code from '@fortawesome/fontawesome-free-solid';
    import bolt from '@fortawesome/fontawesome-free-solid';
    import support from '@fortawesome/fontawesome-free-solid';
    import briefcase from '@fortawesome/fontawesome-free-solid';

    import char from './char-card'
    import forumlog from './forum-log'
    
    var usersBaseURI = 'https://forum.pc-rpg.com.br/api/users/';
    var groupsBaseURI = 'https://forum.pc-rpg.com.br/api/groups';

    export default {
        props: {
            user: Object,
        },

        data() {
			return {
                loading: true,

                swiperOption: {
                    slidesPerView: 1,
                    init: true,
                    variableWidth: false,
                    pagination: {
                        el: '.swiper-pagination',
                    }
                },       
                charsData: [
                    {
                        empty: true,
                    },
                    {
                        empty: true,
                    },
                    {
                        empty: true,
                    }
                ]
            }
        },
        methods: {
            IsMobile: function() {
                if(window.innerWidth < 768) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        filters: {
            bio: function(text) {
                return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
            },
            moment: function(time) {
                return moment(time).format('LL');
            },
        },
        mounted() {
            //this.destroySwiper();
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