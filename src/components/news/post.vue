<template>
    <div class="post">
        <a :href="'http://forum.pc-rpg.com.br/u/' + username" class="author">
            <avatar-spinner :loading="avatarLoading" color="#303846" size="38px" class="avatar-loader"></avatar-spinner> 
            <img class="avatar" :src="useravatar">
        </a>
        <a :href="'http://forum.pc-rpg.com.br/d/' + post.id + '-' + post.attributes.slug" class="content">
            <h3>{{ post.attributes.title }}</h3>
            <ul class="info">
                <li class="created">
                    <username-spinner :loading="avatarLoading" color="#303846" size="5px" class="username-loader"></username-spinner> 
                    <span v-if="avatarProcessed"><b>{{ username }}</b> iniciou {{ post.attributes.startTime | moment }}</span>
                </li>
            </ul>
        </a>
        <span class="comments"><icon name="comment-o"/> {{ post.attributes.commentsCount }}</span>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import BounceLoader from 'vue-spinner/src/BounceLoader.vue';
    import 'vue-awesome/icons/comment-o'

    var forumBaseURI = 'http://forum.pc-rpg.com.br/api/';

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
        .content {
            .info {
                .created {
                    .username-loader {
                        width: 30px;
                        margin-top: 0px;
                        position: relative;
                        top: -1px;
                        display: inline-flex;
                    }
                }
            }
        }
        .author {
            .avatar-loader {
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