<template>
    <div class="post">
        <a :href="'forum/d/' + patch.link" class="content">
            <h3>{{ patch.title }}</h3>
			<ul class="info">
                <li class="created">
                    <span>
                        {{ patch.created | moment }}
                    </span>
                </li>
            </ul>
        </a>
        <span class="comments"><icon name="comment-o"/> 0</span>
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
</style>
