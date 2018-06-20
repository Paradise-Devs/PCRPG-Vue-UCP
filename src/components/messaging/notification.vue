<template>
    <div 
        class="dropdown-item notification__message" 
        @click="openMessage(msg)"
    >
        <div class="header">
            <div class="avatar">
                <img :src="sender.avatar">
            </div>
            <div class="content">
                <h5 class="title">{{ msg.subject }}</h5>
                <span class="info">Enviado por <b>{{ sender.username }}</b> {{ msg.sendDate | moment }} atrás.</span>
            </div>
        </div>
        <div class="body">
            <p class="text">{{ msg.body }}</p>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import ForumService from '@/services/forum'
import { setTimeout } from 'timers';

    export default {
        props: {
            msg: Object
        },
        data() {
            return {
                sender: {
                    avatar: null,
                    username: null
                }
            }
        },
        filters: {
			moment: function(time) {
				return moment(time).fromNow();
			}
		},
        methods: {
            openMessage: function(msg) {
                this.$router.push(this.$route.query.redirect || '/');
                let e = this;
                setTimeout(function() {
                    e.$router.push(e.$route.query.redirect || '/ucp/mensagens/ver/' + msg._id);
                });

                this.$root.$emit('refreshNotReadedMessages');
            },
        },
        mounted() {
            ForumService.getUserData(this.msg.sender.username)
            .then(user => {
                this.sender.username = user.data.data.attributes.username;
                this.sender.avatar = user.data.data.attributes.avatarUrl;
            })
        }
    }
</script>