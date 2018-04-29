<!--suppress ALL -->
<template>

</template>

<script>
	import Vue from 'vue';
	import axios from 'axios';
	import { store } from '@/vuex/store';

	var tokenAPI, loginAPI;

	if((location.hostname != "pc-rpg.com.br") && (location.hostname != "www.pc-rpg.com.br")) {
		tokenAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/token';
		loginAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/login/';
	} else {
		tokenAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/token';
		loginAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/login/';
	}

	var usersBaseURI = 'https://forum.pc-rpg.com.br/api/users/';

	export default {
		data() {
            return {
				user: store.state.user,
				userLoggedIn: null
            }
        },
		methods: {
			
		},
		watch: {
			user: {
				handler: function(val, oldVal) {
					if(this.user.token == null) {
						this.userLoggedIn = false;
					} else {
						this.userLoggedIn = true;
					}
				}, deep: true
			}
		},
		mounted() {
			if(this.user.token == null) {
				this.userLoggedIn = false;
			} else {
				this.userLoggedIn = true;
			}
		},
		components: {
            
		}
	}
</script>

<style lang="scss">
	@import '../../assets/sass/main.scss';
</style>