<!--suppress ALL -->
<template>
    <playerProfile :user="user"/>
</template>

<script>
	import Vue from 'vue';
	import axios from 'axios';
	import { store } from '@/vuex/store';
	import playerProfile from '@/components/user-profile/block'

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
		mounted() {
			for(var i in this.user.forumAtt.included) {
				if(this.user.forumAtt.included[i].type == "groups") {
					this.groups.push(this.user.forumAtt.included[i].attributes);
				}
			}

			var timeSave = localStorage.getItem('firstTimeUCP');
			if(timeSave != null) {
				this.$router.push(this.$route.query.redirect || '/ucp');
			}
		},
		components: {
            playerProfile
		}
	}
</script>

<style lang="scss">
	@import '../../assets/sass/main.scss';

	.ucp.container {
		min-height: 60.8vh;
	}
</style>