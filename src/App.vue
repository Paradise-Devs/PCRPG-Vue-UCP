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

	var forumAPI = 'http://forum.pc-rpg.com.br/api/users/';
	var forumTokenEndpoint = 'http://forum.pc-rpg.com.br/api/token';

	export default {
		data() {
			return {
				userdata: { },
				loading: true,
				siteLoaded: false,
				dataLoaded: false,
				fullyLoaded: false
			}
		},
		methods: {
			appLoaded: function() {
				var _this = this;
				this.userdata.token = localStorage.getItem("token");
				if(this.userdata.token != "undefined") {
					new Promise((resolve) => {
						setTimeout(() => {
							axios.get(forumAPI + 'Los')
							.then(response => {
								this.userdata.attributes = response.data.data.attributes;
							})
						}, 2000)
					})

					new Promise((resolve) => {
						setTimeout(() => {
							store.dispatch('login', _this.userdata).then(() => {
								_this.dataLoaded = true;
								_this.fullyLoaded = true;
					 		})
						}, 4000)
					})
				} else {
					_this.dataLoaded = true;
					_this.fullyLoaded = true;
				}
			}
		},
		mounted() {
			var _this = this;
			
			axios.post(forumTokenEndpoint, {
				identification: "Administrator",
				password: "4QZPYp#DpkyP-Y4K"
			})
			.then(response => {
				setTimeout(function () {
					_this.appLoaded();
					_this.siteLoaded = true;
				}, 4000);
			})
			.catch(function (error) {
				console.log(error);
				_this.loading = false;
			})
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
