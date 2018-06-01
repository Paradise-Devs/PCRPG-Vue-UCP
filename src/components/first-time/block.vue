<!--suppress ALL -->
<template>
    <b-row align-h="between" class="firsttime__block">
        <b-col md="5" sm="12">
            <textFirstTime />
        </b-col>
        <b-col md="7" sm="12">
            <formFirstTime />
        </b-col>
    </b-row>
</template>

<script>
	import Vue from 'vue';
	import axios from 'axios';
    import { store } from '@/vuex/store';

    import textFirstTime from './text';
    import formFirstTime from './form';

	var tokenAPI, loginAPI, usersAPI;

	if((location.hostname != "pc-rpg.com.br") && (location.hostname != "www.pc-rpg.com.br")) {
		tokenAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/token';
		loginAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/login/';
		usersAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/players/';
	} else {
		tokenAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/token';
		loginAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/login/';
		usersAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/players/';
	}

	var usersBaseURI = 'https://forum.pc-rpg.com.br/api/users/';

	export default {
		//char data = player_id, firstName, lastName, position, property, cash, level, xp, gender [type, enum], pedModel, traits, logoutArea

		data() {
            return {
				user: store.state.user,
				userLoggedIn: null,
            }
        },
		methods: {
            
        },
		mounted() {
			if(this.user.token == null) {
				this.userLoggedIn = false;
			} else {
				this.userLoggedIn = true;
			}

			store.watch(
				(state)=>{
					return store.getters.getUserData
				},
				(oldValue, newValue)=>{
					this.user = store.state.user;
				}
			)
        },
        components: {
            textFirstTime, formFirstTime
		}
	}
</script>

<style lang="scss">
	@import '../../assets/sass/main.scss';
</style>