<template>
    <div class="block patchnotes">
        <div class="block__header">
            <h3>Últimas atualizações</h3>
        </div>
        <div class="block__content">
            <vue-spinner :loading="patches.loading" color="#303846" size="10px" class="loader"></vue-spinner>
            <div v-if="patches.processed">
                <post
                    v-for="post in patches.posts.slice(0, 4)"
                    :key="post.id"
                    :patch='post'
                />
                <p v-if="patches.posts.length == 0">Ainda não lançamos nenhuma atualização. Por que não acompanha o <router-link to="/dev">desenvolvimento</router-link>?</p>
            </div>
        </div>
        <div class="block__footer" v-if="patches.posts.length > 4">
            <a href="https://forum.pc-rpg.com.br/t/patchnotes" class="btn btn-primary btn-block">Ver todas...</a>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
	import ForumService from '@/services/forum';
    import moment from 'moment';
    import fontawesome from '@fortawesome/vue-fontawesome'
	import comments from '@fortawesome/fontawesome-free-regular';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import post from './post.vue'

    export default {
		data() {
			return {
				patches: {
					loading: false,
                    processed: false,
                    posts: [ ]
				}
			}
        },
        mounted() {
			this.patches.processed = false;
            this.patches.loading = true;

            ForumService.getPatchnotes()
			.then(response => {
				this.patches.posts = response.data.data;
				this.patches.processed = true;
                this.patches.loading = false;
                console.log(this.patches.posts);
            })
            .catch(error => {
                console.log(error);
            });
        },
        components: {
			'vue-spinner': PulseLoader,
            'fa': fontawesome,
            post
		}
    }
</script>

<style lang="scss" scoped>
    .patchnotes {
		p {
			padding: 10px;
			text-align: center;
			margin: 0px;
		}
	}
</style>
