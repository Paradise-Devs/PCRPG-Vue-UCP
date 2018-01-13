<template>
    <div class="post">
        <a :href="'forum/u/' + post.author" class="author">
            <img class="avatar" :src="post.avatar">
        </a>
        <a :href="'forum/d/' + post.link" class="content">
            <h3>{{ post.title }}</h3>
            <ul class="info">
                <li class="tags">
                    <span class="tag">
                        <span :style="post.tagcolor, post.tagbg" class="label">
                            <span class="tag-text">{{ post.tagtext }}</span>
                        </span>
                    </span>
                </li>
                <li class="created">
                    <span>
                        <span class="username">{{ post.author }}</span> iniciou {{ post.created | moment }}
                    </span>
                </li>
            </ul>
        </a>
        <span class="comments"><icon name="comment-o"/> {{ post.comments }}</span>
    </div>
</template>

<script>
	import moment from 'moment';

    import 'vue-awesome/icons/comment-o'

    export default {
        props:['post'],
		mounted() {
			/*axios.post('http://forum.pc-rpg.com.br/api/token', {
				identification: "Los",
				password: "784612"
			})
			.then(response => {
				console.log(response.data);
			})*/
		},
		filters: {
			moment: function(time) {
				return moment(time).fromNow();
			}
		}
    }
</script>

<style>

</style>
