<template>
    <div>
        <b-row class="commit">
            <b-col cols="2" class="userinfo">
                <avatar-spinner :loading="avatarLoading" color="#303846" size="90px" class="avatar-loader"></avatar-spinner> 
                <img :src="useravatar" v-b-tooltip.hover title="w"  v-if="avatarProcessed"/>
                <ul>
                    <li class="devname">{{ commit.author_name }}</li>
                </ul>
            </b-col>
            <b-col cols="10" class="message">
                {{ commit.message }}
                <span class="date">{{ commit.created_at | moment }}</span>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    
    import BounceLoader from 'vue-spinner/src/BounceLoader.vue';

    var userFindAPI = 'https://gitlab.com/api/v4/projects/5181298/users?private_token=Uyazy3QPxKsf_qiVzmah&search=';

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

            axios.get(userFindAPI + this.commit.author_email)
            .then(response => {
                this.useravatar = response.data[0].avatar_url;
                this.avatarProcessed = true;
                this.avatarLoading = false;
            })
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

<style>
    .commit .userinfo .avatar-loader {
        width: 90px;
        height: 90px;
        vertical-align: top;
        border-radius: 100px;
        margin-top: -2px;
        display: inline-block;
        box-sizing: content-box;
        background-color: #1b2028;
    }

    .commit {
		margin: 30px 0px;
	}

	.commits .commit:not(:last-child) {
		margin-top: 30px;
	}

	.commits .stats {
		text-align: right;
	}
	
	.commits .commit .userinfo {
		text-align: center;
		position: relative;
	}

	.commits .commit .message {
		vertical-align: top;
		position: relative;
		background-color: #1B2028;
		padding: 10px 20px;
		border-radius: 5px;
		height: 90px;
	}

	.commits .commit .message .date {
		position: absolute;
		bottom: 10px;
		right: 20px;
		color: #303846;
	}

	.commits .commit .message:before{
		width: 0;
		height: 0;
		content:"";
		top: 0px;
		left: -25px;
		position: absolute;
		display: inline-block;
		border-top: 15px solid #1B2028;
		border-left: 15px solid transparent;
		border-right: 15px solid #1B2028;
		border-bottom: 15px solid transparent;
		content: " ";
	}

	.commits .commit .userinfo ul {
		list-style-type: none;
		margin: 0px;
		padding: 0px;
	}

	.commits .commit .userinfo ul li {
		margin: 0px;
		padding: 0px;
	}

	.commits .commit .userinfo ul li.commits {
		font-size: 12px;
		color: #303846;
	}

	.commits .commit img {
		max-width: 90px;
		border: 4px solid #1B2028;
		border-radius: 100px;
	}

	.commits span {
		font-family: Barlow;
		color: #6c7d93;
	}
</style>
