<!--suppress ALL -->
<template>
	<b-modal
			id="signupModal"
			ref="signup"
			title="Cadastre-se"
			@shown="focusLogin"
			hide-header-close
			hide-footer
	>
		<button class="modalclose" @click="hideModal"><fa :icon="['fas', 'times']" /></button>
		<form class="form-centered">
			<b-form-group>
				<b-form-input
						type="text"
						v-model="signup.username"
						ref="usernameField"
						required
						placeholder="Nome de usuário"
				/>
			</b-form-group>
			<b-form-group>
				<b-form-input
						type="email"
						v-model="signup.email"
						required
						placeholder="Email"
				/>
			</b-form-group>
			<b-form-group>
				<b-form-input
						type="text"
						v-model="signup.password"
						required
						placeholder="Senha"
				/>
			</b-form-group>
			<b-form-group>
				<b-button type="submit" variant="primary" block class="loginButton">
					<span class="btn-label">Cadastre-se</span>
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

	import signin from '@/components/auth/SignIn'

	export default {
		data() {
			return {
				signup: {
					username: '',
					password: '',
					email: ''
				}
			}
		},
		components: {
			'fa': fontawesome,
			signin
		},
		methods: {
			hideModal: function() {
				this.$refs.signup.hide()
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
