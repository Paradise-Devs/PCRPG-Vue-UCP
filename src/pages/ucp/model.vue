<!--suppress ALL -->
<template>
	<b-container class="ucp">
		<div v-if="userLoggedIn">
			<ucpmenu v-if="!firstTime" />
			<router-view/>
		</div>
	</b-container>
</template>

<script>
import Vue from "vue";
import { store } from "@/vuex/store";
import ucpmenu from "@/components/ucp-menu/block";

export default {
  data() {
    return {
      user: store.state.user,
      userLoggedIn: null
    };
  },
  watch: {
    user: {
      handler: function(val, oldVal) {
        if (this.user.token == null) {
          this.userLoggedIn = false;
        } else {
          this.userLoggedIn = true;
        }
      },
      deep: true
    }
  },
  methods: {
    firstTime: function() {
      var timeSave = localStorage.getItem("firstTimeUCP");
      if (timeSave === "true" || timeSave === null) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    if (this.user.token == null) {
      this.$router.push(this.$route.query.redirect || "/");
    } else {
      this.userLoggedIn = true;
    }

    store.watch(
      state => {
        return store.getters.getUserData;
      },
      (oldValue, newValue) => {
        this.user = store.state.user;
      }
    );

    var timeSave = localStorage.getItem("firstTimeUCP");
    if (timeSave === "true" || timeSave === null) {
      this.firstTime = true;
      localStorage.setItem("firstTimeUCP", true);
    } else {
      this.firstTime = false;
    }

    this.$root.$on("hideFirstTimeTut", res => {
      this.firstTime = res;
    });
  },
  components: {
    ucpmenu
  }
};
</script>

<style lang="scss">
.ucp.container {
  min-height: 60.8vh;
}
</style>