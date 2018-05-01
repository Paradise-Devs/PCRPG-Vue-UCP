<template>
    <b-container class="profile__component">
        <b-row>
            <b-card class="col-12" :class="{'card--editable': editable}">
                <div class="card-body--avatar">
                    <img :src="avatarUpdate" :key="avatarUpdate"/>
                    <div class="card-body--avatar__overlay" v-if="editable"><fa :icon="['fas','pencil-alt']" /></div>
                    <b-file accept="image/jpeg, image/png" v-model="avatarFile" v-if="editable" @change="onFileChanged"></b-file>
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

    import char from './char-card'
    import forumlog from './forum-log'
    import serverlog from './server-log'
    import history from './history'
    
    var userBaseURI = 'https://forum.pc-rpg.com.br/api/users/';

    export default {
        props: {
            user: Object,
        },
        data() {
			return {
                avatarFile: null,
                loading: true,
                editable: false,
                avatarUpdate: null,

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
            },
            onFileChanged(event) {
                this.avatarFile = event.target.files[0];
                this.uploadAvatar();
            },
            uploadAvatar: function() {
                const formData = new FormData();
                formData.append('avatar', this.avatarFile, this.avatarFile.name);
                let userId = this.user.forumAtt.id;
                axios.post(userBaseURI + userId + '/avatar', formData, {
                    headers: {
                        "Authorization": "Token " + store.getters.getMasterToken + 'userId=' + userId
                    },
                    onUploadProgress: ProgressEvent => {
                        console.log(ProgressEvent.loaded / ProgressEvent.total)
                    }
                })
                .then(response => {
                    this.user.forumAtt.attributes.avatarUrl = response.data.data.attributes.avatarUrl;

                    store.dispatch('setData', this.user).then(() => {
                        //tem alguma outra forma de atualizar esse dado de forma reativa?
                        location.reload();
                    });
                })
                .catch(error => {
                    console.log(error);
                })
            }
        },
        watch:{
			$route (to, from){
				if(window.innerWidth < 768) {
					this.closeMobNav();
				}
			},
			user: {
				handler: function(val, oldVal) {
                    this.avatarUpdate = this.user.forumAtt.attributes.avatarUrl;
                    console.log('mudou');
				}, deep: true
			}
		},
        created() {
            store.watch(
				(state)=>{
					return store.getters.getUserData
				},
				(oldValue, newValue)=>{
                    this.user = store.state.user;
                    console.log('alterou estado');
				}
			)
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
            if(this.user._id == store.getters.getUserID) {
                this.editable = true;
            }

            this.avatarUpdate = this.user.forumAtt.attributes.avatarUrl;
        },
        components: {
            'spinner': spinner,
            'fa': fontawesome,
            char, forumlog, serverlog, history,
            swiper,
            swiperSlide
        }
    }
</script>