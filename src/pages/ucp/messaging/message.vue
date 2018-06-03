<template>
    <div class="message">
        <loader  :loading="loading" color="#303846" size="60px"></loader>
        <div class="message__details" v-if="!loading">
            <div class="message__header">
                <h3 class="message__subject">{{ message.subject }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
    import MessagingService from '@/services/messaging'
    import loader from 'vue-spinner/src/MoonLoader.vue'

    export default {
        data() {
            return {
                message: [ ],
                loading: true
            }
        },
        mounted() {
            MessagingService.getMessageData(this.$route.params.msgid)
            .then(response => {
                this.message = response.data;
                this.loading = false;
            })
            .catch(error => {
                console.log(error);
                this.loading = false;
            })
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