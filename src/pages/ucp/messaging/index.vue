<!--suppress ALL -->
<template>
	<b-container class="page__ucp--messaging">
		<b-row>
			<b-col md="3" sm="12" class="column column--left">
				<div class="messaging__block">
					<button class="btn btn-primary btn-block">Nova mensagem</button>
					<ul class="messasing__menu">
						<li class="menu__item" :class="{'menu__item--active': btnActivated == 1}" @click="getInbox">Caixa de entrada</li>
						<li class="menu__item" :class="{'menu__item--active': btnActivated == 2}"  @click="getOutbox">Caixa de saída</li>
						<li class="menu__item" :class="{'menu__item--active': btnActivated == 3}"  @click="getTrashbox">Lixeira</li>
					</ul>
				</div>
			</b-col>
			<b-col md="9" sm="12" class="column column--right">
                <loader  :loading="loading" color="#303846" size="60px"></loader>
				<messagingList :messages="messages" v-if="!loading"/>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import Vue from 'vue';
    import messagingList from '@/components/messaging/list'

    import loader from 'vue-spinner/src/MoonLoader.vue'
    
    import MessagingService from '@/services/messaging'
    import { store } from '@/vuex/store'

	export default {
        data() {
			return {
                user: store.state.user,
                messages: [ ],
                btnActivated: 1,

                loading: true
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
                    this.loading = false;
                })
                .catch(err => {
                    console.log(err);
                    this.loading = false;
                })
            },
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
