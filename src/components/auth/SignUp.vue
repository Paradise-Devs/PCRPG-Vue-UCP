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
					v-model="data.attributes.username"
					ref="usernameField"
					placeholder="Nome de usuário"
					v-validate="{ required: true, regex: /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/ , min: 4, max: 15 }"
					name="username"
					:class="{ 'is-invalid': errors.has('username') || errorUsername, 'is-valid': !errors.has('username') && data.attributes.username.length != 0 }"
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
					v-model="data.attributes.email"
					placeholder="Email"
					v-validate="'required|email'"
					name="email"
					:class="{ 'is-invalid': errors.has('email') || errorEmail, 'is-valid': !errors.has('email') && data.attributes.email.length != 0 }"
					:state="null"
					@change="checkIfEmailExists"
					autocomplete="on"
					:disabled="emailChecking"
				/>
				<beatloader :loading="emailChecking" color="#303846" size="5px" class="input-spinner"></beatloader>
				<div class="invalid-feedback" v-show="errors.has('email')">{{ errors.first('email') }}</div>
			</b-form-group>
			<b-form-group :state="null" >
				<b-form-input
					type="password"
					v-model="data.attributes.password"
					placeholder="Senha"
					v-on:keyup.enter="submit"
					v-validate="{ required: true, min: 6 }"
					name="password"
					:class="{ 'is-invalid': errors.has('password'), 'is-valid': !errors.has('password') && data.attributes.password.length != 0 }"
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
								data.attributes.password.length === 0 ||data.attributes.email.length === 0 || data.attributes.username.length === 0"
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
	import { store } from '@/vuex/store'

	import signin from '@/components/auth/SignIn'
	import moon from 'vue-spinner/src/MoonLoader.vue';
	import beat from 'vue-spinner/src/BeatLoader.vue';

	var usersAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/players/';
	var registerAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/register/';
	var forumAPI = 'http://forum.pc-rpg.com.br/api/users/';

	export default {
		data() {
			return {
				data: {
					attributes: {
						username: '',
						password: '',
						email: '',
						token: null,
					}
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
			checkIfUserExists: function () {
				if(this.data.attributes.username.length >= 3) {
					var _this = this;
					_this.usernameChecking = true;

					axios.get(usersAPI + this.data.attributes.username)
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
				if(this.data.attributes.email.length >= 3) {
					var _this = this;
					_this.emailChecking = true;

					axios.get(usersAPI)
					.then(function (response) {
						for (var i = 0; i < response.data.length; i++) {
							if (response.data[i].email == _this.data.attributes.email) {
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
						username: this.data.attributes.username,
						password: this.data.attributes.password,
						email: this.data.attributes.email,
					})
					.then((data) => {
						_this.userdata.token = response.data.token;
						store.dispatch('login', this.data.attributes).then(() => {
							this.$router.push(this.$route.query.redirect || '/dev');
							this.loading = false;
							this.hideModal();
						})
					})
					.catch(function (error) {
						console.log(error);
					})

					/*axios.post(forumAPI, {
						data: {
							attributes: {
								username: this.data.attributes.username,
								password: this.data.attributes.password,
								email: this.data.attributes.email,
							}
						},
						headers: {
							'Authorization': 'Token jYtEGxXc66LzfnCHflISprQQRzZAU5ZODT63PAUx',
							'Content-Type': 'application/vnd.api+json'
						},
					})
					.then(function (response) {
						_this.$router.push(_this.$route.query.redirect || '/dev');
						_this.loading = false;
						_this.hideModal();

					})
					.catch(function (error) {
						console.log(error);
						_this.loading = false;
					})*/
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
