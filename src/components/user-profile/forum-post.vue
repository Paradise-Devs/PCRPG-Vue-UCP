<template>
	<div class="forum__post">
		<vue-spinner :loading="postP.loading" color="#303846" size="10px" ></vue-spinner>
		<div v-if="postP.processed">
			<a :href="'https://forum.pc-rpg.com.br/u/' + user.forumAtt.attributes.username" target="_blank">
				<userAvatar :url="user.forumAtt.attributes.avatarUrl" :username="user.forumAtt.attributes.username" mobSize="40px" size="45px" />
			</a>
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
	import ForumService from "@/services/forum";
	import moment from "moment";
	import PulseLoader from "vue-spinner/src/PulseLoader.vue";
	import userAvatar from "./avatar";

	export default {
		props: {
			user: Array,
			post: Object
		},

		data() {
			return {
				userDiscussion: {},
				postP: {
					loading: true,
					processed: false
				}
			};
		},
		mounted() {
			ForumService.getDiscussionData(
				this.post.relationships.discussion.data.id
			).then(response => {
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
			"vue-spinner": PulseLoader,
			userAvatar
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
