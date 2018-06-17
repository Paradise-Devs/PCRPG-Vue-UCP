<template>
	<div class="page__ucp--message-new">
		<b-form class="new_message" @submit.prevent="SendMessage">
			<div class="preview markdown" v-html="marked"></div>
			<div class="inputs">
				<b-form-group>
					<b-form-input 
						type="text" 
						v-model="assunto" 
						v-validate="'min:8'"
						name="assunto"
						:class="{ 'is-invalid': errors.has('assunto') }"
						placeholder="Assunto da mensagem"
						:disabled="sendingMessage"
					/>
					<div class="invalid-feedback" v-show="errors.has('assunto')">{{ errors.first('assunto') }}</div>
				</b-form-group>
				<b-form-group>
					<b-form-input 
						type="text"
						v-model="dest"
						placeholder="Destinatário"
						:disabled="sendingMessage"
					/>
				</b-form-group>
				<b-form-group 
					description="Você pode utilizar <a href='http://commonmark.org/help/' target='_blank'>Markdown</a> para formatar o seu texto"
				>
					<textarea 
						placeholder="Escreva aqui"
						v-model="mensagem"
						v-validate="'min:10'"
						name="mensagem"
						:class="{ 'is-invalid': errors.has('mensagem') }"
						:disabled="sendingMessage"
					/>
					<div class="invalid-feedback" v-show="errors.has('mensagem')">{{ errors.first('mensagem') }}</div>
				</b-form-group>
				<b-form-group>
					<router-link to="/ucp/mensagens" class="router-link btn btn-secondary">Cancelar</router-link>
					<b-button variant="primary" type="submit" 
						:disabled="
							sendingMessage || errors.has('mensagem') || errors.has('assunto') ||
							mensagem.length === 0 || assunto.length === 0
						"
					>
						Enviar
						<moonloader :loading="sendingMessage" color="#303846" size="25px"></moonloader>
					</b-button>
				</b-form-group>
			</div>
		</b-form>
	</div>
</template>

<script>
	import { store } from "@/vuex/store";
	import MessagingService from "@/services/messaging";
	import marked from "marked";
	import moon from 'vue-spinner/src/MoonLoader.vue';

	export default {
		data() {
			return {
				user: store.state.user,
				mensagem: "",
				assunto: "",
				dest: "",
				sendingMessage: false,
			};
		},
		computed: {
			marked: function() {
				return marked(this.mensagem, { sanitize: true });
			}
		},
		methods: {
			SendMessage: function() {
				this.sendingMessage = true;

				MessagingService.sendMessage(this.user.username, this.dest, this.assunto, this.mensagem)
				.then(res => {
					this.sendingMessage = false;
				})
				.catch(error => {
					console.log(error);
				});
			}
		},
		mounted() {
			store.watch(
				state => {
					return store.getters.getUserData;
				},
				(oldValue, newValue) => {
					this.user = store.state.user;
				}
			);
		},
		components: {
			'moonloader': moon
		}
	};
</script>