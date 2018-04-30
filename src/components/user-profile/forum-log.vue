<template>
	<div class="forumlog__container">
		<div class="forumlog__container__content">
			<vue-spinner :loading="forum.loading" color="#303846" size="10px"></vue-spinner>
			<div v-if="forum.processed">
				<post v-for="post in lastPosts.slice(0, 5)" :key="post.id" :post="post" :user="user"/>
			</div>
			<a :href="'https://forum.pc-rpg.com.br/u/' + user.username" class="btn btn-primary" target="_blank">Ver todos</a>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';
	import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
	import fontawesome from '@fortawesome/vue-fontawesome'

	import post from './forum-post'

	var forumBaseURI =  'https://forum.pc-rpg.com.br/api/';
	var usersBaseURI = forumBaseURI + 'users/';
	var lastPosts = forumBaseURI + 'posts?filter[user]=';
	var discusURI =  forumBaseURI + 'discussions/';

    export default {
		props: {
            user: Object,
		},
		
		data() {
			return {
				lastPosts: { },
				forum: {
					loading: false,
					processed: false
				}
			}
		},
		mounted() {
			this.forum.loading = true;

			let url = lastPosts + this.user.forumAtt.id + '&sort=-time';
			axios.get(url)
			.then(response => {
				this.lastPosts = response.data.data;
				this.forum.loading = false;
				this.forum.processed = true;
			});
		},
		filters: {
			moment: function(time) {
				return moment(time).fromNow();
			},
			parseText: function(html) {
				var tmp = document.createElement("DIV");
				tmp.innerHTML = html;
				return tmp.textContent || tmp.innerText || "";
			}
		},
		components: {
			'vue-spinner': PulseLoader,
			post
		}
    }
</script>

<style scoped>
	.avatar {
		display: flex;
		justify-content: center;
		align-items: center;
		border-top-left-radius: 0.25rem;
		border-bottom-left-radius: 0.25rem;
	}
	.avatar img {
		border-radius: 100px;
		width: 40px;
		height: 100%;
	}
</style>
