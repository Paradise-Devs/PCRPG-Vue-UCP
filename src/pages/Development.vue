<template>
	<div class="page__development">
		<b-container>
			<spinner :loading="projectsLoading" color="#303846" size="90px"></spinner>
			<b-row>
				<b-col md="3">
					<b-list-group v-if="projectsProcessed" class="list-group--custom">
						<b-list-group-item
							href="#"
							v-for="project in projects"
							:key="project.index"
							@click="activeProject(project.id)"
							:class="{'active': project.id == selectedProject}"
						>
							<h1 class="title">{{ project.name }}</h1>
							<h3 class="desc">{{ project.description }}</h3>
							<span class="stats"><b>Commits:</b> {{ project.commits }}</span>
						</b-list-group-item>
					</b-list-group>
				</b-col>
				<b-col md="9">
					<div infinite-wrapper>
						<commits 
							v-for="commit in commits" 
							:key="commit.id"
							:commit='commit'
						/>
					</div>
					<infinite-loading force-use-infinite-wrapper="true" @infinite="updateScroller" spinner="spiral" v-if="projectsProcessed" :key="infiniteId">
						<span class="nomore" slot="no-more">Aqui foi onde tudo começou.</span>
						<span class="nomore" slot="no-results">Ainda não tivemos atualizações nesse repositório :(</span>
					</infinite-loading>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
	import GitService from '@/services/gitlab'
	import InfiniteLoading  from 'vue-infinite-loading';
	import spinner from 'vue-spinner/src/MoonLoader.vue';

	import commits from '@/components/commits/Commit.vue'
	import { setTimeout } from 'timers';

	export default {
		data() {
			return {
				currentPage: 1,
				loading: false,
				totalcommits: 2,
				projectsProcessed: false,
				projectsLoading: true,
				commits: [ ],
				projects: [ ],
				defaultBranch: '',
				selectedProject: 0,
				infiniteId: +new Date(),
				stats: [ ]
			}
		},
		methods: {
			activeProject(project) {
				this.selectedProject = project;
				this.currentPage = 1;
				this.commits = [];
				this.infiniteId += 1;
				this.getCommits();
			},
			getCommits() {
				return GitService.getProjectCommits(this.selectedProject, this.currentPage, this.defaultBranch);
			},
			updateScroller($state) {
				this.getCommits()
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
			getStats() {
				for(let i in this.projects) {
					GitService.getStats(this.projects[i].id)
					.then(response => {
						this.projects[i].commits = response.data.statistics.commit_count;
					});
				}

				let self = this;
				setTimeout(function() {
					self.projectsProcessed = true;
					self.projectsLoading = false;
				}, 1000);
			}
		},
		
		mounted() {
			GitService.getProjects()
			.then(response => {
				this.projects = response.data;
				this.selectedProject = this.projects[0].id;
				this.defaultBranch = this.projects[0].default_branch;
				this.getStats();
			})
			.catch(e => {
				console.log(e);
				$state.loaded();
			});
		},
		components: {
			InfiniteLoading, commits, 'spinner': spinner
		},
	}
</script>