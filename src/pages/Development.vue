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
				<commits 
					v-for="commit in commits" 
					:key="commit.id"
					:commit='commit'
				/>
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

	import commits from '@/components/commits/Commit.vue'

	var baseuri = 'https://gitlab.com/api/v4/projects/5181298';
	var statsApi = baseuri + '?statistics=true&private_token=Uyazy3QPxKsf_qiVzmah';
	var commitsApi = baseuri + '/repository/commits?private_token=Uyazy3QPxKsf_qiVzmah&page=1&per_page=10';

	export default {
		data() {
			return {
				currentPage: 1,
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
						page: this.currentPage
					}
				})
				.then(response => {
					if(response.data.length > 0) {
						this.currentPage++;
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
			})
			.catch(e => {
				console.log(e);
			});
		},
		components: {
			InfiniteLoading, commits
		},
	}
</script>

<style>
	#commitsContent {
		min-height: 63vh;
		padding: 40px 0px;
	}
</style>