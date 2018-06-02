<template>
    <div class="post">
        <a :href="'https://forum.pc-rpg.com.br/u/' + username" class="post__author">
            <avatar-spinner :loading="avatarLoading" color="#303846" size="38px" class="avatar__loader"></avatar-spinner> 
            <img class="post__author__avatar" :src="useravatar">
        </a>
        <a :href="'https://forum.pc-rpg.com.br/d/' + post.id + '-' + post.attributes.slug" class="post__content">
            <h3 class="post__content__title">{{ post.attributes.title }}</h3>
            <ul class="post__content__info">
                <li class="post__content__info__created">
                    <username-spinner :loading="avatarLoading" color="#303846" size="5px" class="username__loader"></username-spinner> 
                    <span v-if="avatarProcessed"><b>{{ username }}</b> publicou {{ post.attributes.startTime | moment }}</span>
                </li>
            </ul>
        </a>
        <span class="post__comments"><icon name="comment-o"/> {{ post.attributes.commentsCount }}</span>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import BounceLoader from 'vue-spinner/src/BounceLoader.vue';
    import 'vue-awesome/icons/comment-o'

    var forumBaseURI = 'https://forum.pc-rpg.com.br/api/';

    export default {
        props: {
            post: Object
        },
		data() {
			return {
                username: '',
                useravatar: null,
                avatarLoading: false,
                avatarProcessed: false,
			}
        },
        filters: {
			moment: function(time) {
				return moment(time).fromNow();
			}
		},
		mounted() {
            this.avatarLoading = true;
            this.avatarProcessed = false;

            axios.get(forumBaseURI + 'users/' + this.post.relationships.startUser.data.id)
            .then(response => {
                this.username = response.data.data.attributes.username;
                this.useravatar = response.data.data.attributes.avatarUrl;
                this.avatarProcessed = true;
                this.avatarLoading = false;
            })  
        },
        components: {
            'avatar-spinner': BounceLoader, 'username-spinner': PulseLoader
        }
    }
</script>

<style lang="scss" scoped>
    .post {
        padding-left: 65px;
        &__content {
            &__info {
                &__created {
                    .username__loader {
                        width: 30px;
                        margin-top: 0px;
                        position: relative;
                        top: -1px;
                        display: inline-flex;
                    }
                }
            }
        }
        .post__author {
            .avatar__loader {
                width: 38px;
                height: 38px;
                position: absolute;
                top: -6px;
                left: -1px;
                vertical-align: top;
                border-radius: 36px;
                font-size: 18px;
                line-height: 36px;
                display: inline-block;
                box-sizing: content-box;
                background-color: #1b2028;
            }
        }
    }
</style>