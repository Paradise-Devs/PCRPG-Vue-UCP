<!--suppress ALL -->
<template>
	<b-container class="profile__config">
		<b-row align-h="between">
			<b-col md="3" sm="12" class="profile__config__block">
				<h3 class="profile__config__block__title">Alterar e-mail</h3>
				<p class="profile__config__block__text">Você pode alterar os seus dados de acesso sempre que quiser. Lembre-se de ter sempre um email válido, pois é ele que você vai utilizar para validar qualquer operação importante no servidor.</p>
				<form class="form--small" v-on:submit.prevent="changeEmail()">
					<b-form-group label="Email atual:">
						<b-form-input type="email" :value="user.email" disabled></b-form-input>
					</b-form-group>
					<b-form-group label-for="exampleInput1">
						<b-form-input 
							type="email"
							v-model="changed.email"
							placeholder="E-mail novo"
							v-validate="'email'"
							name="email"
							:class="{ 'is-invalid': errors.has('email') || errorEmail, 'is-valid': !errors.has('email') && changed.email.length != 0 }"
							:state="null"
							@change="checkIfEmailExists"
							autocomplete="on"
							:disabled="emailChecking"
						/>
						<beatloader :loading="emailChecking" color="#303846" size="5px" class="input-spinner"></beatloader>
						<div class="invalid-feedback" v-show="errors.has('email')">{{ errors.first('email') }}</div>
					</b-form-group>
					<b-form-group>
						<b-button
							type="submit"
							variant="primary"
							:disabled="loadingEmail || errors.has('email') || changed.email.length === 0 || emailChecking"
							block
						>
							Alterar <moonloader :loading="loadingEmail" color="#303846" size="25px"></moonloader>
						</b-button>
					</b-form-group>
				</form>
			</b-col>
			<b-col md="5" sm="12" class="profile__config__block">
				<h3 class="profile__config__block__title">Alterar senha</h3>
				<p class="profile__config__block__text">Sua senha deve ser única e não pode ser compartilhada com terceiros. A equipe do PC:RPG nunca vai solicita-la para prestar qualquer tipo de suporte. Você é o único responsável por ela, é possível recuperá-la através do seu e-mail.</p>
			</b-col>
			<b-col md="3" sm="12" class="profile__config__block">
				<h3 class="profile__config__block__title">Alterar usuário</h3>
				<p class="profile__config__block__text">Seu usuário é único e é como você gostaria de ser chamado fora do jogo. Lembre-se de respeitar a política de nome de usuário que encontra-se nas <a href="#" target="_blank">regras</a>.</p>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import Vue from 'vue';
	import axios from 'axios';
	import { store } from '@/vuex/store';

	import beat from 'vue-spinner/src/BeatLoader.vue';
	import moon from 'vue-spinner/src/MoonLoader.vue';

	var tokenAPI, loginAPI, usersAPI;

	if((location.hostname != "pc-rpg.com.br") && (location.hostname != "www.pc-rpg.com.br")) {
		tokenAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/token';
		loginAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/login/';
		usersAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/players/';
	} else {
		tokenAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/token';
		loginAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/login/';
		usersAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/players/';
	}

	var usersForumAPI = 'https://forum.pc-rpg.com.br/api/users/';

	export default {
		data() {
            return {
				user: store.state.user,
				userLoggedIn: null,
				changed: {
					email: '',
					pass: '',
					username: ''
				},
				emailChecking: false,
				errorEmail: null,
				loadingEmail: false
            }
        },
		methods: {
			checkIfEmailExists: function () {
				if(this.changed.email.length >= 3) {
					this.emailChecking = true;

					axios.get(usersAPI)
					.then(response => {
						for (var i = 0; i < response.data.length; i++) {
							if (response.data[i].email == this.changed.email) {
								this.errorEmail = 'Este e-mail já está em uso';
								this.emailChecking = false;
							} else {
								this.errorEmail = null;
								this.emailChecking = false;
							}
						}
					})
				} else {
					this.errorEmail = null;
				}
			},
			changeEmail: function () {
				this.loadingEmail = true;

				this.checkIfEmailExists();

				if(this.errorEmail === null) {
					axios.patch(usersAPI + this.user.username, {
						masterkey: store.getters.getUpdateMasterToken,
						email: this.changed.email,
					})
					.then(response => {
						this.updateUserForumEmail();
					})
					.catch(function (error) {
						console.log(error);
						this.loadingEmail = false;
					})
				}
			},
			updateUserForumEmail: function() {
				axios.patch(usersForumAPI + this.user.forumAtt.id, {
					data: {
						attributes: {
							email: this.changed.email
						}
					},
				},
				{
					headers: {
						"Authorization": "Token " + store.getters.getMasterToken + 'userId=' + this.user.forumAtt.id
					}
				})
				.then(response => {						
					this.user.forumAtt = response.data.data;
					this.user.email = this.changed.email;
					
					store.dispatch('setData', this.user).then(() => {
						this.loadingEmail = false;
					});
				})
				.catch(function (error) {
					console.log(error);
				})
			}
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
			'beatloader': beat,
			'moonloader': moon,
		}
	}
</script>

<style lang="scss">
	@import '../../assets/sass/main.scss';
</style>