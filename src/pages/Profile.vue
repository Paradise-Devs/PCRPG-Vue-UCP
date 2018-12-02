<!--suppress ALL -->
<template>
    <div class="page__user-profile">
        <loader :loading="userLoading" color="#303846" size="60px"></loader>
        
        <div v-if="!userLoading">
            <div v-if="userFound">
                <playerProfile :user="user"/>
            </div>
            <!-- Maybe a player search if player not found? -->
        </div>
    </div>
</template>

<script>
  import Vue from "vue";
  import { store } from "@/vuex/store";
  import playerProfile from "@/components/user-profile/block";
  import ForumService from "@/services/forum";
  import ServerService from "@/services/server";
  import loader from "vue-spinner/src/MoonLoader.vue";

  export default {
    data() {
      return {
        user: [],
        localUser: store.state.user,
        localUserLoggedIn: false,
        userLoading: true,
        userFound: false
      };
    },
    mounted() {
      if (this.localUser.token == null) {
        this.localUserLoggedIn = false;
      } else {
        this.localUserLoggedIn = true;
      }

      let username = this.$route.params.username;

      if(this.localUser.username != username) {
        ForumService.getUserData(username)
          .then(res => {
            this.user.forumAtt = res.data.data;
            this.user.groups = {};

            let groups = [];
            for (var i in res.data.included) {
              if (res.data.included[i].type == "groups") {
                groups.push(res.data.included[i].attributes);
              }
            }
              
            this.user.groups = groups;
            this.userLoading = false;
            this.userFound = true;
          })
          .catch(err => {
            console.log(err);
            this.userLoading = false;
            this.userFound = false;
            this.$router.push(this.$route.query.redirect || "/jogador");
          });
      } else {
        this.user = this.localUser;
        this.userFound = true;
        this.userLoading = false;
      }
    },
    components: {
      playerProfile,
      loader: loader
    }
  };
</script>

<style lang="scss" scoped>
.page__user-profile {
  padding: 10px 23px;
  min-height: 62.5vh;
}
.v-spinner {
  margin: 20px 0;
}
</style>