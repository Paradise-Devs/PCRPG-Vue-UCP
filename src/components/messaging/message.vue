<template>
  <div 
    class="message" 
    :class="{ 'message--unreaded': !msg.isRead, 'message--selected': msg.selected }"
    @dblclick="openMessage(msg)"
    @click="openMobMessage(msg)"
    :data-msgid="msg._id"
  >
    <div class="avatar">
      <userAvatar :url="sender.avatar" :username="sender.username" size="60px" mobSize="62px" />
    </div>
    <div class="content">
      <h5 class="title">{{ msg.subject }}</h5>
      <span class="info">Enviado por <user-name :username="sender.username" v-if="userProcessed" /> {{ msg.sendDate | moment }} atrás.</span>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import ForumService from "@/services/forum";
  import userAvatar from "@/components/user-profile/avatar";
  import userName from '@/components/user-profile/username'

  export default {
    props: {
      msg: Object
    },
    data() {
      return {
        sender: {
          avatar: null,
          username: null,
          userProcessed: false
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
        this.$router.push(
          this.$route.query.redirect || "mensagens/ver/" + msg._id
        );
      },
      openMobMessage: function(msg) {
        if (window.innerWidth < 767) {
          this.$router.push(
            this.$route.query.redirect || "mensagens/ver/" + msg._id
          );
        }
      }
    },
    mounted() {
      ForumService.getUserData(this.msg.sender.username).then(user => {
        this.sender.username = user.data.data.attributes.username;
        this.sender.avatar = user.data.data.attributes.avatarUrl;
        this.userProcessed = true;
      });
    },
    components: {
      userAvatar, userName
    }
  };
</script>