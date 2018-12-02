<template>
  <div class="comp__userContent">
    <user-name :username="user.username" class="comp__userContent__username"/>
    <p class="comp__userContent__bio" v-if="user.bio">{{ user.bio | bio }}</p>
    <p class="comp__userContent__bio" v-else>Bio não definida.</p>
    <div class="tags">
      <b-badge 
        v-for="group in user.groups"
        :key="group.id"
        :style="{ borderColor: group.color }"
      >
        <span class="icon" :style="{ backgroundColor: group.color }"> 
          <fa-icon :icon="group.icon" />
        </span>
        <span :style="{ color: group.color }">{{ group.nameSingular}}</span>
      </b-badge>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import { store } from "@/vuex/store";
  import userName from "@/components/user-profile/username";

  export default {
    props: {
      user: Object
    },
    filters: {
      bio: function(text) {
        let tmp = text.replace(/(?:\r\n|\r|\n)/g, " ");
        return tmp;
      }
    },
    components: {
      userName
    }
  };
</script>