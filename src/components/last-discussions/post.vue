<template>
    <div class="post">
        <a :href="'https://forum.pc-rpg.com.br/u/' + username" class="post__author">
            <avatar-spinner :loading="avatarLoading" color="#303846" size="38px" class="avatar__loader"></avatar-spinner> 
            <userAvatar class="avatar" :url="useravatar" :username="username" size="36px" v-if="avatarProcessed"/>
        </a>
        <a :href="'https://forum.pc-rpg.com.br/d/' + post.id + '-' + post.attributes.slug" class="post__content">
            <h3 class="post__content__title">{{ post.attributes.title }}</h3>
            <ul class="post__content__info">
                <li class="post__created">
                    <dots-spinner :loading="avatarLoading" color="#303846" size="5px" class="username__loader"></dots-spinner> 
                    <span v-if="avatarProcessed">{{ post.attributes.startTime | moment }} • {{ post.attributes.commentsCount }} post<span v-if="post.attributes.commentsCount > 1">s</spaN></span>
                </li>
            </ul>
        </a>
        <dots-spinner :loading="tagLoading" color="#303846" size="5px" class="tag__loader"></dots-spinner> 
        <b-badge class="post__tag" :style="{ backgroundColor: tags.bg }" v-if="tagProcessed">{{ tags.text }}</b-badge>
    </div>
</template>

<script>
    import ForumService from '@/services/forum';
    import moment from 'moment';
    import userAvatar from '@/components/user-profile/avatar'
    
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import BounceLoader from 'vue-spinner/src/BounceLoader.vue';

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
                tagLoading: false,
                tagProcessed: false,
                tags: {
                    text: null,
                    bg: null
                }
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

            this.tagLoading = true;
            this.tagProcessed = false;

            ForumService.getUserData(this.post.relationships.startUser.data.id)
            .then(response => {
                this.username = response.data.data.attributes.username;
                this.useravatar = response.data.data.attributes.avatarUrl;
                this.avatarProcessed = true;
                this.avatarLoading = false;
            })

            ForumService.getTags()
            .then(response => {
                for(var i = 0; i < response.data.data.length; i++) {
                    if(response.data.data[i].id == this.post.relationships.tags.data[0].id) {
                        this.tags.text = response.data.data[i].attributes.name;
                        this.tags.bg = response.data.data[i].attributes.color;
                        this.tagProcessed = true;
                        this.tagLoading = false;
                    }
                }
            })
        },
        components: {
            'avatar-spinner': BounceLoader, 'dots-spinner': PulseLoader, userAvatar
        }
    }
</script>