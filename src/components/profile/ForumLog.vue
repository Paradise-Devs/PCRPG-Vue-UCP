<template>
	<div class="forumlog">
		<header>
			<b-row>
				<b-col cols="1">
					<div class="avatar">
						<img :src="forumData.avatarUrl"/>
					</div>
				</b-col>
				<b-col cols="5">
					<ul>
						<li><b>{{ forumData.bio }}</b></li>
						<li>Visto pela última vez a <b>{{ forumData.lastSeenTime | moment }}</b></li>
					</ul>
				</b-col>
				<b-col cols="6">
					<ul>
						<li>Discussões criadas: <b>{{ forumData.discussionsCount }}</b></li>
						<li>Comentários:  <b>{{ forumData.commentsCount }}</b></li>
					</ul>
				</b-col>
			</b-row>
		</header>
		<div class="content">
			<div class="card" v-for="post in lastPosts" :key="post.id"></div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';
	import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
	import fontawesome from '@fortawesome/vue-fontawesome'

	var forumBaseURI =  'http://forum.pc-rpg.com.br/api/';
	var usersBaseURI = forumBaseURI + 'users/';
	var lastDiscussions = forumBaseURI + 'discussions?filter[user]=';

    export default {
		data() {
			return {
				forumData: [ ],
				lastPosts: [ ],
				userID: null,
				username: this.$route.params.username,
				forumProcessed: false
			}
		},
		beforeMount() {
			var getData = new Promise(
				function(resolve, reject) {
					setTimeout(() => {
						axios.get(usersBaseURI + this.username)
						.then(response => {
							this.forumData = response.data.data.attributes;
							this.forumProcessed = true;
							this.userID = response.data.data.id;
						});
					}, Math.random() * 2000 + 1000);
				});

			getData.then(
				axios.get(lastDiscussions + this.userID)
				.then(response => {
					this.lastPosts = response.data.data;
				})
			)

			console.log(this.username);
		},
		filters: {
			moment: function(time) {
				return moment(time).fromNow();
			}
		}
    }
</script>

<style scoped>
	header {
		padding: 10px 0;
		padding: 10px 20px;
		background-color: #1B2028;
	}
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
	.forumlog .content {
		background-color: #181D24;
		padding: 20px;
		border-radius: 0 0 5px 5px;
	}
</style>
