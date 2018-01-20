<template>
    <div class="post">
        <a :href="'http://forum.pc-rpg.com.br/u/' + user.username" class="author">
            <img class="avatar" :src="user.avatarUrl" v-if="user.avatarUrl != null">
            <div class="noAvatar" v-else> ? </div>
        </a>
        <a :href="'http://forum.pc-rpg.com.br/u/' + user.username" class="content">
            <h3>{{ user.username }}</h3>
            <ul class="info">
                <li class="created">
                    Visto pela última vez a {{ user.lastSeenTime | moment }}</span>
                </li>
            </ul>
        </a>
    </div>
</template>

<script>
	import moment from 'moment';

    export default {
        props:['user'],
		filters: {
			moment: function(time) {
				return moment(time).fromNow();
			}
		}
    }
</script>

<style scoped>
    .post {
        padding-right: 0px;
    }
	.post .content {
        margin-right: 0px;
    }

    .noAvatar {
        width: 36px;
        height: 36px;
        border-radius: 36px;
        font-size: 18px;
        line-height: 36px;
        display: inline-block;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        text-align: center;
        vertical-align: top;
        background-color: #1b2028;
        font-weight: normal;
        border-color: transparent;
        color: #6c7d93;
        font-size: 22px;
    }
</style>
