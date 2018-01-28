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
		<div class="modal-alert" v-if="errorUsername && !errorEmail" ref="errorAlert">
			<b-alert variant="danger" show>{{ errorUsername }}</b-alert>
		</div>
		<div class="modal-alert" v-if="errorEmail && !errorUsername" ref="errorAlert">
			<b-alert variant="danger" show>{{ errorEmail }}</b-alert>
		</div>
		<div class="modal-alert" v-if="errorEmail && errorUsername" ref="errorAlert">
			<b-alert variant="danger" show>Este usuário e este email já estão em uso.</b-alert>
		</div>
		<button class="modalclose" @click="hideModal"><fa :icon="['fas', 'times']" /></button>
		<form class="form-centered" v-on:submit.prevent="register()">
			<b-form-group :state="null" >
				<b-form-input
					type="text"
					v-model="signup.username"
					ref="usernameField"
					placeholder="Nome de usuário"
					v-validate="{ required: true, regex: /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/ , min: 4, max: 15 }"
					name="username"
					:class="{ 'is-invalid': errors.has('username') || errorUsername, 'is-valid': !errors.has('username') && signup.username.length != 0 }"
					:state="null"
					@change="checkIfUserExists"
					autocomplete="on"
					:disabled="usernameChecking"
				/>
				<beatloader :loading="usernameChecking" color="#303846" size="5px" class="input-spinner"></beatloader>
				<div class="invalid-feedback" v-show="errors.has('username')">{{ errors.first('username') }}</div>
			</b-form-group>
			<b-form-group :state="null" >
				<b-form-input
					type="email"
					v-model="signup.email"
					placeholder="Email"
					v-validate="'required|email'"
					name="email"
					:class="{ 'is-invalid': errors.has('email') || errorEmail, 'is-valid': !errors.has('email') && signup.email.length != 0 }"
					:state="null"
					@change="checkIfEmailExists"
					autocomplete="on"
				/>
				<beatloader :loading="emailChecking" color="#303846" size="5px" class="input-spinner"></beatloader>
				<div class="invalid-feedback" v-show="errors.has('email')">{{ errors.first('email') }}</div>
			</b-form-group>
			<b-form-group :state="null" >
				<b-form-input
					type="password"
					v-model="signup.password"
					placeholder="Senha"
					v-on:keyup.enter="submit"
					v-validate="{ required: true, min: 6 }"
					name="password"
					:class="{ 'is-invalid': errors.has('password'), 'is-valid': !errors.has('password') && signup.password.length != 0 }"
					:state="null"
					autocomplete="on"
				/>
				<div class="invalid-feedback" v-show="errors.has('password')">{{ errors.first('password') }}</div>
			</b-form-group>
			<b-form-group>
				<b-button
					type="submit"
					variant="primary"
					:disabled="	loading || errorUsername != null || errorUsername != null ||
								errors.has('password') || errors.has('email') || errors.has('username') ||
								signup.password.length === 0 ||signup.email.length === 0 || signup.username.length === 0"
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
	import fontawesome from '@fortawesome/vue-fontawesome';
	import times from '@fortawesome/fontawesome-free-solid';
	import axios from 'axios';

	import signin from '@/components/auth/SignIn'
	import moon from 'vue-spinner/src/MoonLoader.vue';
	import beat from 'vue-spinner/src/BeatLoader.vue';

	var usersAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/players/';
	var registerAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/register/';

	export default {
		data() {
			return {
				signup: {
					username: '',
					password: '',
					email: ''
				},
				errorUsername: null,
				errorEmail: null,
				loading: false,
				usernameChecking: false,
				emailChecking: false
			}
		},
		components: {
			'fa': fontawesome,
			'moonloader': moon,
			'beatloader': beat,
			signin
		},
		methods: {
			hideModal: function () {
				this.$refs.signup.hide()
			},
			modalShowed: function () {
				this.$refs.usernameField.focus();
			},
			checkIfUserExists: function () {
				if(this.signup.username.length >= 3) {
					var _this = this;
					_this.usernameChecking = true;

					axios.get(usersAPI + this.signup.username)
					.then(function (response) {
						if (response.data) {
							_this.errorUsername = 'Este nome de usuário já está em uso';
							_this.usernameChecking = false;
						} else {
							_this.errorUsername = null;
							_this.usernameChecking = false;
						}
					})
				} else {
					this.errorUsername = null;
				}
			},
			checkIfEmailExists: function () {
				if(this.signup.email.length >= 3) {
					var _this = this;
					_this.emailChecking = true;

					axios.get(usersAPI)
					.then(function (response) {
						for (var i = 0; i < response.data.length; i++) {
							if (response.data[i].email == _this.signup.email) {
								_this.errorEmail = 'Este e-mail já está em uso';
								_this.emailChecking = false;
							} else {
								_this.errorEmail = null;
								_this.emailChecking = false;
							}
						}
					})
				} else {
					this.errorEmail = null;
				}
			},
			register: function () {
				this.loading = true;

				this.checkIfUserExists();
				this.checkIfEmailExists();

				if(this.errorEmail === null && this.errorUsername === null) {
					var _this = this;

					axios.post(registerAPI, {
						username: this.signup.username,
						password: this.signup.password,
						email: this.signup.email,
					})
					.then(function (response) {
						_this.$router.push(_this.$route.query.redirect || '/dev');
						_this.loading = false;
						_this.hideModal();

					})
					.catch(function (error) {
						console.log(error);
						_this.loading = false;
					})
				}
			}
		}
	}
</script>

<style scoped>
	.v-spinner.registering {
		position: absolute;
		right: 10px;
		top: 5px;
		width: 30px;
	}

	.v-spinner.input-spinner {
		position: absolute;
		right: 15px;
		top: 15px;
		width: 30px;
		height: 10px;
	}
</style>
