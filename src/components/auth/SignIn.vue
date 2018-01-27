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
		<button class="modalclose" @click="hideModal"><fa :icon="['fas', 'times']" /></button>
		<form class="form-centered">
			<b-form-group>
				<b-form-input
						type="text"
						v-model="login.username"
						ref="usernameField"
						required
						placeholder="Nome de usuário ou Email"
				/>
			</b-form-group>
			<b-form-group>
				<b-form-input
						type="text"
						v-model="login.password"
						required
						placeholder="Senha"
				/>
			</b-form-group>
			<b-form-group class="check">
				<label class="checkbox">
					<input type="checkbox" v-model="login.rememberme">Remember Me
				</label>
			</b-form-group>
			<b-form-group>
				<b-button type="submit" variant="primary" block class="loginButton">
					<span class="btn-label">Entrar</span>
				</b-button>
			</b-form-group>
		</form>
		<div class="modal-footer">
			<p><a href="#">Esqueceu sua senha?</a></p>
			<p>Não tem uma conta? <a href="#">Cadastre-se</a></p>
		</div>
	</b-modal>
</template>

<script>
	import fontawesome from '@fortawesome/vue-fontawesome';
	import times from '@fortawesome/fontawesome-free-solid';

	export default {
		data() {
			return {
				login: {
					username: '',
					password: '',
					rememberme: false,
				}
			}
		},
		components: {
			'fa': fontawesome
		},
		methods: {
			hideModal: function() {
				this.$refs.signin.hide()
			},
			focusLogin: function() {
				this.$refs.usernameField.focus()
			}
		}
	}
</script>

<style scoped>
	.form-group.check {
		max-height: 19px;
	}
</style>
