<!--suppress ALL -->
<template>
    <playerProfile :user="user"/>
</template>

<script>
import Vue from "vue";
import { store } from "@/vuex/store";
import playerProfile from "@/components/user-profile/block";

export default {
  data() {
    return {
      user: store.state.user,
      userLoggedIn: null
    };
  },
  mounted() {
    for (var i in this.user.forumAtt.included) {
      if (this.user.forumAtt.included[i].type == "groups") {
        this.groups.push(this.user.forumAtt.included[i].attributes);
      }
    }
  },
  components: {
    playerProfile
  }
};
</script>

<style lang="scss">
.ucp.container {
  min-height: 60.8vh;
}
</style>