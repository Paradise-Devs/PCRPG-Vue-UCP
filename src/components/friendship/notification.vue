<template>
  <div 
    class="dropdown-item message"
  >
    <div class="header">
      <div class="avatar">
        <user-avatar :url="request.avatar" :username="request.username" clickable size="30px" />
      </div>
      <div class="content">
        <h5 class="title"><user-name :username="request.username" /> lhe enviou uma solicitação de amizade.</h5>
        <span class="info">{{ request.requestDate | moment }} atrás.</span>
      </div>
    </div>
    <div class="body">
      <!-- buttons -->
      <button class="btn btn-primary" @click="accept">Aceitar</button>
      <button class="btn btn-secondary" @click="reject">Recusar</button>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import ForumService from "@/services/forum";
  import userName from '@/components/user-profile/username'
  import userAvatar from "@/components/user-profile/avatar";

  export default {
    props: {
      request: Object
    },
    data() {
      return {
        sender: {
          avatar: null,
          username: null,
        }
      };
    },
    filters: {
      moment: function(time) {
        return moment(time).fromNow();
      }
    },
    methods: {
      openMessage: function(msg) {
        this.$router.push(this.$route.query.redirect || "/");
        let e = this;
        setTimeout(function() {
          e.$router.push(
            e.$route.query.redirect || "/ucp/mensagens/ver/" + msg._id
          );
        });

        this.$root.$emit("refreshNotReadedMessages");
      }
    },
    mounted() {
      ForumService.getUserData(this.msg.sender.username).then(user => {
        this.sender.username = user.data.data.attributes.username;
        this.sender.avatar = user.data.data.attributes.avatarUrl;
      });
    },
    components: {
      userName, userAvatar
    }
  };
</script>