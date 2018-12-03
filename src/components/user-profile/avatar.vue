<template>
    <div class="comp__userAvatar" :class="{'comp__userAvatar--editable': editable }" :style="autoStyle">
        <router-link :to="'/jogador/' + username" class="router-link" v-if="clickable">
            <img :src="url" v-if="url != null" />
            <div class="comp__userAvatar--empty" v-else> ? </div>
            <div class="comp__userAvatar__uploader" v-if="editable && processingStep == 0">
                <label for='newAvatarField' class="button"><fa-icon icon="upload" /></label>
                <input id='newAvatarField' type='file' accept="image/jpeg, image/png" @change="onFileChanged">
            </div>
        </router-link>
        <div v-else>
            <img :src="url" v-if="url != null" />
            <div class="comp__userAvatar--empty" v-else> ? </div>
            <div class="comp__userAvatar__uploader" v-if="editable && processingStep == 0">
                <label for='newAvatarField' class="button"><fa-icon icon="upload" /></label>
                <input id='newAvatarField' type='file' accept="image/jpeg, image/png" @change="onFileChanged">
            </div>
        </div>
        <span 
            class="comp__userAvatar__uploader__status" 
            :class="{'comp__userAvatar__uploader__status--success': processingSuccess, 'comp__userAvatar__uploader__status--error': processingError }"
            v-if="processingStep != 2 && processingStep > 0 && editable"
        > 
            <span v-if="processingStep == 1">Iniciando...</span>
            <span v-if="processingStep == 3">Finalizando...</span>
            <span v-if="processingStep == 4">Atualizando...</span>
            <span v-if="processingStep == 5">Erro!</span>
        </span>
        <b-progress class="comp__userAvatar__uploader__status" :max="processingMax" v-else-if="processingStep == 2">
            <b-progress-bar :value="processingPerc">
               {{ animatedProcessingValue }}%
            </b-progress-bar>
        </b-progress>
    </div>
</template>

<script>
  import axios from "axios";
  import { store } from "@/vuex/store";
  import { TweenMax } from "gsap";
  import ForumService from "@/services/forum";

  var usersBaseURI = "https://forum.pc-rpg.com.br/api/users/";

  export default {
    props: {
      username: {
        type: String,
        default: null
      },
      url: {
        type: String,
        default: null
      },
      size: {
        type: String,
        default: "80px"
      },
      mobSize: {
        type: String,
        default: "36px"
      },
      editable: {
        type: Boolean,
        default: false
      },
      clickable: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        user: [],
        localUser: store.state.user,
        userForumId: null,
        processingStep: 0,
        processingPerc: 0,
        processingTweenedPerc: 0,
        processingMax: 100,
        processingSuccess: false,
        processingError: false,

        width: null,
        height: null
      };
    },
    watch: {
      processingPerc: function(newValue) {
        TweenLite.to(this.$data, 0.5, { processingTweenedPerc: newValue });
      }
    },
    computed: {
      animatedProcessingValue: function() {
        return this.processingTweenedPerc.toFixed();
      },
      autoStyle: function() {
        if (window.innerWidth < 768) {
          return "width: " + this.mobSize + "; height: " + this.mobSize;
        } else {
          return "width: " + this.size + "; height: " + this.size;
        }
      }
    },
    methods: {
      onFileChanged(event) {
        this.url = URL.createObjectURL(event.target.files[0]);
        this.uploadAvatar(event.target.files[0]);
      },
      uploadAvatar: function(file) {
        this.processingStep = 1;
        const formData = new FormData();
        formData.append("avatar", file, file.name);

        let tot = 0;
        let perc = 0;

        axios
          .post(usersBaseURI + this.userForumId + "/avatar", formData, {
            headers: {
              Authorization:
                "Token " +
                store.getters.getMasterToken +
                "userId=" +
                this.userForumId
            },
            onUploadProgress: ProgressEvent => {
              perc = (ProgressEvent.loaded / ProgressEvent.total) * 100;
              this.processingStep = 2;
              this.processingPerc = perc;

              if (perc.toFixed() == 100) {
                this.processingStep = 3;
                this.processingSuccess = true;
              }
            }
          })
          .then(response => {
            this.url = response.data.data.attributes.avatarUrl;
            this.processingStep = 4;
            this.processingSuccess = true;

            if (this.username === this.localUser.username) {
              this.localUser.avatarUrl =
                response.data.data.attributes.avatarUrl;

              store.dispatch("setData", this.localUser).then(() => {
                location.reload();
              });
            }
          })
          .catch(error => {
            this.processingStep = 5;
            console.log(error);
          });
      }
    },
    mounted() {
      if (this.username === this.localUser.username) {
        this.userForumId = this.localUser.id;
      } else {
        ForumService.getUserData(this.username).then(res => {
          this.userForumId = res.data.data.id;
        });
      }
    }
  };
</script>