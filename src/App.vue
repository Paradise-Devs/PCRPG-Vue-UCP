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
			<notifications group="main" position="bottom right"/>
			<appfooter/>
		</div>
	</div>
</template>

<script>
	import 'bootstrap/dist/css/bootstrap.css'
	import 'animate.css/animate.css'
	import { store } from '@/vuex/store'
	import spinner from 'vue-spinner/src/MoonLoader.vue';
	import ServerService from '@/services/server';
	import ForumService from '@/services/forum';

	import navbar from '@/components/global/Navbar'
	import hero from '@/components/global/Hero'
	import appfooter from '@/components/global/Footer'

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
				let token = localStorage.getItem("token");
				
				if(token != null && token != 'undefined') {
					ServerService.getToken(token)
					.then(response => {
						this.siteLoaded = true;
						this.user.username = response.data.username;
						this.user.token = response.headers['token-refresh'];
						this.getForumData();
					})
					.catch(error => {
						console.log(error.response.data);
						this.dataLoaded = true;
						this.fullyLoaded = true;
					})
				} else {
					this.siteLoaded = true;
					this.dataLoaded = true;
					this.fullyLoaded = true;
				}
			},
			getForumData: function(){
				ForumService.getUserData(this.user.username)
				.then(response => {
					this.user = response.data.data.attributes;

					let v = [ ];

					for(var i in response.data.included) {
						if(response.data.included[i].type == "groups") {
							v.push(response.data.included[i].attributes);
						}
					}

					this.user.groups = v;

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
			this.appLoaded();
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
	@import './styles/main.scss';
</style>
