<template>
	<div class="page__ucp--message-new">
		<b-form class="new_message" @submit.prevent="SendMessage">
			<div class="preview markdown" v-html="marked"></div>
			<div class="inputs">
				<b-form-group>
					Destinatário: <router-link :to="'/jogador/' + dest" class="router-link"><b>{{ dest }}</b></router-link>
				</b-form-group>
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
				<b-form-group v-if="!this.$route.params.username">
					<vue-autosuggest 
						:suggestions="suggestions"
						:inputProps="sugProps"
						:sectionConfigs="sugSecConfigs"
						:renderSuggestion="sugRendering"
						:getSuggestionValue="sugValue"
						:class="{ 'is-invalid': errorUser }"
					/>
					<div class="invalid-feedback" v-show="errorUser">{{ errorUser }}</div>
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
							mensagem.length === 0 || assunto.length === 0 || errorUser
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
		render(h) { },
		data() {
			return {
				user: store.state.user,
				mensagem: "",
				assunto: "",
				dest: "",
				sendingMessage: false,
				errorUser: null,

				//auto suggest settings
				timeout: null,
      			debounceMilliseconds: 50,
				suggestions: [],
				sugProps: {
					id: "autocomp",
					onInputChange: this.getData,
					placeholder: "Destinatário",
					name: "destinatario",
					disabled: this.sendingMessage
				},
				sugSecConfigs: {
					users: {
						limit: 3,
						label: "Usuários",
						onSelected: selected => {
							this.errorUser = null;
							this.dest = selected.item.username;
						}
					},
					groups: {
						limit: 3,
						label: "Grupos",
						onSelected: selected => {
							this.selected = selected.item;
						}
					}
				},
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

				if(!this.$route.params.username) {
					if(this.dest.toLowerCase() === this.user.username.toLowerCase()) {
						this.errorUser = "Você não pode enviar mensagem para você mesmo."
						this.sendingMessage = false;
					} else {
						ServerService.getPlayerData(this.dest)
						.then(res => {
							if(res === null) {
								this.errorUser = "Usuário não existe."
								this.sendingMessage = false;
							} else {
								MessagingService.sendMessage(this.user.username, this.dest, this.assunto, this.mensagem)
								.then(res => {
									this.sendingMessage = false;
									this.$router.push(this.$route.query.redirect || '/ucp/mensagens');
									this.$notify({
										group: 'main',
										title: 'Mensagem enviada com sucesso!',
										text: 'Você deve receber uma notificação assim que sua mensagem for respondida.',
										type: 'success',
										duration: 5000
									});
								})
								.catch(error => {
									console.log(error);
								});
							}
						})
						.catch(err => {
							console.log(err);
						});
					}
				} else {
					MessagingService.sendMessage(this.user.username, this.dest, this.assunto, this.mensagem)
					.then(res => {
						this.sendingMessage = false;
						this.$router.push(this.$route.query.redirect || '/ucp/mensagens');
						this.$notify({
							group: 'main',
							title: 'Mensagem enviada com sucesso!',
							text: 'Você deve receber uma notificação assim que sua mensagem for respondida.',
							type: 'success',
							duration: 5000
						});
					})
					.catch(error => {
						console.log(error);
					});
				}
			},
			getData: function(val) {
				if(this.errorUser) { this.errorUser = null; }
				this.dest = val;

				clearTimeout(this.timeout);
      			this.timeout = setTimeout(() => {
					const usersPromise = ForumService.getAllUsers()
					.then(res => {
						this.suggestions = [];
						this.selected = null;

						let response = res.data.data;

						let userData = [];

						for(let i in response) {
							userData.push(response[i].attributes);
						}

						const users = this.filterResults(userData, val, "username");

						users.length &&
							this.suggestions.push({ name: "users", data: users });
					});
				}, this.debounceMilliseconds);
			},
			filterResults: function(data, text, field) {
				let e = data.filter(item => {
					if (item[field].toLowerCase().indexOf(text.toLowerCase()) > -1) {
						this.errorUser = null;
						return item[field];
					} else {
						this.errorUser = "Usuário não existe."
					}
				}).sort();

				return e;
			},
			sugRendering: function(suggestion) {
				if (suggestion.name == "users") {
					return suggestion.item.username;
				} else {
					return suggestion.item.namePlural;
				}
			},
			sugValue: function(suggestion) {
				let { name, item } = suggestion;
      			return name == "users" ? item.username : item.namePlural;
			}
		},
		render: function(h) {
			return (
				<div>
					<img class={{ avatar: true }} src={suggestion.item.avatarUrl} /> 
					{ suggestion.item.username} 
				</div>
			)
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
			if(this.$route.params.username) {
				ForumService.getUserData(this.$route.params.username)
				.then(res => {
					this.dest = res.data.data.attributes.username;
				})
			}

			console.log(this.dest);
		},
		components: {
			'moonloader': moon,
			VueAutosuggest
		}
	}
</script>