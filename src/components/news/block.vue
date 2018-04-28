<template>
    <div class="block news">
        <div class="block__header">
            <h3>Novidades</h3>
        </div>
        <div class="block__content" :class="[ news.posts.length > 0 ? 'block__content--borderless' : '']">
            <vue-spinner :loading="news.loading" color="#303846" size="10px" class="loader"></vue-spinner>
            <div v-if="news.processed">
                <paginate name="news" :list="news.posts" :per="4">
                    <li v-for="post in paginated('news')" :key="post.id">
                        <post :post='post' />
                    </li>
                    <p v-if="news.posts.length == 0">Ainda não temos nenhuma novidade. Fique ligado no <a href="https://forum.pc-rpg.com.br/" target="_blank">Fórum</a> para acompanhar as últimas notícias do servidor</p>
                </paginate>
                <paginate-links
                    for="news"
                    :show-step-links="true"
                    :hide-single-page="true"
                >
                </paginate-links>
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

    var forumBaseURI = 'https://forum.pc-rpg.com.br/api/';
	var newsDiscussions = forumBaseURI + 'discussions?filter[q]=tag:novidades&sort=-startTime';
    
    export default {
		data() {
			return {
				news: {
					loading: false,
                    processed: false,
                    posts: [ ]
				},
				paginate: ['news']
			}
        },
        mounted() {
			this.news.processed = false;
            this.news.loading = true;

            axios.get(newsDiscussions)
			.then(response => {
				this.news.posts = response.data.data;
				this.news.processed = true;
				this.news.loading = false;
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
    .news {
        p {
			padding: 20px 0;
			text-align: center;
			margin: 0px;
        }
        
        .loader {
		    height: 64px;
        }
    }
</style>