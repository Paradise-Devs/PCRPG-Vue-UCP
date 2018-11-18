<template>
  <div class="post">
    <a :href="'https://forum.pc-rpg.com.br/d/' + patch.id + '-' + patch.attributes.slug" class="post__content">
      <h3 class="post__content__title">{{ patch.attributes.title }}</h3>
      <ul class="post__content__info">
        <li class="post__created">
          <span>
            {{ patch.attributes.startTime | moment }}
          </span>
        </li>
      </ul>
    </a>
    <span class="post__comments"><icon :icon="['far', 'comments']" /> {{ patch.attributes.commentsCount }}</span>
  </div>
</template>

<script>
  import moment from "moment";
  import { comments } from "@fortawesome/fontawesome-free-regular";

  export default {
    props: {
      patch: Object
    },
    filters: {
      moment: function(time) {
        return moment(time).fromNow();
      }
    }
  };
</script>