<template>
    <b-container class="page__ucp--message-details">
        <loader :loading="loading" color="#303846" size="60px"></loader>
        <b-row v-if="!loading" class="message">
            <b-col md="12" sm="12" class="message__buttons">
                <router-link to="/ucp/mensagens" class="router-link btn btn-secondary btn-back"><span v-if="!isMobile">Voltar para as mensagens</span><span v-else><icon :icon="['fas', 'angle-left']"/></span></router-link>
                <div class="right">
                    <b-btn-group>
                        <b-button variant="secondary" @click="confirmDelete()"><icon :icon="['fas', 'trash-alt']"/><span v-if="!isMobile"> Deletar</span></b-button>
                        <!-- <b-button variant="secondary"><icon :icon="['fas', 'exclamation-triangle']"/> Reportar</b-button> -->
                    </b-btn-group>
                    <router-link :to="'/ucp/mensagens/responder/' + message._id" class="router-link btn btn-primary">Responder</router-link>
                </div>
            </b-col>
            <b-col md="12" sm="12" class="message__block">
                <div class="message__header">
                    <div class="avatar">
                        <img :src="userAvatar">
                    </div>
                    <div class="details">
                        <h3 class="title">{{ message.subject }}</h3>
                        <span class="info">Enviado por <b>{{ userName }}</b> {{ message.sendDate | moment }} atrás.</span>
                    </div>
                </div>
                <div class="message__content">
                    <div class="oldmessage" v-if="quote">
                        <span v-if="quote.sender.username == user.username">Em resposta a sua mensagem anterior:</span>
                        <span v-else>Em resposta a mensagem de {{ quote.sender.username }}:</span>
                        <div class="quote">
                            <span class="title">{{ quote.subject }}</span>
                            <div class="markdown" v-html="oldMarked" />
                        </div>
                    </div>
                    <hr class="oldmessage__separator"/>
                    <div v-html="marked" class="current__message markdown" />
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import { store } from '@/vuex/store';

    import MessagingService from '@/services/messaging'
    import ForumService from '@/services/forum'
    import loader from 'vue-spinner/src/MoonLoader.vue'
    import moment from 'moment';
    import marked from 'marked';

    import { trashAlt, exclamationTriangle, angleLeft } from '@fortawesome/fontawesome-free-solid';

    export default {
        data() {
            return {
                user: store.state.user,
                userAvatar: null,
                userName: null,
                message: [ ],
                quote: null,
                loading: true
            }
        },
        mounted() {
            var timeSave = localStorage.getItem('firstTimeUCP');
			if(timeSave === "true") {
				this.$router.push(this.$route.query.redirect || '/ucp');
            }

            let messagesDropdown = document.getElementsByClassName('show');
            for(let i = 0; i < messagesDropdown.length; i++) {
                messagesDropdown[i].classList.remove('show');
            }
            
            MessagingService.getMessageData(this.$route.params.msgid)
            .then(response => {
                this.message = response.data;

                ForumService.getUserData(this.message.sender.username)
                .then(user => {
                    this.userAvatar = user.data.data.attributes.avatarUrl;
                    this.userName = user.data.data.attributes.username;
                })
                
                if(this.message.reply) {
                    MessagingService.getMessageData(this.message.reply)
                    .then(res => {
                        this.quote = res.data;
                    })
                }

                if(this.message.receiver.username == this.user.username) {
                    this.markAsRead(this.message._id);
                } else {
                    this.loading = false;
                    this.$root.$emit('refreshNotReadedMessages');
                }
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
            },
            isMobile: function() {
                if(window.innerWidth < 768) { return true; } 
                else { return false; }
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
                    this.$root.$emit('refreshNotReadedMessages');
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