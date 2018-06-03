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
				<messagingList :messages="messages"/>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import Vue from 'vue';
	import messagingList from '@/components/messaging/list'

	export default {
        data() {
			return {
                messages: [
                    {
                        sender: 'Los',
                        receiver: 'Los',
                        sendDate: '2018-13-11',
                        subject: 'Cupidatat duis sunt consectetur fugiat voluptate esse nisi ut aliqua aute pariatur do excepteur ipsum.',
                        location: 'inbox',
                        isRead: false
                    },
                    {
                        sender: 'Los',
                        receiver: 'Los',
                        sendDate: '2018-13-11',
                        subject: 'Cupidatat duis sunt consectetur fugiat voluptate esse nisi ut aliqua aute pariatur do excepteur ipsum.',
                        location: 'inbox',
                        isRead: true
                    },
                    {
                        sender: 'Los',
                        receiver: 'Los',
                        sendDate: '2018-13-11',
                        subject: 'Cupidatat duis sunt consectetur fugiat voluptate esse nisi ut aliqua aute pariatur do excepteur ipsum.',
                        location: 'inbox',
                        isRead: true
                    },
                    {
                        sender: 'Los',
                        receiver: 'Los',
                        sendDate: '2018-13-11',
                        subject: 'Cupidatat duis sunt consectetur fugiat voluptate esse nisi ut aliqua aute pariatur do excepteur ipsum.',
                        location: 'inbox',
                        isRead: true
                    },
                    {
                        sender: 'Los',
                        receiver: 'Los',
                        sendDate: '2018-13-11',
                        subject: 'Cupidatat duis sunt consectetur fugiat voluptate esse nisi ut aliqua aute pariatur do excepteur ipsum.',
                        location: 'inbox',
                        isRead: true
                    },
                    {
                        sender: 'Los',
                        receiver: 'Los',
                        sendDate: '2018-13-11',
                        subject: 'Cupidatat duis sunt consectetur fugiat voluptate esse nisi ut aliqua aute pariatur do excepteur ipsum.',
                        location: 'inbox',
                        isRead: true
                    },
                    {
                        sender: 'Los',
                        receiver: 'Los',
                        sendDate: '2018-13-11',
                        subject: 'Cupidatat duis sunt consectetur fugiat voluptate esse nisi ut aliqua aute pariatur do excepteur ipsum.',
                        location: 'inbox',
                        isRead: true
                    },
                    {
                        sender: 'Los',
                        receiver: 'Los',
                        sendDate: '2018-13-11',
                        subject: 'Cupidatat duis sunt consectetur fugiat voluptate esse nisi ut aliqua aute pariatur do excepteur ipsum.',
                        location: 'inbox',
                        isRead: true
                    },
                    {
                        sender: 'Los',
                        receiver: 'Los',
                        sendDate: '2018-13-11',
                        subject: 'Cupidatat duis sunt consectetur fugiat voluptate esse nisi ut aliqua aute pariatur do excepteur ipsum.',
                        location: 'inbox',
                        isRead: true
                    },
                ],
                btnActivated: 1
            }
        },
        methods: {
            getInbox: function() {
                this.btnActivated = 1;
                this.messages = [
                    {
                        sender: 'Los',
                        receiver: 'Los',
                        sendDate: '2018-13-11',
                        subject: 'Cupidatat duis sunt consectetur fugiat voluptate esse nisi ut aliqua aute pariatur do excepteur ipsum.',
                        location: 'inbox',
                        isRead: true
                    },
                    {
                        sender: 'Los',
                        receiver: 'Los',
                        sendDate: '2018-13-11',
                        subject: 'Cupidatat duis sunt consectetur fugiat voluptate esse nisi ut aliqua aute pariatur do excepteur ipsum.',
                        location: 'inbox',
                        isRead: true
                    },
                ]
            },
            getOutbox: function() {
                this.btnActivated = 2;
                
                this.messages = [
                    {
                        sender: 'Los',
                        receiver: 'Los',
                        sendDate: '2018-13-11',
                        subject: 'Cupidatat duis sunt consectetur fugiat voluptate esse nisi ut aliqua aute pariatur do excepteur ipsum.',
                        location: 'inbox',
                        isRead: false
                    },
                    {
                        sender: 'Los',
                        receiver: 'Los',
                        sendDate: '2018-13-11',
                        subject: 'Cupidatat duis sunt consectetur fugiat voluptate esse nisi ut aliqua aute pariatur do excepteur ipsum.',
                        location: 'inbox',
                        isRead: true
                    },
                ]
            },
            getTrashbox: function() {
                this.btnActivated = 3;

                this.messages = []
            },
        },
        mounted() {
            this.messages = [
                {
                    sender: 'Los',
                    receiver: 'Los',
                    sendDate: '2018-13-11',
                    subject: 'Cupidatat duis sunt consectetur fugiat voluptate esse nisi ut aliqua aute pariatur do excepteur ipsum.',
                    location: 'inbox',
                    isRead: true
                },
                {
                    sender: 'Los',
                    receiver: 'Los',
                    sendDate: '2018-13-11',
                    subject: 'Cupidatat duis sunt consectetur fugiat voluptate esse nisi ut aliqua aute pariatur do excepteur ipsum.',
                    location: 'inbox',
                    isRead: true
                },
            ]
        },
		components: {
			messagingList
		}
	}
</script>