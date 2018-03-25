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
                    <dots-spinner :loading="avatarLoading" color="#303846" size="5px" class="username-loader"></dots-spinner> 
                    <span v-if="avatarProcessed">{{ post.attributes.startTime | moment }} • {{ post.attributes.commentsCount }} post<span v-if="post.attributes.commentsCount > 1">s</spaN></span>
                </li>
            </ul>
        </a>
        <dots-spinner :loading="tagLoading" color="#303846" size="5px" class="tag-loader"></dots-spinner> 
        <b-badge class="tag" :style="{ backgroundColor: tags.bg }" v-if="tagProcessed">{{ tags.text }}</b-badge>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import BounceLoader from 'vue-spinner/src/BounceLoader.vue';

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

            axios.get(forumBaseURI + 'users/' + this.post.relationships.startUser.data.id)
            .then(response => {
                this.username = response.data.data.attributes.username;
                this.useravatar = response.data.data.attributes.avatarUrl;
                this.avatarProcessed = true;
                this.avatarLoading = false;
            })

            axios.get(forumBaseURI + 'tags')
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
            'avatar-spinner': BounceLoader, 'dots-spinner': PulseLoader
        }
    }
</script>

<style lang="scss" scoped>
    .post {
        padding-right: 0px;

        .content {
            h3 {
                white-space: nowrap;
                overflow: hidden;
                max-width: 180px;
            }
        }

        .badge {
            margin-right: 0;
            position: absolute;
            right: 15px;
            top: 23px;
            max-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            border-radius: 4px;
            font-size: 9px;
            background-color: transparent;
            display: inline-block;
            text-transform: none;
            padding: 5px 5px;
            color: #000;
            font-weight: 600;
            transition: max-width .2s ease-in-out,-webkit-mask-image .2s;
            -webkit-mask-image: linear-gradient(to right, #000 140px, rgba(0,0,0,0) 150px);
        }

        .tag-loader {
            width: 40px;
            margin-right: 0;
            position: absolute;
            right: 15px;
            top: 15px;
            max-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            border-radius: 4px;
            font-size: 9px;
            background-color: transparent;
            display: inline-block;
            text-transform: none;
            padding: 5px 5px;
            color: #000;
            font-weight: 600;
            transition: max-width .2s ease-in-out,-webkit-mask-image .2s;
            -webkit-mask-image: linear-gradient(to right, #000 140px, rgba(0,0,0,0) 150px);
        }
    }
</style>