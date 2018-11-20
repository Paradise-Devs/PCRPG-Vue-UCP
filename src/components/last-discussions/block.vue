<template>
    <div class="block block--fullheight">
        <div class="block__header">
            <h3><fa-icon icon="comments" /> Últimas Discussões</h3>
        </div>
        <div class="block__content block__content--footerless">
            <vue-spinner :loading="lastPosts.loading" color="#303846" size="10px" class="loader"></vue-spinner>
            <div v-if="lastPosts.processed">
                <post
                    v-for="post in lastPosts.posts.slice(0, 15)"
                    :key="post.id"
                    :post='post'
                />
            </div>
        </div>
    </div>
</template>

<script>
  import Vue from "vue";
  import ForumService from "@/services/forum";
  import moment from "moment";
  import PulseLoader from "vue-spinner/src/PulseLoader.vue";
  import post from "./post.vue";

  export default {
    data() {
      return {
        lastPosts: {
          loading: false,
          processed: false,
          posts: []
        }
      };
    },
    mounted() {
      this.lastPosts.processed = false;
      this.lastPosts.loading = true;

      ForumService.getLastestDiscussions().then(response => {
        this.lastPosts.posts = response.data.data;
        this.lastPosts.processed = true;
        this.lastPosts.loading = false;
      });
    },
    components: {
      "vue-spinner": PulseLoader,
      post
    }
  };
</script>