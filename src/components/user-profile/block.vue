<template>
  <b-container class="page__user-profile">
    <b-row>
      <b-col class="user-profile__block" md="12">
        <userAvatar :url="user.avatarUrl" :username="user.username" mobSize="80px" :editable="editable" />
        <userContent :user="user" />
        
        <!-- buttons -->
        <div class="button_group button_group--profile" v-if="localUserLoggedIn && hideLocalUser">
          <router-link 
            :to="'/ucp/mensagens/nova/' + user.username"
            class="btn btn-secondary"
          >
            <fa-icon icon="envelope" /> Enviar mensagem
          </router-link>
          <!-- se não for amigo -->
          <button class="btn btn-secondary" @click="addFriend" v-if="friendshipStatus == 0"><fa-icon icon="user-plus" /> Adicionar como amigo</button>
          <!-- amizade pendente -->
          <button class="btn btn-secondary"  @click="cancelFriendshipRequest" v-if="friendshipStatus == 1"><fa-icon icon="user-clock" /> Solicitação pendente</button>
          <!-- se for amigo -->
          <button class="btn btn-secondary" @click="removeFriend" v-if="friendshipStatus == 3"><fa-icon icon="user-minus" /> Remover amigo</button>
        </div>
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
  import ServerService from "@/services/server";
  import FriendsService from "@/services/friendship";
  import moment from "moment";
  import spinner from "vue-spinner/src/MoonLoader.vue";
  import "swiper/dist/css/swiper.css";
  import { swiper, swiperSlide } from "vue-awesome-swiper";
  import { store } from "@/vuex/store";

  import userAvatar from "./avatar";
  import userContent from "./content";
  import char from "./char-card";
  import forumlog from "./forum-log";
  import serverlog from "./server-log";
  import history from "./history";
import { setTimeout } from 'timers';

  export default {
    props: {
      user: Object
    },
    data() {
      return {
        loading: true,
        editable: false,
        localUser: store.state.user,
        localUserLoggedIn: false,
        friendshipStatus: 0,

        swiperOption: {
          slidesPerView: 1,
          init: true,
          variableWidth: false,
          pagination: {
            el: ".swiper-pagination"
          }
        },
        charsData: [],

        //buttons
        buttons: {
          message: false
        }
      };
    },
    computed: {
      isMobile: function() {
        if (window.innerWidth < 768) {
          return true;
        } else {
          return false;
        }
      },
      hideLocalUser: function() {
        if (this.user._id === this.localUser._id) {
          return false;
        } else {
          return true;
        }
      }
    },
    watch: {
      $route(to, from) {
        if (window.innerWidth < 768) {
          this.closeMobNav();
        }
      }
    },
    methods: {
      getUserCharacters: function() {
        ServerService.getPlayerCharacters(this.user.username)
          .then(response => {
            this.charsData = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      addFriend: function() {
        //lógica pra adicionar amigo
        FriendsService.addFriend(this.user.username)
        .then(res => { 
          this.friendshipStatus = 1;
        })
        .catch(err => {
          console.log(err.data.response);
        })
      },
      removeFriend: function() {
        FriendsService.removeFriend(this.localUser.username, this.user.username)
        .then(res => { 
          this.friendshipStatus = 0;
        })
        .catch(err => {
          console.log(err.data.response);
        })
      },
      cancelFriendshipRequest: function() {
        var r = confirm(
          "Você tem certeza que deseja cancelar a solicitação de amizade?"
        );
        if (r == true) {
          FriendsService.removeFriend(this.localUser.username, this.user.username)
          .then(res => { 
            this.friendshipStatus = 0;
          })
          .catch(err => {
            console.log(err.data.response);
          })
        }
      }
    },
    mounted() {
      if (this.localUser.token == null) {
        this.localUserLoggedIn = false;
      } else {
        this.localUserLoggedIn = true;
      }

      //checar status de amizade e setar friendshipstatus
      let friendFound = false;

      FriendsService.getUserFriends(this.user.username)
      .then(res => {
        for(let i in res.data) {
          if(res.data[i].username == this.localUser.username) {
            this.friendshipStatus = 2;
            friendFound = true;
          }
        }
      })
      .catch(err => {
        console.log(err);
      })

      setTimeout(function() {
        if(!friendFound) {
          this.friendshipStatus = 0;
        }
      }, 500);

      this.getUserCharacters();
    },
    components: {
      spinner: spinner,
      char,
      forumlog,
      serverlog,
      history,
      userAvatar,
      userContent,
      swiper,
      swiperSlide
    }
  };
</script>