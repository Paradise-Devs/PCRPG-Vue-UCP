<template>
    <div class="commit">
        <b-row>
            <b-col cols="2" class="commit__user">
                <avatar-spinner :loading="avatarLoading" color="#303846" size="90px" class="avatar__loader"></avatar-spinner> 
                <img class="commit__user__avatar" :src="useravatar" v-if="avatarProcessed"/>
                <span class="commit__user__name">{{ commit.author_name }}</span>
            </b-col>
            <b-col sm="12" md="10" class="commit__message">
                {{ commit.message }}
                <span class="commit__message__date">{{ commit.created_at | moment }} atrás</span>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    
    import BounceLoader from 'vue-spinner/src/BounceLoader.vue';

    var userFindAPI = 'https://gitlab.com/api/v4/projects/6159796/users?private_token=Uyazy3QPxKsf_qiVzmah&search=';

    export default {
        props: {
            commit: Object
        },
		data() {
			return {
                useravatar: null,
                avatarLoading: false,
                avatarProcessed: false,
			}
        },
		mounted() {
            this.avatarLoading = true;
            this.avatarProcessed = false;

            setTimeout(() => {
                axios.get(userFindAPI + this.commit.author_email)
                .then(response => {
                    this.useravatar = response.data[0].avatar_url;
                    this.avatarProcessed = true;
                    this.avatarLoading = false;
                })
                .catch(error => {
                    //ignorar os erros de sincronização
                })
            }, 4000);
        },
        filters: {
			moment: function(time) {
				return moment(time).fromNow();
			}
		},
        components: {
            'avatar-spinner': BounceLoader
        }
    }
</script>
