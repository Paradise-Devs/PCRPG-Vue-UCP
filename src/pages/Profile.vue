<!--suppress ALL -->
<template>
    <div class="page__user-profile">
        <loader :loading="userLoading" color="#303846" size="60px"></loader>
        
        <div v-if="!userLoading">
            <playerProfile :user="user" v-if="userFound" />
        </div>
    </div>
</template>

<script>
	import Vue from 'vue';
	import playerProfile from '@/components/user-profile/block'
	import ForumService from '@/services/forum';
    import ServerService from '@/services/server';
    import loader from 'vue-spinner/src/MoonLoader.vue'

	export default {
		data() {
            return {
				user: [ ],
                userLoading: true,
                userFound: false,
            }
        },
		mounted() {
            let username = this.$route.params.username;
			
			ServerService.getPlayerData(username)
			.then(res => {
				if(res === null) {
                    this.userLoading = false;
                    this.userFound = true;
				} else {
                    this.user = res.data;
                    this.user.forumAtt = { };
                    this.user.groups = { };
                    this.userFound = true;

                    ForumService.getUserData(username)
                    .then(response => {
                        this.user.forumAtt = response.data.data;
                        let groups = [];

                        for(var i in response.data.included) {
                            if(response.data.included[i].type == "groups") {
                                groups.push(response.data.included[i].attributes);
                            }
                        }

                        this.user.groups = groups;
                        this.userLoading = false;
                    })
				}
			})
			.catch(err => {
				console.log(err);
			});
		},
		components: {
            playerProfile,
            'loader': loader,
		}
	}
</script>

<style lang="scss" scoped>
    .page__user-profile {
        padding: 10px 0;
        min-height: 62.5vh;
    }
    .v-spinner {
        margin: 20px 0;
    }
</style>