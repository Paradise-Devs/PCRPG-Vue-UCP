<template>
	<div class="page__ucp--message-new">
		<b-form class="new_message" @submit.prevent="SendMessage">
            <div class="oldmessage">
                <span class="message__info">{{ originalPoster }} escreveu:</span>
                <span class="title">{{ originalTitle }}</span>
                <div class="markdown" v-html="oldMarked" />
            </div>
			<div class="preview markdown" v-html="marked"></div>
			<div class="inputs">
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
							sendingMessage || errors.has('mensagem') || mensagem.length === 0
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
	import Vue from 'vue';
	import { store } from "@/vuex/store";
	import MessagingService from "@/services/messaging";
	import ForumService from '@/services/forum';
	import ServerService from '@/services/server';
	import marked from "marked";
	import moon from 'vue-spinner/src/MoonLoader.vue';
	import { VueAutosuggest } from "vue-autosuggest";

	export default {
		data() {
			return {
				user: store.state.user,
                mensagem: "",
                sendingMessage: false,
                originalMessage: "",
                originalPoster: "",
                originalTitle: "",
			};
        },
		computed: {
			marked: function() {
				return marked(this.mensagem, { sanitize: true });
            },
            oldMarked: function() {
				return marked(this.originalMessage, { sanitize: true });
			}
		},
		methods: {
			SendMessage: function() {
				this.sendingMessage = true;

				let title = this.originalTitle.replace('Re: ', '');

                MessagingService.replyMessage(this.user.username, this.originalPoster, 'Re: ' + title, this.mensagem, this.$route.params.msgid)
                .then(res => {
                    this.sendingMessage = false;
                    this.$router.push(this.$route.query.redirect || '/ucp/mensagens/ver/' + res.data.message);
                    this.$notify({
                        group: 'main',
                        title: 'Mensagem respondida com sucesso!',
                        text: 'Você deve receber uma notificação assim que sua mensagem for respondida.',
                        type: 'success',
                        duration: 5000
                    });
                })
                .catch(error => {
                    console.log(error);
                });
			},
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
            
            MessagingService.getMessageData(this.$route.params.msgid)
            .then(res => {
                this.originalPoster = res.data.sender.username;
                this.originalTitle = res.data.subject;
                this.originalMessage = res.data.body;
            })
		},
		components: {
			'moonloader': moon,
			VueAutosuggest
		}
	}
</script>