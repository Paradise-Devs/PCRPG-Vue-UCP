<template>
    <div class="user">
        <a :href="'http://forum.pc-rpg.com.br/u/' + user.username" class="user__avatar">
            <img :src="user.avatarUrl" v-if="user.avatarUrl != null">
            <div class="user__avatar--empty" v-else> ? </div>
        </a>
        <a :href="'http://forum.pc-rpg.com.br/u/' + user.username" class="user__content">
            <h3>{{ user.username }}</h3>
            <ul class="info">
                <li>
                    Visto pela última vez a {{ user.lastSeenTime | moment }}
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

<style lang="scss" scoped>
	.user {
        padding-left: 62px;
        padding-right: 80px;
        position: relative;
        color: #6c7d93;
		transition: background .2s;

        a {
            text-decoration: none;
        }

        &__avatar {
            text-decoration: none;
            float: left;
            margin-left: -50px;
            float: left;
            margin-top: 15px;
            position: relative;

            img {
                width: 36px;
                height: 36px;
                border-radius: 36px;
                font-size: 18px;
                line-height: 36px;
                display: inline-block;
                box-sizing: content-box;
                text-align: center;
                vertical-align: top;
                background-color: #1b2028;
                font-weight: normal;
                border-color: transparent;
            }

            &--empty {
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
        }

        &__content {
            margin-right: -65px;
            display: inline-block;
            width: 100%;
            padding: 12px 0;
            color: inherit;

            h3 {
                margin-right: 155px;
                font-size: 15px;
                line-height: 1.3;
                color: #6c7d93;
                font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
                margin: 0 0 3px;
            }

            .info {
                list-style-type: none;
                padding: 0;
                margin: 0;
                font-size: 12px;
                white-space: nowrap;

                li {
                    display: inline;
                    opacity: 0.7;
                    -webkit-transition: opacity .2s;
                    -o-transition: opacity .2s;
                    transition: opacity .2s;
                }
            }
        }

        &:hover {
            background: #171d23;

            .content {
                .created {
                    opacity: 1;
                }
            }
        }
    }
</style>