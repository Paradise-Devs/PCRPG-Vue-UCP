<!--suppress ALL -->
<template>
	<b-container class="ucp__config">
		<b-row>
			<b-card class="col-12 text-center card--bordered">
				<div class="card__icon">
					<fa :icon="['fas', 'info-circle']"/>
				</div>
				No UCP não é possível alterar configurações de privacidade do Fórum. Utilize a <a href="https://forum.pc-rpg.com.br/settings" target="_blank">página de configurações</a> da sua conta do Fórum para isto.
			</b-card>
		</b-row>
		<b-row align-h="between">
			<b-col md="3" sm="12" class="ucp__config__block">
				<h3 class="ucp__config__block__title">Alterar e-mail</h3>
				<p class="ucp__config__block__text">Você pode alterar os seus dados de acesso sempre que quiser. Lembre-se de ter sempre um email válido, pois é ele que você vai utilizar para validar qualquer operação importante no servidor.</p>
				<form class="form--small" v-on:submit.prevent="changeEmail()">
					<b-form-group label="Email atual:">
						<b-form-input type="email" :value="user.email" disabled></b-form-input>
					</b-form-group>
					<b-form-group>
						<b-form-input 
							type="email"
							v-model="changed.email"
							placeholder="E-mail novo"
							v-validate="'email'"
							name="email"
							:class="{ 'is-invalid': errors.has('email') || errorEmail, 'is-valid': !errors.has('email') && changed.email.length != 0 }"
							:state="null"
							@change="checkIfEmailExists()"
							autocomplete="off"
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
			<b-col md="5" sm="12" class="ucp__config__block">
				<h3 class="ucp__config__block__title">Alterar senha</h3>
				<p class="ucp__config__block__text">Sua senha deve ser única e não pode ser compartilhada com terceiros. A equipe do PC:RPG nunca vai solicita-la para prestar qualquer tipo de suporte. Você é o único responsável por ela, é possível recuperá-la através do seu e-mail.</p>
				<form class="form--small" v-on:submit.prevent="changePassword()">
					<b-form-group>
						<b-form-input 
							type="password"
							v-model="oldpassword"
							placeholder="Senha atual"
							v-validate="'required|min:8'"
							name="oldPassword"
							@change="checkPassword"
							:class="{ 'is-invalid': errors.has('oldPassword') || errorEmail, 'is-valid': !errors.has('oldPassword') && oldpassword.length != 0 }"
							:state="null"
							autocomplete="on"
						/>
						<beatloader :loading="passChecking" color="#303846" size="5px" class="input-spinner"></beatloader>
						<div class="invalid-feedback" v-show="errors.has('oldPassword')">{{ errors.first('oldPassword') }}</div>
					</b-form-group>
					<b-form-group>
						<b-form-input 
							type="password"
							v-model="changed.password"
							placeholder="Nova senha"
							v-validate="'required|min:8|confirmed:confPassword'"
							name="newPassword"
							:class="{ 'is-invalid': errors.has('newPassword') || errorEmail, 'is-valid': !errors.has('newPassword') && changed.password.length != 0 }"
							:state="null"
							autocomplete="on"
						/>
						<div class="invalid-feedback" v-show="errors.has('newPassword')">{{ errors.first('newPassword') }}</div>
					</b-form-group>
					<b-form-group>
						<b-form-input 
							type="password"
							placeholder="Confirmar nova senha"
							name="confPassword"
							:class="{ 'is-invalid': errors.has('confPassword') || errorEmail, 'is-valid': !errors.has('confPassword') && changed.password.length != 0 }"
							:state="null"
							autocomplete="on"
						/>
						<div class="invalid-feedback" v-show="errors.has('confPassword')">{{ errors.first('confPassword') }}</div>
					</b-form-group>
					<b-form-group>
						<b-button
							type="submit"
							variant="primary"
							:disabled="loadingPassword || errors.has('email') || changed.email.length === 0 || emailChecking"
							block
						>
							Alterar <moonloader :loading="loadingPassword" color="#303846" size="25px"></moonloader>
						</b-button>
					</b-form-group>
				</form>
			</b-col>
			<b-col md="3" sm="12" class="ucp__config__block">
				<h3 class="ucp__config__block__title">Alterar usuário</h3>
				<p class="ucp__config__block__text">Seu usuário é único e é como você gostaria de ser chamado fora do jogo. Lembre-se de respeitar a política de nome de usuário que encontra-se nas <a href="#" target="_blank">regras</a>.</p>
				<form class="form--small" v-on:submit.prevent="changeEmail()">
					<b-form-group label="Usuário atual:">
						<b-form-input type="text" :value="user.forumAtt.attributes.username" disabled></b-form-input>
					</b-form-group>
					<b-form-group>
						<b-form-input 
							type="text"
							v-model="changed.username"
							placeholder="Usuário novo"
							v-validate="'username'"
							name="username"
							:class="{ 'is-invalid': errors.has('username') || errorEmail, 'is-valid': !errors.has('username') && changed.username.length != 0 }"
							:state="null"
							@change="checkIfEmailExists()"
							autocomplete="off"
							:disabled="emailChecking"
						/>
						<beatloader :loading="emailChecking" color="#303846" size="5px" class="input-spinner"></beatloader>
						<div class="invalid-feedback" v-show="errors.has('email')">{{ errors.first('email') }}</div>
					</b-form-group>
					<b-form-group>
						<b-button
							type="submit"
							variant="primary"
							:disabled="loadingUsername || errors.has('email') || changed.email.length === 0 || emailChecking"
							block
						>
							Alterar <moonloader :loading="loadingUsername" color="#303846" size="25px"></moonloader>
						</b-button>
					</b-form-group>
				</form>
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

	import fontawesome from '@fortawesome/vue-fontawesome';
	import { infoCircle } from '@fortawesome/fontawesome-free-solid';

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

	var usersForumAPI = 'https://forum.pc-rpg.com.br/api/users/';

	export default {
		data() {
            return {
				user: store.state.user,
				userLoggedIn: null,
				changed: {
					email: '',
					password: '',
					username: ''
				},
				oldpassword: '',
				emailChecking: false,
				passChecking: false,
				usernameChecking: false,
				loadingEmail: false,
				loadingPassword: false,
				loadingUsername: false,
				errorEmail: null,
				errorPassword: null,
				errorUsername: null,
            }
        },
		methods: {
			checkIfEmailExists: function () {
				console.log('opa');
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
			checkPassword: function() {
				this.passChecking = true;

				if(this.oldpassword.length >= 8) {
					axios.post(loginAPI, {
						username: this.user.username,
						password: this.oldpassword,
					})
					.then(function (response) {
						if(response.data.error) {
							this.error = response.data.error.message;
							console.log(response.data.error);
							this.loading = false;
							reject()
						} else {
							this.user.token = response.data.token;
							store.dispatch('setData', this.user).then(() => {
								this.loadingEmail = false;
							});
						}
					})
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
						"Authorization": "Token " + store.getters.getMasterToken + 'userId=1'
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
			'fa': fontawesome
		}
	}
</script>

<style lang="scss">
	@import '../../assets/sass/main.scss';
</style>