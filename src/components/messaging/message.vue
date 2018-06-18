<template>
    <div 
        class="message" 
        :class="{ 'message--unreaded': !msg.isRead, 'message--selected': msg.selected }"
        @dblclick="openMessage(msg)"
        :data-msgid="msg._id"
    >
        <div class="avatar">
            <img :src="sender.avatar">
        </div>
        <div class="content">
            <h5 class="title">{{ msg.subject }}</h5>
            <span class="info">Enviado por <b>{{ sender.username }}</b> {{ msg.sendDate | moment }} atrás.</span>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import ForumService from '@/services/forum'

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
                this.$router.push(this.$route.query.redirect || 'mensagens/ver/' + msg._id);
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