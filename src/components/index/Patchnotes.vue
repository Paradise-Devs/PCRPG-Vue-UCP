<template>
    <div class="post">
        <a :href="'forum/d/' + patch.link" class="content">
            <h3>{{ patch.title }}</h3>
        </a>
        <span class="comments"><icon name="comment-o"/> 0</span>
    </div>
</template>

<script>
	import moment from 'moment';

    import 'vue-awesome/icons/comment-o'

    export default {
        props:['patch'],
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
	.patchnotes .post {
		padding-left: 20px;
	}

	.patchnotes .post .comments {
		margin-top: 14px;
	}
</style>
