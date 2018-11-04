<template>
	<div class="page__development">
		<b-container>
			<b-row>
				<b-col md="6">
					Acompanhe o desenvolvimento do servidor em tempo real.
				</b-col>
				<b-col md="6" class="stats">
					Commits: <b>{{ stats.commit_count }}</b>
				</b-col>
			</b-row>
			<div infinite-wrapper>
				<commits 
					v-for="commit in commits" 
					:key="commit.id"
					:commit='commit'
				/>
			</div>
			<infinite-loading force-use-infinite-wrapper="true" @infinite="getCommits" spinner="spiral">
				<span class="nomore" slot="no-more">Aqui foi onde tudo começou.</span>
			</infinite-loading>
		</b-container>
	</div>
</template>

<script>
	import GitService from '@/services/gitlab'
	import InfiniteLoading  from 'vue-infinite-loading';

	import commits from '@/components/commits/Commit.vue'

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
				GitService.getCommits(this.currentPage)
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
			GitService.getStats()
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