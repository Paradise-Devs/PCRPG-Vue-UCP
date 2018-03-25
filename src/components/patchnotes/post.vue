<template>
    <div class="post">
        <a :href="'http://forum.pc-rpg.com.br/' + patch.id + '-' + patch.attributes.slug" class="post__content">
            <h3 class="post__content__title">{{ patch.attributes.title }}</h3>
			<ul class="post__content__info">
                <li class="post__created">
                    <span>
                        {{ patch.attributes.startTime | moment }}
                    </span>
                </li>
            </ul>
        </a>
        <span class="post__comments"><icon name="comment-o"/> {{ patch.attributes.commentsCount }}</span>
    </div>
</template>

<script>
	import moment from 'moment';

    import 'vue-awesome/icons/comment-o'

    export default {
        props:['patch'],
		filters: {
			moment: function(time) {
				return moment(time).fromNow();
			}
		}
    }
</script>

<style lang="scss">
    .post {
        padding-left: 20px;

        .post__comments {
            margin-right: -65px;

            .fa-icon {
                margin-left: -25px;
            }
        }
    }
</style>
