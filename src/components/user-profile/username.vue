<template>
  <span class="comp__userName" :class="assignment.nameSingular.toLowerCase()" v-if="usernameProcessed">
    <router-link
      :to="'/jogador/' + username"
      v-if="linkable"
      :title="assignment.nameSingular"
    >
      {{ username }}
    </router-link>
    <span v-else>{{ username }}</span>
  </span>
</template>

<script>
  import ForumService from '@/services/forum'

  export default {
    props: {
      username: String,
      linkable: Boolean
    },
    data() {
      return {
        assignment: [ ],
        usernameProcessed: false,
      }
    },
    mounted() {
      ForumService.getAssigment(this.username)
      .then(res => {
        this.assignment = res;
        this.usernameProcessed = true;
      })
    } 
  }
</script>