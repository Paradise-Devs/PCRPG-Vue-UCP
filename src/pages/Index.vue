<template>
	<div id="indexContent">
		<b-container>
			<serverinfo/>
			<b-row>
				<b-col cols="8">
					<div class="block no-border">
						<div class="block-header primary">
							<h3>Anúncios</h3>
						</div>
						<div class="block-content">
							<vue-spinner :loading="news.loading" color="#303846" size="10px" class="news-loader"></vue-spinner>
							<div v-if="news.processed">
								<paginate name="news" :list="posts" :per="4">
									<li v-for="post in paginated('news')" :key="post.id">
										<news :post='post' />
									</li>
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
				</b-col>
				<b-col cols="4" class="patchnotes">
					<div class="block no-bottom no-footer">
						<div class="block-header">
							<h3>Últimas atualizações</h3>
						</div>
						<div class="block-content">
							<patchnotes 
								v-for="patch in patchnotes" 
								:key="patch.id"
								:patch='patch'
								class="patchnotes"
							/>
						</div>
					</div>
				</b-col>				
			</b-row>
		</b-container>
		<stats/>
		<b-container>
			<div class="joinus">
				<h2><b>#</b>Junte-se a nós</h2>
				<b-row>
					<b-col cols="4">
						<discord/>
					</b-col>
					<b-col cols="4">
					</b-col>
					<b-col cols="4">
					</b-col>
				</b-row>
			</div>
		</b-container>
	</div>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';

	import 'vue-awesome/icons/comment-o'

	import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
	import serverinfo from '@/components/index/ServerInfo.vue'
	import news from '@/components/index/News.vue'
	import patchnotes from '@/components/index/Patchnotes.vue'
	import stats from '@/components/index/Statistics.vue'
	import discord from '@/components/social/Discord.vue'

	var forumBaseURI = 'http://forum.pc-rpg.com.br/api/';
	var newsDiscussions = forumBaseURI + 'discussions?filter[q]=tag:anuncios';

	export default {
		data() {
			return {
				news: {
					loading: false,
					processed: false,
				},
				posts: [ ],
				patchnotes: [  ],
				paginate: ['news']
			}
		},
		mounted() {
			this.news.processed = false;
			this.news.loading = true;

			axios.get(newsDiscussions)
			.then(response => {
				this.posts = response.data.data;
				this.news.processed = true;
				this.news.loading = false;
			})
		},
		components: {
			'vue-spinner': PulseLoader, serverinfo, news, patchnotes, stats, discord
		}
    }
</script>

<style>
	.news-loader {
		height: 64px;
	}

	.joinus {
        margin: 30px 0px;
    }

    .joinus .row {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 367px;
    }

    .joinus h2 {
        color: #526cff;
        text-transform: uppercase;
        font-size: 20px;
        margin-bottom: 20px;
    }

    .joinus h2 b {
        color: #6c7d93;
    }

    .joinus .block .block-header svg {
        margin-right: 5px;
		display: inline;
    }
</style>