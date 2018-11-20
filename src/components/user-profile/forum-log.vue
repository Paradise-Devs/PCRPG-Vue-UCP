<template>
	<div>
		<div class="forumlog__container" v-if="lastPosts.length > 0">
			<div class="forumlog__container__content">
				<vue-spinner :loading="forum.loading" color="#303846" size="10px"></vue-spinner>
				<div v-if="forum.processed">
					<post v-for="post in lastPosts.slice(0, 5)" :key="post.id" :post="post" :user="user"/>
				</div>
				<a :href="'https://forum.pc-rpg.com.br/u/' + user.username" class="btn btn-primary" target="_blank" v-if="lastPosts.length > 5">Ver todos</a>
			</div>
		</div>
		<div v-else>
        	<div v-if="forum.processed">Não há dados para serem mostrados</div>
		</div>
	</div>
</template>

<script>
	import ForumService from "@/services/forum";
	import moment from "moment";
	import PulseLoader from "vue-spinner/src/PulseLoader.vue";

	import post from "./forum-post";

	export default {
		props: {
			user: Object
		},

		data() {
			return {
				lastPosts: {},
				forum: {
					loading: false,
					processed: false
				}
			};
		},
		mounted() {
			this.forum.loading = true;

			ForumService.getLastestPostsByUser(this.user.forumAtt.id).then(response => {
				let posts = response.data.data;

				let validPosts = [];
				for (let i = 0; i < posts.length; i++) {
					if (posts[i].attributes.contentType === "comment") {
						validPosts.push(posts[i]);
					}
				}

				this.lastPosts = validPosts;
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
			"vue-spinner": PulseLoader,
			post
		}
	};
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
