<template>
  <div class="messaging__list">
    <div v-if="messages.length > 0">
      <paginate name="messages" :list="messages" :per="5" class="list">
        <li v-for="(msg, index) in paginated('messages')" :key="index" @click="getSelectedElements">
          <message :msg="msg" :key="infiniteId"/>
        </li>
      </paginate>
      <paginate-links
        for="messages"
        :async="true"
        :show-step-links="true"
        :hide-single-page="true"
        @change="onPageChange"
      >
      </paginate-links>
    </div>
    <div class="empty" v-else>
      <h3>Nenhuma mensagem encontrada</h3>
    </div>
    <b-button variant="danger" @click="confirmDelete()" class="deleteMessagesBtn" v-if="selected.length >= 1"><fa-icon icon="trash-alt"/> Deletar {{ selected.length }} <span v-if="selected.length == 1">mensagem</span><span v-else>mensagens</span></b-button>
  </div>
</template>

<script>
  import ForumService from "@/services/forum";
  import MessagingService from "@/services/messaging";

  import message from "./message";

  export default {
    props: {
      messages: Array,
      clickable: Boolean
    },
    data() {
      return {
        selected: {},
        infiniteId: +new Date(),
        clickDisabled: false,
        paginate: ["messages"]
      };
    },
    methods: {
      getSelectedElements: function(el) {
        if (el.target.classList.contains("message") && this.clickable) {
          if (!el.target.classList.contains("message--selected")) {
            el.target.classList.add("message--selected");
          } else {
            el.target.classList.remove("message--selected");
          }

          let allMessages = document.getElementsByClassName("message--selected");
          this.selected = [];
          for (let i = 0; i < allMessages.length; i++) {
            this.selected.push(allMessages[i].dataset.msgid);
          }
        }
      },
      confirmDelete: function() {
        var r = confirm(
          "Você tem certeza que deseja deletar? A mensagem será movida para a pasta lixeira."
        );
        if (r == true) {
          MessagingService.deleteMessage(this.selected)
            .then(res => {
              this.$router.push(this.$route.query.redirect || "/ucp/mensagens");
              this.$root.$emit("reloadInbox");
            })
            .catch(error => {
              console.log(error.response);
            });
        }
      },
      onPageChange: function() {
        this.infiniteId += 1;
      }
    },
    components: {
      message
    }
  };
</script>
