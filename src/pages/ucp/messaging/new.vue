<template>
	<div class="page__ucp--message-new">
		<b-form class="new_message" @submit.prevent="SendMessage">
			<div class="preview markdown" v-html="marked"></div>
			<div class="inputs">
				<b-form-group>
					<b-form-input 
						type="email" 
						v-model="title" 
						placeholder="Assunto da mensagem"
					/>
				</b-form-group>
				<b-form-group>
					<b-form-input 
						type="email"
						v-model="dest"
						required
						placeholder="Destinatário"
					/>
				</b-form-group>
				<b-form-group description="Você pode utilizar <a href='http://commonmark.org/help/' target='_blank'>Markdown</a> para formatar o seu texto">
					<textarea 
						placeholder="Escreva aqui"
						v-model="text"
					/>
				</b-form-group>
				<b-form-group>
					<b-button variant="secondary">Cancelar</b-button>
					<b-button variant="primary" class="submit">Enviar</b-button>
				</b-form-group>
			</div>
		</b-form>
	</div>
</template>

<script>
	import { store } from "@/vuex/store";
	import MessagingService from "@/services/messaging";
	import marked from "marked";

	export default {
	data() {
		return {
		user: store.state.user,
		text: "",
		title: "",
		dest: ""
		};
	},
	computed: {
		marked: function() {
		return marked(this.text, { sanitize: true });
		}
	},
	methods: {
		SendMessage: function() {
		let sender, receiver;

		MessagingService.sendMessage(sender, receiver, title, text)
			.then(res => {

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
	}
	};
</script>