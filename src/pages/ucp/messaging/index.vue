<!--suppress ALL -->
<template>
	<b-container class="page__ucp--messaging">
		<b-row>
			<b-col md="3" sm="12" class="column column--left">
				<div class="messaging__block">
					<router-link to="mensagens/nova" class="router-link btn btn-primary btn-block" exact>Nova Mensagem</router-link>
					<ul class="messasing__menu">
						<li class="menu__item" :class="{'menu__item--active': btnActivated == 1}" @click="getInbox">Caixa de entrada</li>
						<li class="menu__item" :class="{'menu__item--active': btnActivated == 2}"  @click="getOutbox">Caixa de saída</li>
						<li class="menu__item" :class="{'menu__item--active': btnActivated == 3}"  @click="getTrashbox">Lixeira</li>
					</ul>
                    <b-card v-if="!isMobile">
                        <ul>
                            <li>Para ler uma mensagem, basta dar <b>2 cliques</b> na mensagem desejada.</li>
                            <li>Para deletar uma ou mais mensagens, basta dar <b>1 clique</b> na mensagem desejada e clicar em deletar</li>
                        </ul>
                    </b-card>
				</div>
			</b-col>
			<b-col md="9" sm="12" class="column column--right">
                <loader  :loading="loading" color="#303846" size="60px"></loader>
				<messagingList :messages="sortedInOutMessages" :clickable="messagesClickable" v-if="!loading && (btnActivated == 1 || btnActivated == 2)" />
                <messagingList :messages="sortedTrashMessages" :clickable="messagesClickable" v-if="!loading && btnActivated == 3" />
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import Vue from 'vue';
    import messagingList from '@/components/messaging/block'

    import loader from 'vue-spinner/src/MoonLoader.vue'
    
    import MessagingService from '@/services/messaging'
    import { store } from '@/vuex/store'

	export default {
        data() {
			return {
                user: store.state.user,
                messages: [ ],
                messagesClickable: true,
                btnActivated: 1,
                loading: true
            }
        },
        computed: {
            sortedInOutMessages: function() {
                return this.messages.sort((a, b) => new Date(b.sendDate).getTime() - new Date(a.sendDate).getTime());
            },
            sortedTrashMessages: function() {
                return this.messages.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            },
            isMobile: function() {
                if(window.innerWidth < 768) { return true; } 
                else { return false; }
            }
        },
        methods: {
            getInbox: function() {
                this.btnActivated = 1;

                this.loading = true;
                this.messages = []

                MessagingService.getMessagesTo(this.user.username)
                .then(res =>{
                    this.messages = res.data;
                    this.messagesClickable = true;
                    this.loading = false;
                })
                .catch(err => {
                    console.log(err);
                    this.loading = false;
                })
            },
            getOutbox: function() {
                this.btnActivated = 2;

                this.loading = true;
                this.messages = []
                
                MessagingService.getMessagesFrom(this.user.username)
                .then(res =>{
                    this.messages = res.data;
                    this.messagesClickable = true;
                    this.loading = false;
                })
                .catch(err => {
                    console.log(err);
                    this.loading = false;
                })
            },
            getTrashbox: function() {
                this.btnActivated = 3;

                this.loading = true;
                this.messages = []

                MessagingService.getDeletedMessages(this.user.username)
                .then(res =>{
                    this.messages = res.data;
                    this.messagesClickable = false;
                    this.loading = false;
                })
                .catch(err => {
                    console.log(err);
                    this.loading = false;
                })
            }
        },
        mounted() {
            MessagingService.getMessagesTo(this.user.username)
            .then(res =>{
                this.messages = res.data;
                this.loading = false;
            })
            .catch(err => {
                console.log(err);
                this.loading = false;
            })

            let e = this;
            this.$root.$on('reloadInbox', function() {
                e.getInbox();
            });
            
            var timeSave = localStorage.getItem('firstTimeUCP');
			if(timeSave === "true") {
				this.$router.push(this.$route.query.redirect || '/ucp');
			}
        },
		components: {
            messagingList,
            'loader': loader,
		}
	}
</script>

<style lang="scss" scoped>
    .v-spinner {
        margin-top: 70px;
    }
</style>
