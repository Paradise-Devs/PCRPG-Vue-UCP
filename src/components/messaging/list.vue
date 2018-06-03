<template>
    <div>
        <div class="messaging__list">
            <div v-if="messages.length > 0">
                <paginate name="messages" :list="messages" :per="5" class="list">
                    <li 
                        class="message" 
                        :class="{ 'message--unreaded': !msg.isRead, 'message--selected': msg.selected }" 
                        v-for="(msg, index) in paginated('messages')" 
                        :key="index" 
                        @click="$set(msg, 'selected', !msg.selected)"
                        @dblclick="openMessage(msg)"
                    >
                        <div class="avatar">
                            <img src="https://forum.pc-rpg.com.br/assets/avatars/fd5jikfxjrpo4tx4.png">
                        </div>
                        <div class="content">
                            <h5 class="title">{{ msg.subject }}</h5>
                            <span class="info">Enviado por <b>{{ msg.sender }}</b> {{ msg.sendDate | moment }} atrás.</span>
                        </div>
                    </li>
                </paginate>
                <paginate-links
                    for="messages"
                    :show-step-links="true"
                    :hide-single-page="true"
                >
                </paginate-links>
            </div>
            <div class="empty" v-else>
                <h3>Nenhuma mensagem encontrada</h3>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        props: {
            messages: Array
        },
        data() {
			return {
                selected: [],
                paginate: ['messages'],
                msgDetails: null
			}
        },
        computed: {
            readingMessage: function() {
                return this.msgDetails != null ? true : false;
            }
        },
        filters: {
			moment: function(time) {
				return moment(time).fromNow();
			}
		},
        methods: {
            openMessage: function(msg) {
                this.msgDetails = msg;
                this.$router.push(this.$route.query.redirect || 'mensagens/msg/' + msg._id);
            }
        },
        mounted() {
            this.$root.$on('hideReadingMessage', function() {
                this.msgDetails = null;
            });
        }
    }
</script>
