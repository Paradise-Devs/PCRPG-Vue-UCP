<template>
	<div id="commitsContent">
		<b-container>
			<div class="commits">
				<p class="info">
					Acompanhe o desenvolvimento do servidor em tempo real.
				</p>
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
			</div>
		</b-container>
	</div>
</template>

<script>
	import axios from 'axios';

	var apiConfig = {
		headers: { 'Private-Token': 'Uyazy3QPxKsf_qiVzmah' }
	}

	export default {
		data: function() {
			return {
				commits: [ ]
			}
		},
		computed: {

		},
		mounted() {
			axios.get('https://gitlab.com/api/v4/projects/3881528/repository/commits?per_page=5', apiConfig)
			.then(response => {
				this.commits = response.data
			})
			.catch(e => {
				console.log(e)
			})
		}
	}
</script>

<style>
	#commitsContent {
		min-height: 63vh;
		padding: 40px 0px;
	}

	.commits .commit:not(:last-child) {
		margin-bottom: 30px;
	}
	
	.commits .commit .userinfo {
		text-align: center;
	}

	.commits .commit .message {
		vertical-align: top;
		position: relative;
		background-color: #1B2028;
		padding: 20px;
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
</style>