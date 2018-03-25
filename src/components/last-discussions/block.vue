<template>
    <div class="block lastposts">
        <div class="block__header">
            <h3><fa :icon="['far', 'comments']" /> Últimas Discussões</h3>
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
    import Vue from 'vue'
	import axios from 'axios';
    import moment from 'moment';
    import fontawesome from '@fortawesome/vue-fontawesome'
	import comments from '@fortawesome/fontawesome-free-regular';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import post from './post.vue'

    var forumBaseURI = 'http://forum.pc-rpg.com.br/api/';
	var lastDiscussions = forumBaseURI + 'discussions?sort=-startTime';
    
    export default {
		data() {
			return {
				lastPosts: {
					loading: false,
                    processed: false,
                    posts: [ ]
				}
			}
        },
        mounted() {
			this.lastPosts.processed = false;
			this.lastPosts.loading = true;

            axios.get(lastDiscussions)
			.then(response => {
				this.lastPosts.posts = response.data.data;
				this.lastPosts.processed = true;
				this.lastPosts.loading = false;
			});
        },
        components: {
			'vue-spinner': PulseLoader,
            'fa': fontawesome,
            post
		}
    }
</script>

<style lang="scss" scoped>
	.lastposts {
        .block__content {
            min-height: 374px;
            max-height: 374px;
            overflow-x: auto;

            .loader {
                height: 332px;
            }

            .post {
                padding-left: 62px;
            }
        }
	}
</style>