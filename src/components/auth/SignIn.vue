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
		<form class="form--auth" v-on:submit.prevent="login()" @keyup="hideError()">
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
	import ServerService from '@/services/server';
	import ForumService from '@/services/forum';
	import { store } from '@/vuex/store'

	import signup from '@/components/auth/SignUp'
	import spinner from 'vue-spinner/src/MoonLoader.vue';

	export default {
		data() {
			return {
				context: 'login context',

				user: {
					username: '',
					password: '',
					token: null,
					forumAtt: [ ],
					groups: [ ]
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
				this.$refs.signin.hide();
			},
			focusLogin: function() {
				this.$refs.usernameField.focus()
			},
			login: function() {
				this.loading = true;
				var _this = this;

				ServerService.loginPlayer(this.user.username, this.user.password)
				.then(function (response) {
					_this.user.token = response.data.token;
					_this.authUser();
				})
				.catch(error => {
					_this.error = error.response.data.error.message;
					_this.loading = false;
				})
			},
			hideError: function () {
				if(this.error) {
					this.error = null;
				}
			},
			authUser: function() {
				var _this = this;

				ForumService.getUserData(this.user.username)
				.then(response => {
					this.user.forumAtt = response.data.data;

					for(var i in response.data.included) {
						if(response.data.included[i].type == "groups") {
							this.user.groups.push(response.data.included[i].attributes);
						}
					}
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
					var timeSave = localStorage.getItem('firstTimeUCP');
					if(timeSave == null) {
						localStorage.setItem('firstTimeUCP', 'true');
						this.$router.push(this.$route.query.redirect || '/ucp');
					} else {
						if(timeSave) {
							this.$router.push(this.$route.query.redirect || '/ucp');
						}
					}
				});
			}
		}
	}
</script>

<style scoped>
	.form-group.check {
		max-height: 19px;
	}
</style>
