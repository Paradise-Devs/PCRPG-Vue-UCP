w<template>
    <div class="post">
        <a :href="'https://forum.pc-rpg.com.br/u/' + username" class="post__author">
            <avatar-spinner :loading="avatarLoading" color="#303846" size="38px" class="avatar__loader"></avatar-spinner> 
            <userAvatar class="avatar" :url="useravatar" :username="username" size="36px" v-if="avatarProcessed"/>
        </a>
        <a :href="'https://forum.pc-rpg.com.br/d/' + post.id + '-' + post.attributes.slug" class="post__content">
            <h3 class="post__content__title">{{ post.attributes.title }}</h3>
            <ul class="post__content__info">
                <li class="post__content__info__created">
                    <username-spinner :loading="avatarLoading" color="#303846" size="5px" class="username__loader"></username-spinner> 
                    <span v-if="avatarProcessed"><user-name :username="username" /> publicou {{ post.attributes.startTime | moment }}</span>
                </li>
            </ul>
        </a>
        <span class="post__comments"><icon :icon="['far', 'comments']" /> {{ post.attributes.commentsCount }}</span>
    </div>
</template>

<script>
    import ForumService from '@/services/forum'
    import moment from 'moment';
    import userAvatar from '@/components/user-profile/avatar'
    import userName from '@/components/user-profile/username'
    
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import BounceLoader from 'vue-spinner/src/BounceLoader.vue';
	import { comments } from '@fortawesome/fontawesome-free-regular';

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

            ForumService.getUserData(this.post.relationships.startUser.data.id)
            .then(response => {
                this.username = response.data.data.attributes.username;
                this.useravatar = response.data.data.attributes.avatarUrl;
                this.avatarProcessed = true;
                this.avatarLoading = false;
            })
            .catch(error => {
                console.log(error);
            })
        },
        components: {
            'avatar-spinner': BounceLoader, 'username-spinner': PulseLoader, userAvatar, userName
        }
    }
</script>