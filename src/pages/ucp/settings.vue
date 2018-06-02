<!--suppress ALL -->
<template>
	<b-container class="ucp__config">
		<b-row>
			<b-card class="col-12 card--bordered">
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
							v-model="newEmail"
							placeholder="E-mail novo"
							v-validate="'email'"
							data-vv-scope="emailScope"
							name="email" 
							:class="{ 'is-invalid': errors.has('emailScope.email') || errorEmail, 'is-valid': !errors.has('emailScope.email') && newEmail.length != 0 && !errorEmail }"
							:state="null"
							autocomplete="off"
							@change="checkEmail()"
							:disabled="emailChecking"
						/>
						
						<beatloader :loading="emailChecking" color="#303846" size="5px" class="input-spinner"></beatloader>
						<div class="invalid-feedback">{{ errors.first('emailScope.email') }} <span v-if="errorEmail">{{ errorEmail }}</span></div>
					</b-form-group>
					<b-form-group>
						<b-button
							type="submit"
							:class="{'btn-success': emailChanged, 'btn-primary': !emailChanged }"
							:disabled="loadingEmail || errors.has('emailScope.email') || newEmail.length === 0 || emailChecking || errorEmail"
							block
						>
							<transition name="fade">
								<span v-if="emailChanged">E-mail alterado! <fa :icon="['fas', 'check-circle']" class="icon"/></span>
								<span v-else>Alterar e-mail</span>
							</transition>

							<moonloader :loading="loadingEmail" color="#303846" size="25px"></moonloader>
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
							v-model="oldPassword"
							placeholder="Senha atual"
							v-validate="'min:8'"
							name="oldPassword"
							data-vv-scope="passScope"
							:class="{ 'is-invalid': errors.has('passScope.oldPassword') || errorPassword, 'is-valid': !errors.has('passScope.oldPassword') && oldPassword.length != 0 && !errorPassword }"
							:state="null"
							@change="checkPassword()"
							autocomplete="on"
						/>
						<beatloader :loading="passChecking" color="#303846" size="5px" class="input-spinner"></beatloader>
						<div class="invalid-feedback">{{ errors.first('passScope.oldPassword') }} {{ errorPassword }}</div>
					</b-form-group>
					<b-form-group>
						<b-form-input 
							type="password"
							v-model="newPassword"
							placeholder="Nova senha"
							v-validate="'min:8|confirmed:confPassword'"
							name="newPassword"
							data-vv-scope="passScope"
							@change="checkPassword()"
							:class="{ 'is-invalid': errors.has('passScope.newPassword') || errorNewPassword, 'is-valid': !errors.has('passScope.newPassword') && newPassword.length != 0 && !errorNewPassword }"
							:state="null"
							autocomplete="on"
						/>
						<div class="invalid-feedback">{{ errors.first('passScope.newPassword') }}</div>
						<div class="invalid-feedback" v-if="errorNewPassword">{{ errorNewPassword }}</div>
					</b-form-group>
					<b-form-group>
						<b-form-input 
							type="password"
							placeholder="Confirmar nova senha"
							name="confPassword"
							v-model="confPassword"
							data-vv-scope="passScope"
							@change="checkPassword()"
							:class="{ 'is-invalid': errors.has('passScope.newPassword'), 'is-valid': !errors.has('passScope.newPassword') && confPassword.length != 0 }"
							:state="null"
							autocomplete="on"
						/>
					</b-form-group>
					<b-form-group>
						<b-button
							type="submit"
							:class="{'btn-success': passwordChanged, 'btn-primary': !passwordChanged }"
							:disabled="errors.has('passScope.oldPassword') || errors.has('passScope.newPassword') || errors.has('passScope.confPassword') ||
										newPassword.length === 0 || oldPassword.length === 0 ||
										passChecking || errorPassword || errorNewPassword || loadingPassword"
							block
						>
							<transition name="fade">
								<span v-if="passwordChanged">Senha alterada! <fa :icon="['fas', 'check-circle']" class="icon"/></span>
								<span v-else>Alterar senha</span>
							</transition>

							<moonloader :loading="loadingPassword" color="#303846" size="25px"></moonloader>
						</b-button>
					</b-form-group>
				</form>
			</b-col>
			<b-col md="3" sm="12" class="ucp__config__block">
				<h3 class="ucp__config__block__title">Alterar apelido</h3>
				<p class="ucp__config__block__text">Seu apelido é único e é como você gostaria de ser chamado fora do jogo, também é o seu login para autenticar-se. Lembre-se de respeitar a política de apelidos que encontra-se nas <a href="#" target="_blank">regras</a>.</p>
				<form class="form--small" v-on:submit.prevent="changeUsername()">
					<b-form-group label="Apelido atual:">
						<b-form-input type="text" :value="user.forumAtt.attributes.username" disabled></b-form-input>
					</b-form-group>
					<b-form-group>
						<b-form-input 
							type="text"
							placeholder="Novo apelido"
							name="username"
							v-model="newUsername"
							data-vv-scope="userScope"
							v-validate="{ regex: /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/ , min: 5, max: 15 }"
							:class="{ 'is-invalid': errors.has('userScope.username') || errorUsername, 'is-valid': !errors.has('userScope.username') && newUsername.length != 0 && !errorUsername }"
							:state="null"
							@change="checkUsername()"
							autocomplete="off"
							:disabled="usernameChecking"
						/>
						<beatloader :loading="usernameChecking" color="#303846" size="5px" class="input-spinner"></beatloader>
						<div class="invalid-feedback">{{ errors.first('userScope.username') }}</div>
						<div class="invalid-feedback" v-if="errorUsername">{{ errorUsername }}</div>
					</b-form-group>
					<b-form-group>
						<b-button
							type="submit"
							:class="{'btn-success': usernameChanged, 'btn-primary': !usernameChanged }"
							:disabled="loadingUsername || errors.has('userScope.username') || newUsername.length === 0 || errorUsername || usernameChecking"
							block
						>
							<transition name="fade">
								<span v-if="usernameChanged">Apelido alterado! <fa :icon="['fas', 'check-circle']" class="icon"/></span>
								<span v-else>Alterar apelido</span>
							</transition>
							
							<moonloader :loading="loadingUsername" color="#303846" size="25px"></moonloader>
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
	import { infoCircle, checkCircle } from '@fortawesome/fontawesome-free-solid';

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

				newEmail: '',
				oldPassword: '',
				newPassword: '',
				confPassword: '',
				newUsername: '',

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

				emailChanged: false,
				passwordChanged: false,
				usernameChanged: false,
            }
        },
		methods: {
			checkUsername: function () {
				if(this.fields.$userScope.username.changed && this.fields.$userScope.username.valid) {
					this.usernameChecking = true;

					if(this.user.username === this.newUsername.toLowerCase()) {
						this.errorUsername = 'O seu novo username precisa ser diferente do antigo.';
						this.usernameChecking = false;
					} else {
						axios.get(usersAPI)
						.then(response => {
							for (var i = 0; i < response.data.length; i++) {
								if (response.data[i].username == this.newUsername.toLowerCase()) {
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
				}
			},
			checkEmail: function () {
				if(this.fields.$emailScope.email.changed && this.fields.$emailScope.email.valid) {
					this.emailChecking = true;
					axios.get(usersAPI)
					.then(response => {
						for (var i = 0; i < response.data.length; i++) {
							if (response.data[i].email == this.newEmail) {
								this.errorEmail = 'Esse e-mail já está em uso';
								this.emailChecking = false;
								break;
							} else {
								this.errorEmail = false;
								this.emailChecking = false;
							}
						}
					})
				}
			},
			checkPassword: function() {
				if(this.fields.$passScope.oldPassword.changed && this.fields.$passScope.oldPassword.valid) {
					this.passChecking = true;
					var _t = this;

					axios.post(loginAPI, {
						username: this.user.username,
						password: this.oldPassword,
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

				if(this.oldPassword === this.newPassword) {
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
						email: this.newEmail,
					})
					.then(response => {
						this.user.token = response.data.token;
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
						password: this.newPassword,
					})
					.then(response => {
						this.user.token = response.data.token;
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
						username: this.newUsername,
					})
					.then(response => {
						this.user.username = this.newUsername.toLowerCase();
						this.user.token = response.data.token;
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
					sendData = { attributes: { email: this.newEmail } }
				} else if(data == "username") {
					sendData = { attributes: { username: this.newUsername } }
				} else if(data == "password") {
					sendData = { attributes: { password: this.newPassword } }
				}

				axios.patch(usersForumAPI + this.user.forumAtt.id, {
					data: sendData,
				}, {
					headers: { "Authorization": "Token " + store.getters.getMasterToken + 'userId=1' }
				})
				.then(response => {
					this.user.forumAtt = response.data.data;

					if(data == "email") {
						this.user.email = this.newEmail;
						this.emailChanged = true;
						this.newEmail = '';
					} else if(data == "username") {
						this.user.username = this.newUsername;
						this.user.forumAtt.attributes.username = this.newUsername;
						this.usernameChanged = true;
						this.newUsername = '';
					} else if(data == "password") {
						this.passwordChanged = true;
						this.oldPassword = '';
						this.newPassword = '';
						this.confPassword = '';
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
		computed: {
			isFormDirty() {
				return Object.keys(this.fields).some(key => this.fields[key].dirty);
			},
			isFormPristine() {
				return Object.keys(this.fields).every(key => this.fields[key].pristine);
			},
			isFormValid() {
				return Object.keys(this.fields).every(key => this.fields[key].valid);
			},
			isFormInvalid() {
				return Object.keys(this.fields).some(key => this.fields[key].invalid);
			},
			isFormTouched() {
				return Object.keys(this.fields).some(key => this.fields[key].touched);
			},
			isFormUntouched() {
				return Object.keys(this.fields).every(key => this.fields[key].untouched);
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
			},
			newEmail: function() {
				if(this.emailChanged && this.newEmail.length > 0) {
					this.emailChanged = false;
				}
			},
			oldPassword: function() {
				if(this.passwordChanged && this.oldPassword.length > 0) {
					this.passwordChanged = false;
				}
			},
			newPassword: function() {
				if(this.passwordChanged && this.newPassword.length > 0) {
					this.passwordChanged = false;
				}
			},
			confPassword: function() {
				if(this.passwordChanged && this.confPassword.length > 0) {
					this.passwordChanged = false;
				}
			},
			newUsername: function() {
				if(this.usernameChanged && this.newUsername.length > 0) {
					this.usernameChanged = false;
				}
			}
		},
		mounted() {
			if(this.user.token == null) {
				this.userLoggedIn = false;
			} else {
				this.userLoggedIn = true;
			}

			var timeSave = localStorage.getItem('firstTimeUCP');
			if(timeSave === "true") {
				this.$router.push(this.$route.query.redirect || '/ucp');
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