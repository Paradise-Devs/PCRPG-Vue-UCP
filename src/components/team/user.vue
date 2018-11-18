<template>
  <div class="user">
    <userAvatar class="user__avatar" :url="user.avatarUrl" :username="user.username" size="36px" clickable/>
    <router-link :to="'/jogador/' + user.username" class="user__content">
      <user-name :username="user.username" class="user__name"/>
      <ul class="user__info">
        <li>
          Visto pela última vez {{ user.lastSeenTime | moment }}
        </li>
      </ul>
    </router-link>
  </div>
</template>

<script>
  import moment from "moment";
  import userAvatar from "@/components/user-profile/avatar";
  import userName from "@/components/user-profile/username";

  export default {
    props: ["user"],
    filters: {
      moment: function(time) {
        return moment(time).fromNow();
      }
    },
    components: {
      userAvatar,
      userName
    }
  };
</script>