<template>
	<div id="commitsContent">
		<b-container>
			<div class="commits">
				<b-row>
					<b-col cols="6">
						Acompanhe o desenvolvimento do servidor em tempo real.
					</b-col>
					<b-col cols="6" class="stats">
						Commits: <b>{{ stats.commit_count }}</b>
					</b-col>
				</b-row>
				<b-row class="commit" v-for="commit in commits" :key="commit.id">
					<b-col cols="2" class="userinfo">
						<img :src="require('../assets/images/devs/' + commit.author_email + '.png')" v-b-tooltip.hover title="w" />
						<ul>
							<li class="devname">{{ commit.author_name }}</li>
						</ul>
					</b-col>
					<b-col cols="10" class="message">
						{{ commit.message }}
						<span class="date">{{ commit.created_at | moment("from", "now", true) }} atrás</span>
					</b-col>
				</b-row>
				<infinite-loading @infinite="getCommits" spinner="spiral">
					<span slot="no-more">Aqui foi onde tudo começou.</span>
				</infinite-loading>
			</div>
		</b-container>
	</div>
</template>

<script>
	import axios from 'axios';
	import InfiniteLoading  from 'vue-infinite-loading';

	var currentPage = 1;

	var baseuri = 'https://gitlab.com/api/v4/projects/3881528';
	var statsApi = baseuri + '?statistics=true&private_token=Uyazy3QPxKsf_qiVzmah';
	var commitsApi = baseuri + '/repository/commits?private_token=Uyazy3QPxKsf_qiVzmah&page=1&per_page=10';

	export default {
		data() {
			return {
				loading: false,
				totalcommits: 2,
				commits: [ ],
				stats: [ ]
			}
		},
		methods: {
			getCommits($state) {
				axios.get(commitsApi, {
					params: {
						page: currentPage
					}
				})
				.then(response => {
					if(response.data.length > 0) {
						currentPage++;
						this.commits = this.commits.concat(response.data);
						$state.loaded();
					} else {
						$state.complete();
					}
				})
				.catch(e => {
					console.log(e);
					$state.loaded();
				});
			},
		},
		mounted() {
			axios.get(statsApi)
			.then(response => {
				this.stats = response.data.statistics;
				console.log(response.data);
			})
			.catch(e => {
				console.log(e);
			});
		},
		components: {
			InfiniteLoading
		},
	}
</script>

<style>
	#commitsContent {
		min-height: 63vh;
		padding: 40px 0px;
	}

	.commits .commit {
		margin-right: 0px;
		margin-left: 0px;
	}

	.commits .commit:not(:last-child) {
		margin-top: 30px;
	}

	.commits .stats {
		text-align: right;
	}
	
	.commits .commit .userinfo {
		text-align: center;
	}

	.commits .commit .message {
		vertical-align: top;
		position: relative;
		background-color: #1B2028;
		padding: 10px 20px;
		border-radius: 5px;
		height: 90px;
	}

	.commits .commit .message .date {
		position: absolute;
		bottom: 10px;
		right: 20px;
		color: #303846;
	}

	.commits .commit .message:before{
		width: 0;
		height: 0;
		content:"";
		top: 0px;
		left: -25px;
		position: absolute;
		display: inline-block;
		border-top: 15px solid #1B2028;
		border-left: 15px solid transparent;
		border-right: 15px solid #1B2028;
		border-bottom: 15px solid transparent;
		content: " ";
	}

	.commits .commit .userinfo ul {
		list-style-type: none;
		margin: 0px;
		padding: 0px;
	}

	.commits .commit .userinfo ul li {
		margin: 0px;
		padding: 0px;
	}

	.commits .commit .userinfo ul li.commits {
		font-size: 12px;
		color: #303846;
	}

	.commits .commit img {
		max-width: 90px;
		border: 4px solid #1B2028;
		border-radius: 10px;
	}

	.commits span {
		font-family: Barlow;
		color: #6c7d93;
	}
</style>