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
						<b-form-input type="email" :value="user.forumAtt.attributes.email" name="oldEmail" disabled></b-form-input>
					</b-form-group>
					<b-form-group>
						<b-form-input 
							type="email"
							v-model="changed.email"
							placeholder="E-mail novo"
							v-validate="'email'"
							name="email"
							id="email"
							:class="{ 'is-invalid': errors.has('email') || errorEmail, 'is-valid': !errors.has('email') && changed.email.length != 0 && !errorEmail }"
							:state="null"
							@change="checkEmail()"
							@blur="checkEmail()"
							autocomplete="off"
							:disabled="emailChecking"
						/>
						
						<beatloader :loading="emailChecking" color="#303846" size="5px" class="input-spinner"></beatloader>
						<div class="invalid-feedback">{{ errors.first('email') }} {{ errorEmail }}</div>
					</b-form-group>
					<b-form-group>
						<b-button
							type="submit"
							variant="primary"
							:disabled="loadingEmail || errors.has('email') || changed.email.length === 0 || emailChecking || errorEmail"
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
							@change="checkPassword()"
							@blur="checkPassword()"
							:class="{ 'is-invalid': errors.has('oldPassword') || errorPassword, 'is-valid': !errors.has('oldPassword') && oldpassword.length != 0 && !errorPassword }"
							:state="null"
							autocomplete="on"
						/>
						<beatloader :loading="passChecking" color="#303846" size="5px" class="input-spinner"></beatloader>
						<div class="invalid-feedback">{{ errors.first('oldPassword') }} {{ errorPassword }}</div>
					</b-form-group>
					<b-form-group>
						<b-form-input 
							type="password"
							v-model="changed.password"
							placeholder="Nova senha"
							v-validate="'required|min:8|confirmed:confPassword'"
							name="newPassword"
							@change="checkPassword()"
							@blur="checkPassword()"
							:class="{ 'is-invalid': errors.has('newPassword') || errorNewPassword, 'is-valid': !errors.has('newPassword') && changed.password.length != 0 && !errorNewPassword }"
							:state="null"
							autocomplete="on"
						/>
						<div class="invalid-feedback">{{ errors.first('newPassword') }}</div>
						<div class="invalid-feedback" v-if="errorNewPassword">{{ errorNewPassword }}</div>
					</b-form-group>
					<b-form-group>
						<b-form-input 
							type="password"
							placeholder="Confirmar nova senha"
							name="confPassword"
							:class="{ 'is-invalid': errors.has('confPassword'), 'is-valid': !errors.has('confPassword') && changed.password.length != 0 }"
							:state="null"
							autocomplete="on"
						/>
						<div class="invalid-feedback" v-show="errors.has('confPassword')">{{ errors.first('confPassword') }}</div>
					</b-form-group>
					<b-form-group>
						<b-button
							type="submit"
							variant="primary"
							:disabled="errors.has('oldPassword') || errors.has('newPassword') || errors.has('confPassword') ||
										changed.password.length === 0 || oldpassword.length === 0 ||
										passChecking || errorPassword || errorNewPassword || loadingPassword"
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
				<form class="form--small" v-on:submit.prevent="changeUsername()">
					<b-form-group label="Usuário atual:">
						<b-form-input type="text" :value="user.forumAtt.attributes.username" disabled></b-form-input>
					</b-form-group>
					<b-form-group>
						<b-form-input 
							type="text"
							v-model="changed.username"
							placeholder="Usuário novo"
							v-validate="'required'"
							name="username"
							:class="{ 'is-invalid': errors.has('username') || errorUsername, 'is-valid': !errors.has('username') && changed.username.length != 0 && !errorUsername }"
							:state="null"
							@change="checkUsername()"
							@blur="checkUsername()"
							autocomplete="off"
							:disabled="usernameChecking"
						/>
						<beatloader :loading="usernameChecking" color="#303846" size="5px" class="input-spinner"></beatloader>
						<div class="invalid-feedback">{{ errors.first('username') }}</div>
						<div class="invalid-feedback" v-if="errorUsername">{{ errorUsername }}</div>
					</b-form-group>
					<b-form-group>
						<b-button
							type="submit"
							variant="primary"
							:disabled="loadingUsername || errors.has('username') || changed.username.length === 0 || errorUsername || usernameChecking"
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
				errorNewPassword: null,
				errorUsername: null,
            }
        },
		methods: {
			checkUsername: function () {
				this.usernameChecking = true;

				if(this.changed.username.length >= 3) {
					if(this.user.username === this.changed.username.toLowerCase()) {
						this.errorUsername = 'O seu novo username precisa ser diferente do antigo.';
						this.usernameChecking = false;
					} else {
						axios.get(usersAPI)
						.then(response => {
							for (var i = 0; i < response.data.length; i++) {
								if (response.data[i].username == this.changed.username.toLowerCase()) {
									this.errorUsername = 'Esse username já está em uso';
									this.usernameChecking = false;
									break;
								} else {
									this.errorUsername = false;
									this.usernameChecking = false;
								}
							}
						})
					}
				} else {
					this.errorUsername = false;
				}
			},
			checkEmail: function () {
				this.emailChecking = true;

				if(this.changed.email.length >= 3) {
					axios.get(usersAPI)
					.then(response => {
						for (var i = 0; i < response.data.length; i++) {
							if (response.data[i].email == this.changed.email) {
								this.errorEmail = 'Esse e-mail já está em uso';
								this.emailChecking = false;
								break;
							} else {
								this.errorEmail = false;
								this.emailChecking = false;
							}
						}
					})
				} else {
					this.errorEmail = false;
				}
			},
			checkPassword: function() {
				this.passChecking = true;
				var _t = this;

				if(this.oldpassword.length >= 8) {
					axios.post(loginAPI, {
						username: this.user.username,
						password: this.oldpassword,
					})
					.then(response => {
						if(response.data.error) {
							_t.errorPassword = response.data.error.message;
							_t.passChecking = false;
						} else {
							_t.user.token = response.data.token;
							store.dispatch('setData', _t.user).then(() => {
								_t.errorPassword = false;
								_t.passChecking = false;
							});
						}
					})
				} else {
					this.passChecking = false;
				}

				if(this.oldpassword === this.changed.password) {
					this.errorNewPassword = 'A senha nova precisa ser diferente da antiga.';
				} else {
					this.errorNewPassword = false;
				}
			},
			changeEmail: function () {
				this.loadingEmail = true;
				this.checkEmail();

				if(!this.errorEmail) {
					axios.patch(usersAPI + this.user.username, {
						masterkey: store.getters.getUpdateMasterToken,
						email: this.changed.email,
					})
					.then(response => {
						this.updateUserForumData("email");
					})
					.catch(error => {
						console.log(error);
						this.loadingEmail = false;
					})
				}
			},
			changePassword: function() {
				this.loadingPassword = true;
				this.checkPassword();

				if(!this.errorPassword && !this.errorNewPassword) {
					axios.patch(usersAPI + this.user.username, {
						masterkey: store.getters.getUpdateMasterToken,
						password: this.changed.password,
					})
					.then(response => {
						this.updateUserForumData("password");
					})
					.catch(error => {
						console.log(error);
						this.loadingPassword = false;
					})
				}
			},
			changeUsername: function() {
				this.loadingUsername = true;
				this.checkUsername();

				if(!this.errorUsername) {
					axios.patch(usersAPI + this.user.username, {
						masterkey: store.getters.getUpdateMasterToken,
						username: this.changed.username,
					})
					.then(response => {
						console.log(response);
						this.updateUserForumData("username");
					})
					.catch(error => {
						console.log(error);
						this.loadingUsername = false;
					})
				}
			},
			updateUserForumData: function(data) {
				var sendData = { };

				if(data == "email") {
					sendData = { attributes: { email: this.changed.email } }
				} else if(data == "username") {
					sendData = { attributes: { username: this.changed.username } }
				} else if(data == "password") {
					sendData = { attributes: { password: this.changed.password } }
				}

				axios.patch(usersForumAPI + this.user.forumAtt.id, {
					data: sendData,
				}, {
					headers: { "Authorization": "Token " + store.getters.getMasterToken + 'userId=1' }
				})
				.then(response => {
					this.user.forumAtt = response.data.data;

					if(data == "email") {
						this.user.email = this.changed.email;
					} else if(data == "username") {
						this.user.username = this.changed.username;
					}
					
					store.dispatch('setData', this.user).then(() => {
						this.loadingEmail = false;
						this.loadingPassword = false;
						this.loadingUsername = false;
					});
				})
				.catch(function (error) {
					console.log(error);
					this.loadingEmail = false;
					this.loadingPassword = false;
					this.loadingUsername = false;
				})
			},
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