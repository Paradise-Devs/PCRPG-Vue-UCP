<template>
    <div class="user">
        <userAvatar class="user__avatar" :url="user.avatarUrl" :username="user.username" size="36px" clickable/>
        <router-link :to="'/jogador/' + user.username" class="user__content">
            <h3 class="user__name">{{ user.username }}</h3>
            <ul class="user__info">
                <li>
                    Visto pela última vez {{ user.lastSeenTime | moment }}
                </li>
            </ul>
        </router-link>
    </div>
</template>

<script>
    import moment from 'moment';
    import userAvatar from '@/components/user-profile/avatar'

    export default {
        props:['user'],
		filters: {
			moment: function(time) {
				return moment(time).fromNow();
			}
        },
        components: {
            userAvatar
        }
    }
</script>