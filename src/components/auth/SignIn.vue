<!--suppress ALL -->
<template>
	<b-modal
			id="signinModal"
			ref="signin"
			title="Entrar"
			@shown="focusLogin"
			hide-header-close
			hide-footer
	>
		<div class="modal-alert" v-if="error" ref="errorAlert">
			<b-alert variant="danger" show>{{ error }}</b-alert>
		</div>

		<button class="modal-close" @click="hideModal"><fa :icon="['fas', 'times']" /></button>
		<form class="form-centered" v-on:submit.prevent="login()" @keyup="hideError()">
			<b-form-group>
				<b-form-input
					type="text"
					v-model="user.username"
					ref="usernameField"
					required
					:class="{ 'is-invalid': error }"
					placeholder="Nome de usuário ou Email"
					autocomplete="on"
				/>
			</b-form-group>
			<b-form-group>
				<b-form-input
					type="password"
					v-model="user.password"
					required
					:class="{ 'is-invalid': error }"
					placeholder="Senha"
					autocomplete="on"
				/>
			</b-form-group>
			<b-form-group>
				<b-button type="submit" variant="primary" :disabled="loading" block class="loginButton">
					Entrar <vue-spinner :loading="loading" color="#303846" size="30px"></vue-spinner>
				</b-button>
			</b-form-group>
		</form>
		<div class="modal-footer">
			<p><a href="#">Esqueceu sua senha?</a></p>
			<p>Não tem uma conta? <a href="#" v-b-modal.signupModal>Cadastre-se</a></p>
		</div>
	</b-modal>
</template>

<script>
	import fontawesome from '@fortawesome/vue-fontawesome';
	import times from '@fortawesome/fontawesome-free-solid';
	import axios from 'axios';
	import { store } from '@/vuex/store'

	import signup from '@/components/auth/SignUp'
	import spinner from 'vue-spinner/src/MoonLoader.vue';

	var loginAPI;

	if((location.hostname != "pc-rpg.com.br") && (location.hostname != "www.pc-rpg.com.br")) {
		loginAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/login/';
	} else {
		loginAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/login/';
	}

	var usersBaseURI = 'https://forum.pc-rpg.com.br/api/users/';

	export default {
		data() {
			return {
				context: 'login context',

				user: {
					username: '',
					password: '',
					token: null,
					forumAtt: [ ]
				},
				error: null,
				loading: false,
			}
		},
		components: {
			'fa': fontawesome,
			'vue-spinner': spinner,
			signup,
			store
		},
		methods: {
			hideModal: function() {
				this.$refs.signin.hide()
			},
			focusLogin: function() {
				this.$refs.usernameField.focus()
			},
			login: function() {
				this.loading = true;
				var _this = this;

				axios.post(loginAPI, {
					username: this.user.username,
					password: this.user.password,
				})
				.then(function (response) {
					if(response.data.error) {
						_this.error = response.data.error.message;
						_this.loading = false;
					} else {
						_this.user.token = response.data.token;
						_this.authUser();
					}
				})
			},
			hideError: function () {
				if(this.error) {
					this.error = null;
				}
			},
			authUser: function() {
				var _this = this;

				axios.get(usersBaseURI + this.user.username)
				.then(response => {
					this.user.forumAtt = response.data.data;
					this.dispatchLogin();
				})
				.catch(function (error) {
					console.log(error);
					_this.loading = false;
				})
			},
			dispatchLogin() {
				store.dispatch('login', this.user).then(() => {
					this.loading = false;
					this.hideModal();
				});
			}
		}
	}
</script>

<style scoped>
	.form-group.check {
		max-height: 19px;
	}

	.v-spinner {
		position: absolute;
		right: 10px;
		top: 5px;
		width: 30px;
	}
</style>
