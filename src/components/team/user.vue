<template>
    <div class="user">
        <a :href="'https://forum.pc-rpg.com.br/u/' + user.username" class="user__avatar">
            <img class="user__avatar__img" :src="user.avatarUrl" v-if="user.avatarUrl != null">
            <div class="user__avatar--empty" v-else> ? </div>
        </a>
        <a :href="'https://forum.pc-rpg.com.br/u/' + user.username" class="user__content">
            <h3 class="user__name">{{ user.username }}</h3>
            <ul class="user__info">
                <li>
                    Visto pela última vez há {{ user.lastSeenTime | moment }}
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