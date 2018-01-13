<template>
	<div id="indexContent">
		<b-container>
			<serverinfo/>
			<b-row>
				<b-col cols="8">
					<h3 class="content-title">Últimas novidades</h3>
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
				</b-col>
				<b-col cols="4" class="patchnotes">
					<h3>Notas de atualização</h3>
					<patchnotes 
						v-for="patch in patchnotes" 
						:key="patch.id"
						:patch='patch'
						class="patchnotes"
					/>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';

	import 'vue-awesome/icons/comment-o'

	import serverinfo from '@/components/index/ServerInfo.vue'
	import news from '@/components/index/News.vue'
	import patchnotes from '@/components/index/Patchnotes.vue'

	export default {
		data() {
			return {
				posts: [ 
                    {
                        author: "Los",
						avatar: 'http://forum.pc-rpg.com.br/assets/avatars/yfxszgvijojyjf8l.png',
						link: '16-novo-site-f-rum',
						title: 'Novo site + Fórum',
						tagcolor: 'color: rgb(41, 121, 255);',
						tagbg: 'background-color: rgb(41, 121, 255);',
						tagtext: 'Anúncios',
						created: '2018-01-13T00:59:26-02:00',
						comments: 1512
					},
					{
                        author: "Los",
						avatar: 'http://forum.pc-rpg.com.br/assets/avatars/yfxszgvijojyjf8l.png',
						link: '16-novo-site-f-rum',
						title: 'Novo site + Fórum',
						tagcolor: 'color: rgb(41, 121, 255);',
						tagbg: 'background-color: rgb(41, 121, 255);',
						tagtext: 'Anúncios',
						created: '2018-01-13T00:59:26-02:00',
						comments: 1231
					},
					{
                        author: "Los",
						avatar: 'http://forum.pc-rpg.com.br/assets/avatars/yfxszgvijojyjf8l.png',
						link: '16-novo-site-f-rum',
						title: 'Novo site + Fórum',
						tagcolor: 'color: rgb(41, 121, 255);',
						tagbg: 'background-color: rgb(41, 121, 255);',
						tagtext: 'Anúncios',
						created: '2018-01-13T00:59:26-02:00',
						comments: 3543
					},
					{
                        author: "Los",
						avatar: 'http://forum.pc-rpg.com.br/assets/avatars/yfxszgvijojyjf8l.png',
						link: '16-novo-site-f-rum',
						title: 'Novo site + Fórum',
						tagcolor: 'color: rgb(41, 121, 255);',
						tagbg: 'background-color: rgb(41, 121, 255);',
						tagtext: 'Anúncios',
						created: '2018-01-13T00:59:26-02:00',
						comments: 34634
					},
					{
                        author: "Los",
						avatar: 'http://forum.pc-rpg.com.br/assets/avatars/yfxszgvijojyjf8l.png',
						link: '16-novo-site-f-rum',
						title: 'Novo site + Fórum',
						tagcolor: 'color: rgb(41, 121, 255);',
						tagbg: 'background-color: rgb(41, 121, 255);',
						tagtext: 'Anúncios',
						created: '2018-01-13T00:59:26-02:00',
						comments: 3453
					},
					{
                        author: "Los",
						avatar: 'http://forum.pc-rpg.com.br/assets/avatars/yfxszgvijojyjf8l.png',
						link: '16-novo-site-f-rum',
						title: 'Novo site + Fórum',
						tagcolor: 'color: rgb(41, 121, 255);',
						tagbg: 'background-color: rgb(41, 121, 255);',
						tagtext: 'Anúncios',
						created: '2018-01-13T00:59:26-02:00',
						comments: 233
					},
					{
                        author: "Los",
						avatar: 'http://forum.pc-rpg.com.br/assets/avatars/yfxszgvijojyjf8l.png',
						link: '16-novo-site-f-rum',
						title: 'Novo site + Fórum',
						tagcolor: 'color: rgb(41, 121, 255);',
						tagbg: 'background-color: rgb(41, 121, 255);',
						tagtext: 'Anúncios',
						created: '2018-01-13T00:59:26-02:00',
						comments: 76867
					},
					{
                        author: "Los",
						avatar: 'http://forum.pc-rpg.com.br/assets/avatars/yfxszgvijojyjf8l.png',
						link: '16-novo-site-f-rum',
						title: 'Novo site + Fórum',
						tagcolor: 'color: rgb(41, 121, 255);',
						tagbg: 'background-color: rgb(41, 121, 255);',
						tagtext: 'Anúncios',
						created: '2018-01-13T00:59:26-02:00',
						comments: 87683
                    },
				],
				patchnotes: [ 
                    {
                        author: "Los",
						avatar: 'http://forum.pc-rpg.com.br/assets/avatars/yfxszgvijojyjf8l.png',
						link: '16-novo-site-f-rum',
						title: 'v1.2.4',
					},
					{
                        author: "Los",
						avatar: 'http://forum.pc-rpg.com.br/assets/avatars/yfxszgvijojyjf8l.png',
						link: '16-novo-site-f-rum',
						title: 'v1.2.2',
					},
					{
                        author: "Los",
						avatar: 'http://forum.pc-rpg.com.br/assets/avatars/yfxszgvijojyjf8l.png',
						link: '16-novo-site-f-rum',
						title: 'v1.2.1 - b2',
                    }
				],
				paginate: ['news']
			}
		},
		mounted() {
			/*axios.post('http://forum.pc-rpg.com.br/api/token', {
				identification: "Los",
				password: "784612"
			})
			.then(response => {
				console.log(response.data);
			})*/
		},
		components: {
			serverinfo, news, patchnotes
		}
    }
</script>

<style>
	#indexContent {
		min-height: 66vh;
	}

	.v-spinner {
		width: 100%;
		margin-top: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>