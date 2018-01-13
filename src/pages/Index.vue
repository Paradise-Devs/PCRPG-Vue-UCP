<template>
	<div id="indexContent">
		<b-container>
			<serverinfo/>
			<b-row>
				<b-col cols="8">
					<h3 class="content-title">Últimas novidades</h3>
					<news 
						v-for="post in post" 
						:key="post.id"
						:post='post'
					/>
				</b-col>
				<b-col cols="4" class="patchnotes">
					<h3>Notas de atualização</h3>
					<patchnotes 
						v-for="patch in patchnotes" 
						:key="patch.id"
						:patch='patch'
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
				post: [ 
                    {
                        author: "Los",
						avatar: 'http://forum.pc-rpg.com.br/assets/avatars/yfxszgvijojyjf8l.png',
						link: '16-novo-site-f-rum',
						title: 'Novo site + Fórum',
						tagcolor: 'color: rgb(41, 121, 255);',
						tagbg: 'background-color: rgb(41, 121, 255);',
						tagtext: 'Anúncios',
						created: '2018-01-13T00:59:26-02:00',
						comments: 3
                    }
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
				comments: 5
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