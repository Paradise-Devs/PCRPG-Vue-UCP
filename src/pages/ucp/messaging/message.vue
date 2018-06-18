<template>
    <b-container class="page__ucp--message-details">
        <loader :loading="loading" color="#303846" size="60px"></loader>
        <b-row v-if="!loading" class="message">
            <b-col md="12" sm="12" class="message__buttons">
                <router-link to="/ucp/mensagens" class="router-link btn btn-secondary">Voltar para as mensagens</router-link>
                <div class="right">
                    <b-btn-group>
                        <b-button variant="secondary" @click="confirmDelete()"><icon :icon="['fas', 'trash-alt']"/> Deletar</b-button>
                        <!-- <b-button variant="secondary"><icon :icon="['fas', 'exclamation-triangle']"/> Reportar</b-button> -->
                    </b-btn-group>
                    <router-link :to="'/ucp/mensagens/responder/' + message._id" class="router-link btn btn-primary">Responder</router-link>
                </div>
            </b-col>
            <b-col md="12" sm="12" class="message__block">
                <div class="message__header">
                    <div class="avatar">
                        <img src="https://forum.pc-rpg.com.br/assets/avatars/fd5jikfxjrpo4tx4.png">
                    </div>
                    <div class="details">
                        <h3 class="title">{{ message.subject }}</h3>
                        <span class="info">Enviado por <b>{{ message.sender.username }}</b> {{ message.sendDate | moment }} atrás.</span>
                    </div>
                </div>
                <div class="message__content">
                    Em resposta a sua mensagem anterior: 
                    <div class="oldmessage" v-if="quote">
                        <span class="title">{{ quote.subject }}</span>
                        <div class="markdown" v-html="oldMarked" />
                    </div>
                    <hr />
                    <div v-html="marked" class="message__content markdown" />
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import MessagingService from '@/services/messaging'
    import loader from 'vue-spinner/src/MoonLoader.vue'
    import moment from 'moment';
    import marked from 'marked';

    import { trashAlt, exclamationTriangle } from '@fortawesome/fontawesome-free-solid';

    export default {
        data() {
            return {
                message: [ ],
                quote: null,
                loading: true
            }
        },
        mounted() {
            MessagingService.getMessageData(this.$route.params.msgid)
            .then(response => {
                this.message = response.data;
                if(this.message.reply) {
                    MessagingService.getMessageData(this.message.reply)
                    .then(res => {
                        this.quote = res.data;
                    })
                }
                this.markAsRead(this.message._id);
            })
            .catch(error => {
                console.log(error);
                this.loading = false;
            })
        },
        computed: {
            marked: function() {
                return marked(this.message.body, { sanitize: true });
            },
            oldMarked: function() {
                return marked(this.quote.body, { sanitize: true });
            }
        },
        methods: {
            confirmDelete: function() {
                var r = confirm("Você tem certeza que deseja deletar esta mensagem? A mensagem será movida para a pasta lixeira.");
                if (r == true) {
                    var e = [ ];
                    e.push(this.message._id);
                    MessagingService.deleteMessage(e)
                    .then(res => {
                        this.$router.push(this.$route.query.redirect || '/ucp/mensagens');
                        console.log(res);
                    })
                    .catch(error => {
                        console.log(error.response);
                    })
                }
            },
            markAsRead: function(msgid) {
                MessagingService.markMessageAsRead(msgid)
                .then(res => {
                    this.loading = false;
                })
                .catch(error => {
                    console.log(error);
                })
            }
        },
        filters: {
			moment: function(time) {
				return moment(time).fromNow();
            }
		},
        components: {
            loader
        }
    }
</script>

<style lang="scss" scoped>
    .v-spinner {
        margin-top: 70px;
    }
</style>