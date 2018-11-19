<template>
  <div class="block-ucp block-ucp--friendlist">
		<h4 class="desc">Amigos</h4>
		<ul class="content">
      <div class="friendlist" v-if="user.friends.length > 0 && mounted">
        <div class="user" v-for="(friend, index) in user.friends.slice(0, 7)" :key="index">
          <avatar-spinner :loading="!friend.avatarProcessed" color="#303846" size="47px" class="avatar__loader" v-if="mounted"></avatar-spinner> 
          <user-avatar :username="friend.username" :url="friend.avatarUrl" :size="'47px'" clickable v-if="friend.avatarProcessed"/>
        </div>
        <div class="user user--more" v-if="user.friends.length > 7">
          <router-link to="weqeq" exact class="link"><span>+ {{ user.friends.length | remaingFriends }}</span></router-link>
        </div>
      </div>
      <span v-else>Você não tem amigos ainda. Eles vão ser importantes para você no servidor.</span>
    </ul>
  </div>
</template>

<script>
  import userAvatar from "@/components/user-profile/avatar";
  import ForumService from "@/services/forum";
  import BounceLoader from 'vue-spinner/src/BounceLoader.vue';

  export default {
    /*props: {
      user: Object
    }*/
    data() {
      return {
        mounted: false,
        user: {
          friends: [
            {
              username: "riad",
              friendship_start: Date.now(),
              avatarProcessed: false
            },
            {
              username: "Victor",
              friendship_start: Date.now(),
              avatarProcessed: false
            },
            {
              username: "Wuzi",
              friendship_start: Date.now(),
              avatarProcessed: false
            },
            {
              username: "ReDKiiL",
              friendship_start: Date.now(),
              avatarProcessed: false
            },
            {
              username: "Preston",
              friendship_start: Date.now(),
              avatarProcessed: false
            },
            {
              username: "Eddye",
              friendship_start: Date.now(),
              avatarProcessed: false
            },
            {
              username: "n0minal",
              friendship_start: Date.now(),
              avatarProcessed: false
            },
            {
              username: "jonasfaria",
              friendship_start: Date.now(),
              avatarProcessed: false
            },
            {
              username: "riad",
              friendship_start: Date.now(),
              avatarProcessed: false
            },
            {
              username: "Victor",
              friendship_start: Date.now(),
              avatarProcessed: false
            },
            {
              username: "Wuzi",
              friendship_start: Date.now(),
              avatarProcessed: false
            },
            {
              username: "ReDKiiL",
              friendship_start: Date.now(),
              avatarProcessed: false
            },
            {
              username: "Preston",
              friendship_start: Date.now(),
              avatarProcessed: false
            },
            {
              username: "Eddye",
              friendship_start: Date.now(),
              avatarProcessed: false
            },
            {
              username: "n0minal",
              friendship_start: Date.now(),
              avatarProcessed: false
            },
            {
              username: "jonasfaria",
              friendship_start: Date.now(),
              avatarProcessed: false
            }
          ]
        }
      }
    },
    filters: {
      remaingFriends(friends) {
        return friends - 7;
      }
    },
    mounted() {
      for(let i = 0; i < this.user.friends.length; i++) {
        ForumService.getUserData(this.user.friends[i].username).then(res => {
          this.user.friends[i].avatarUrl = res.data.data.attributes.avatarUrl;
          this.user.friends[i].avatarProcessed = true;
        });
      }

      let e = this;
      setTimeout(function() {
        e.mounted = true;
      }, 500);
    },
    components: {
      userAvatar, 'avatar-spinner': BounceLoader
    }
  }
</script>