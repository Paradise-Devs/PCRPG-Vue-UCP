<!--suppress ALL -->
<template>
	<div id="pcrpg">
		<div v-if="!fullyLoaded" class="loader">
			<div class="loader__container">
				<spinner :loading="loading" color="#303846" size="90px"></spinner>
				<h2 v-if="!siteLoaded">Carregando site...</h2>
				<h2 v-if="siteLoaded && !dataLoaded">Carregando sua conta...</h2>
			</div>
		</div>
		<div v-else>
			<header>
				<navbar/>
				<hero/>
			</header>
			<router-view/>
			<appfooter/>
			<overlay/>
		</div>
	</div>
</template>

<script>
	import 'bootstrap/dist/css/bootstrap.css'
	import 'animate.css/animate.css'
	import { store } from '@/vuex/store'
	import spinner from 'vue-spinner/src/MoonLoader.vue';
	import axios from 'axios';

	import navbar from '@/components/global/Navbar'
	import hero from '@/components/global/Hero'
	import appfooter from '@/components/global/Footer'

	var tokenAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/token';
	var loginAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/login/';
	var usersBaseURI = 'https://forum.pc-rpg.com.br/api/users/';

	export default {
		data() {
			return {
				user: { },
				loading: true,
				siteLoaded: false,
				dataLoaded: false,
				fullyLoaded: false
			}
		},
		methods: {
			appLoaded: function() {
				var _this = this;
				var token = localStorage.getItem("token");

				if(token != null) {
					axios.post(tokenAPI, {
						token: token
					})
					.then(response => {
						if(response.data.error) {
							console.log(response.data.error);
							_this.dataLoaded = true;
							_this.fullyLoaded = true;
							reject()
						} else {
							_this.user = response.data;
							_this.user.token = response.headers['token-refresh'];
							_this.getForumData();
						}
					})
					.catch(error => {
						console.log(error);
					})
				} else {
					_this.dataLoaded = true;
					_this.fullyLoaded = true;
				}
			},
			getForumData: function(){
				axios.get(usersBaseURI + this.user.username)
				.then(response => {
					this.user.forumAtt = response.data.data;
					this.authUser();
				})
				.catch(error => {
					console.log(error);
				})
			},
			authUser: function() {
				store.dispatch('login', this.user).then(() => {
					this.dataLoaded = true;
					this.fullyLoaded = true;
				})
			}
		},
		mounted() {
			var _this = this;
			_this.appLoaded();
			_this.siteLoaded = true;
		},
		components: {
			'spinner': spinner,
			navbar,
			store,
			hero,
			appfooter
		}
	}
</script>

<style lang="scss">
	@import './assets/sass/main.scss';
</style>
