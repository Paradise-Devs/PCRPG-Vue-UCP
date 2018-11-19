<template>
  <div class="block-ucp block-ucp--friendlist">
		<h4 class="desc">Amigos</h4>
		<ul class="content">
      <div class="friendlist" v-if="user.friends.length > 0">
        <div class="user" v-for="(friend, index) in user.friends.slice(0, 7)" :key="index" v-if="mounted"  v-b-tooltip.hover :title="friend.username">
          <avatar-spinner :loading="!friend.avatarProcessed" color="#303846" size="47px" class="avatar__loader" v-if="mounted"></avatar-spinner> 
          <user-avatar 
            :username="friend.username"
            :url="friend.avatarUrl"
            :size="'47px'"
            clickable
            v-if="friend.avatarProcessed"
          />
        </div>
        <div class="user user--more" v-if="user.friends.length > 7 && mounted">
          <router-link to="weqeq" exact class="link"><span>+ {{ user.friends.length | remainingFriends }}</span></router-link>
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
          friends: [ ]
        }
      }
    },
    filters: {
      remainingFriends(friends) {
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