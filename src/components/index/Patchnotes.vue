<template>
    <div class="post">
        <a :href="'forum/d/' + patch.id + '-' + patch.attributes.slug" class="content">
            <h3>{{ patch.attributes.title }}</h3>
			<ul class="info">
                <li class="created">
                    <span>
                        {{ patch.attributes.startTime | moment }}
                    </span>
                </li>
            </ul>
        </a>
        <span class="comments"><icon name="comment-o"/> {{ patch.attributes.commentsCount }}</span>
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

<style>
	.patchnotes .post {
		padding-left: 20px;
	}

	.patchnotes .post .comments {
		margin-right: -65px;
	}

	.patchnotes .post .comments .fa-icon {
		margin-left: -25px;
	}
</style>
