<!--suppress ALL -->
<template>
	<b-modal
			id="signupModal"
			ref="signup"
			title="Cadastre-se"
			@shown="modalShowed"
			hide-header-close
			hide-footer
	>
		<div class="modal-alert" v-if="errorUsername" ref="errorAlert">
			<b-alert variant="danger" show>{{ errorUsername }}</b-alert>
		</div>
		<div class="modal-alert" v-if="errorEmail" ref="errorAlert">
			<b-alert variant="danger" show>{{ errorEmail }}</b-alert>
		</div>
		<div class="modal-alert" v-if="errorPassword" ref="errorAlert">
			<b-alert variant="danger" show>{{ errorPassword }}</b-alert>
		</div>
		<button class="modal-close" @click="hideModal"><fa-icon icon="times" /></button>
		<form class="form--auth" v-on:submit.prevent="register()">
			<b-form-group :state="null" >
				<b-form-input
					type="text"
					v-model="user.username"
					ref="usernameField"
					placeholder="Nome de usuário"
					v-validate="{ required: true, regex: /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/ , min: 5, max: 15 }"
					name="username"
					:class="{ 'is-invalid': errors.has('username') || errorUsername, 'is-valid': !errors.has('username') && user.username.length != 0 }"
					:state="null"
					autocomplete="on"
					@change="resetCheck"
					:disabled="loading"
				/>
				<div class="invalid-feedback" v-show="errors.has('username')">{{ errors.first('username') }}</div>
			</b-form-group>
			<b-form-group :state="null" >
				<b-form-input
					type="email"
					v-model="user.email"
					placeholder="Email"
					v-validate="{ required: true, email: '', min: 3}"
					name="email"
					:class="{ 'is-invalid': errors.has('email') || errorEmail, 'is-valid': !errors.has('email') && user.email.length != 0 }"
					:state="null"
					autocomplete="on"
					@change="resetCheck"
					:disabled="loading"
				/>
				<div class="invalid-feedback" v-show="errors.has('email')">{{ errors.first('email') }}</div>
			</b-form-group>
			<b-form-group :state="null" >
				<b-form-input
					type="password"
					v-model="user.password"
					placeholder="Senha"
					v-on:keyup.enter="submit"
					v-validate="{ required: true, min: 8 }"
					name="password"
					:class="{ 'is-invalid': errors.has('password'), 'is-valid': !errors.has('password') && user.password.length != 0 }"
					:state="null"
					autocomplete="on"
					@change="resetCheck"
					:disabled="loading"
				/>
				<div class="invalid-feedback" v-show="errors.has('password')">{{ errors.first('password') }}</div>
			</b-form-group>
			<b-form-group>
				<b-button
					type="submit"
					variant="primary"
					:disabled="loading || errors.has('password') || errors.has('email') || errors.has('username') ||
											user.password.length === 0 ||user.email.length === 0 || user.username.length === 0"
					block
					class="loginButton"
				>
					Cadastre-se <moonloader :loading="loading" color="#303846" size="30px" class="registering"></moonloader>
				</b-button>
			</b-form-group>
		</form>
		<div class="modal-footer">
			<p>Já tem uma conta? <a href="#" v-b-modal.signinModal>Entre</a></p>
		</div>
	</b-modal>
</template>

<script>
	import ServerService from '@/services/server';
	import ForumService from '@/services/forum';
	import { store } from '@/vuex/store'

	import signin from '@/components/auth/SignIn'
	import moon from 'vue-spinner/src/MoonLoader.vue';

	export default {
		data() {
			return {
				user: {
					username: '',
					password: '',
					email: '',
					token: null,
					forumAtt: [ ]
				},
				errorUsername: null,
				errorEmail: null,
				errorPassword: null,
				loading: false,
				usernameChecking: false,
				emailChecking: false
			}
		},
		components: {
			'moonloader': moon,
			signin,
			store
		},
		methods: {
			hideModal: function () {
				this.$refs.signup.hide()
			},
			modalShowed: function () {
				this.$refs.usernameField.focus();
			},
			register: function () {
				this.loading = true;
				let self = this;

				let localUsername = this.user.username;
				let localPassword = this.user.password;
				let localEmail = this.user.email;

				ServerService.registerPlayer(localUsername, localPassword, localEmail)
				.then(response => {						
					self.registerUserForumAccount(localUsername, localPassword, localEmail);
				})
				.catch(function (error) {
					switch(error.response.data.extra) {
						case 'username':
							self.resetCheck();
							self.errorUsername = error.response.data.message;
							break;
						case 'email':
							self.resetCheck();
							self.errorEmail = error.response.data.message;
							break;
						case 'password':
							self.resetCheck();
							self.errorPassword = error.response.data.message;
							break;
					}

					self.loading = false;
				})
			},
			resetCheck: function() {
				this.errorUsername = '';
				this.errorEmail = '';
				this.errorPassword = '';
			},
			registerUserForumAccount: function(usernameEx, passwordEx, emailEx) {
				var _this = this;
				var sendData = { attributes: { username: usernameEx, password: passwordEx, email: emailEx, isActivated: true } };

				ForumService.registerUser(sendData)
				.then(response => {
					_this.user.forumAtt = response.data.data;
					_this.login(usernameEx, passwordEx);
				})
				.catch(error => {
					console.log(error);
					_this.loading = false;
				})
			},
			login: function(usernameEx, passwordEx) {
				this.loading = true;
				var _this = this;

				ServerService.loginPlayer(usernameEx, passwordEx)
				.then(response => {
					_this.user.token = response.data.token;
					_this.saveUserData(usernameEx, passwordEx);
				})
				.catch(error => { 
					_this.error = error.response.data;
					_this.loading = false;
				})
			},
			saveUserData: function(usernameEx, passwordEx) {
				let _this = this;
				
				ForumService.getUserToken(usernameEx, passwordEx)
				.then(response => {
					_this.user.forumToken = response.data.token;
					
					store.dispatch('login', this.user).then(() => {
						_this.loading = false;
						localStorage.setItem('firstTimeUCP', 'true');
						this.$router.push(this.$route.query.redirect || '/ucp');
						_this.hideModal();
					});
				})
				.catch(function (error) {
					console.log(error);
					_this.loading = false;
				})
			}
		},
		mounted() {
			if(window.location.href.indexOf('signup') > -1) {
				this.$refs.signup.show();
			}
		}
	}
</script>