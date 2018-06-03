<template>
	<div class="forum__post">
		<vue-spinner :loading="postP.loading" color="#303846" size="10px"></vue-spinner>
		<div v-if="postP.processed">
			<img class="forum__post__img" :src="user.forumAtt.attributes.avatarUrl"/>
			<p class="forum__post__text">
				<span class="forum__post__text__info">
					Em <a :href="'https://forum.pc-rpg.com.br/d/' + userDiscussion.id + '-' + userDiscussion.attributes.slug + '/' + post.attributes.number" target="_blank">{{ userDiscussion.attributes.title }}</a> 
					{{ post.attributes.time | moment }}:
				</span>
				{{ post.attributes.contentHtml | parseText }}
			</p>
		</div>
	</div>
</template>

<script>
	import ForumService from '@/services/forum';
	import moment from 'moment';
	import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
	import fontawesome from '@fortawesome/vue-fontawesome'

    export default {
		props: {
			user: Object,
            post: Object,
		},
		
		data() {
			return {
				userDiscussion: { },
				postP: {
					loading: true,
					processed: false
				}
			}
		},
		mounted() {
			ForumService.getDiscussionData(this.post.relationships.discussion.data.id)
			.then(response => {
				this.userDiscussion = response.data.data;
				this.postP.loading = false;
				this.postP.processed = true;
			});
		},
		filters: {
			moment: function(time) {
				return moment(time).fromNow();
			},
			parseText: function(html) {
				var tmp = document.createElement("div");
				tmp.innerHTML = html;
				return tmp.textContent || tmp.innerText || "";
			}
		},
		components: {
			'vue-spinner': PulseLoader,
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
