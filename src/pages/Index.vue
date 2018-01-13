<template>
	<div id="indexContent">
		<b-container>
			<serverinfo/>
			<b-row>
				<b-col cols="8">
					<h3 class="content-title">Últimas novidades</h3>
					<div class="post" v-for="post in post" :key="post.id">
						<a :href="'forum/u/' + post.author" class="author">
							<img class="avatar" :src="post.avatar">
						</a>
						<a :href="'forum/d/' + post.link" class="content">
							<h3>{{ post.title }}</h3>
							<ul class="info">
								<li class="tags">
									<span class="tag">
										<span :style="post.tag.color, post.tag.bg" class="label">
											<span class="tag-text">{{ post.tag.text }}</span>
										</span>
									</span>
								</li>
								<li class="created">
									<span>
										<span class="username">Los</span> iniciou {{ post.created | moment }}
									</span>
								</li>
							</ul>
						</a>
						<span class="comments"><icon name="comment-o"/> 0</span>
					</div>
				</b-col>
				<b-col cols="4" class="patchnotes">
					<h3>Notas de atualização</h3>
					<div class="post" v-for="patch in patchnotes" :key="patch.id">
						<a :href="'forum/d/' + patch.link" class="content">
							<h3>{{ patch.title }}</h3>
						</a>
						<span class="comments"><icon name="comment-o"/> 0</span>
					</div>
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

	var serverApi = 'http://master.mta-v.net/api/servers/detailed';
	var forumApi = 'http://forum.pc-rpg.com.br/api'

	export default {
		data() {
			return {
				post: [ 
                    {
                        author: "Los",
						avatar: 'http://forum.pc-rpg.com.br/assets/avatars/yfxszgvijojyjf8l.png',
						link: '16-novo-site-f-rum',
						title: 'Novo site + Fórum',
						tag: {
							color: 'color: rgb(41, 121, 255);',
							bg: 'background-color: rgb(41, 121, 255);',
							text: 'Anúncios'
						},
						created: '2018-01-13T00:59:26-02:00'
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
		filters: {
			moment: function(time) {
				return moment(time).fromNow();
			}
		},
		components: {
			serverinfo
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

	/*news*/
	.post {
        padding-left: 62px;
        padding-right: 80px;
        position: relative;
        color: #6c7d93;
		border-radius: 4px;
		transition: background .2s;
    }

	.post:hover {
		background: #171d23;
	}

	.post:hover .content .created {
		opacity: 1;
	}

	.post a {
		text-decoration: none;
	}

    .post .author {
        text-decoration: none;
        float: left;
        margin-top: 13px;
        margin-left: -50px;
        float: left;
        margin-top: 13px;
    }

    .post .author .avatar {
        width: 36px;
        height: 36px;
        border-radius: 36px;
        font-size: 18px;
        line-height: 36px;
        display: inline-block;
        box-sizing: content-box;
        color: #fff;
        text-align: center;
        vertical-align: top;
        background-color: #1b2028;
        font-weight: normal;
    }

	.post .content {
		margin-right: -65px;
		display: inline-block;
		width: 100%;
		padding: 12px 0;
		color: inherit;
	}

	.post .content h3 {
		margin-right: 155px;
		font-size: 15px;
		line-height: 1.3;
		color: #6c7d93;
		font-weight: normal;
		overflow: hidden;
		text-overflow: ellipsis;
		margin: 0 0 3px;
	}

	.post .content .info {
		list-style-type: none;
		padding: 0;
		margin: 0;
		font-size: 12px;
	}

	.post .content .info li {
		display: inline;
		opacity: 0.7;
		-webkit-transition: opacity .2s;
		-o-transition: opacity .2s;
		transition: opacity .2s;
	}

	.post .content .info .tags {
		margin-right: 0;
		position: absolute;
		right: 80px;
		top: 23px;
		max-width: 150px;
		white-space: nowrap;
		overflow: hidden;
		transition: max-width .2s ease-in-out,-webkit-mask-image .2s;
		-webkit-mask-image: linear-gradient(to right, #000 140px, rgba(0,0,0,0) 150px);
		opacity: 1;
		display: inline;
	}

	.post .content .info .tag {
		white-space: nowrap;
	}

	.post .content .info .tag .label {
		font-size: 85%;
		font-weight: 600;
		display: inline-block;
		padding: .1em .5em;
		border-radius: 4px;
		background: #1b2028;
		background-color: rgb(27, 32, 40);
		color: #6c7d93;
		text-transform: none;
	}

	.post .content .info .tag .label:first-child:last-child {
    	border-radius: 4px;
	}

	.post .content .info .tag .label:last-child {
		border-radius: 0 4px 4px 0;
	}

	.post .content .info .tag .label:first-child {
		border-radius: 4px 0 0 4px;
	}

	.post .content .info .tag .label .tag-text {
		color: #14191f !important;
		font-weight: 600;
		text-transform: none;
	}

	.post .content .username {
		font-weight: bold;
	}

	.post .comments {
		margin-top: 21px;
		margin-right: -80px;
		width: 55px;
		color: #6c7d93;
		font-size: 14px;
		padding-left: 21px;
		float: right;
		text-decoration: none;
	}

	.post .comments .fa-icon {
		float: left;
		margin-left: -21px;
		margin-top: 2px;
	}

	/*patchnotes*/
	.patchnotes .post {
		padding-left: 20px;
	}

	.patchnotes .post .comments {
		margin-top: 14px;
	}
</style>