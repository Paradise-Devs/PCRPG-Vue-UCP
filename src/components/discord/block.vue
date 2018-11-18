<template>
  <div class="block block--fullheight block--discord">
    <div class="block__header">
      <h3><icon :icon="['fab', 'discord']" /> {{ name }}</h3>
    </div>
    <div class="block__content">
      <vue-spinner :loading="loading" color="#303846" size="10px" class="loader" />
      <ul class="user__list" v-if="processed">
        <li class="user" v-for="member in members" :key="member.id">
          <div class="user__content">
            <img :src="member.avatar_url"/>
            <ul class="user__info">
              <li class="user__info__name">{{ member.username }}</li>
              <li class="user__info__game" v-if="member.game">Jogando {{ member.game.name}}</li>
              <li class="user__info__status" v-else>
                <span class="user__info__status--online" v-if="member.status == 'online'">online</span>
                <span class="user__info__status--away" v-if="member.status == 'idle'">ausente</span>
                <span class="user__info__status--busy" v-if="member.status == 'dnd'">ocupado</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="block__footer" v-if="processed">
      <a :href="invitation" class="btn btn-primary btn-block">Juntar-se!</a>
    </div>
  </div>
</template>

<script>
  import PulseLoader from "vue-spinner/src/PulseLoader.vue";
  import fontawesome from "@fortawesome/vue-fontawesome";
  import discord from "@fortawesome/fontawesome-free-brands";
  import DiscordService from "@/services/discord";

  export default {
    data() {
      return {
        members: [
          {
            game: null
          }
        ],
        channels: [],
        name: "",
        loading: false,
        processed: false,
        invitation: ""
      };
    },
    mounted() {
      this.loading = true;
      this.processed = false;

      DiscordService.init()
        .then(response => {
          this.members = response.data.members;
          this.channels = response.data.channels;
          this.name = response.data.name;
          this.invitation = response.data.instant_invite;
          this.processed = true;
          this.loading = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    components: {
      "vue-spinner": PulseLoader,
      fa: fontawesome
    }
  };
</script>