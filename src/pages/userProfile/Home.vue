<template>
    <b-container>
    </b-container>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import fontawesome from '@fortawesome/vue-fontawesome'

    import code from '@fortawesome/fontawesome-free-solid';
    import bolt from '@fortawesome/fontawesome-free-solid';
    import support from '@fortawesome/fontawesome-free-solid';
    import briefcase from '@fortawesome/fontawesome-free-solid';
    
    var usersBaseURI = 'http://forum.pc-rpg.com.br/api/users/';
    var groupsBaseURI = 'http://forum.pc-rpg.com.br/api/groups';

    export default {
        data() {
			return {
                forumData: [ ],
                groupsData: [ ],
                serverData: [
                    {

                    }
                ],
                username: this.$route.params.username,
                playerFound: false,
                playerProcessed: false,
            }
        },
        methods: {
            playerExists() {
                if(this.playerFound) {
                    document.getElementById('playernotfound').style.display = 'block';
                }
            }
        },
        beforeMount() {
            axios.get(usersBaseURI + this.username)
			.then(response => {
                this.forumData = response.data.data.attributes;
                for(var i = 0; i < response.data.included.length; i++) {
                    if(response.data.included[i].type == 'groups') {
                        this.groupsData.push(response.data.included[i].attributes);
                        console.log(this.groupsData);
                    }
                }
                this.playerFound = true;
                this.playerProcessed = true;
            })
        },
        filters: {
            bio: function(text) {
				return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
            },
            moment: function(time) {
				return moment(time).format('LL');
			}
        },
        mounted() {
            this.playerProcessed = true;
            this.playerExists();
        },
        components: {
            'vue-spinner': PulseLoader,
			'fa': fontawesome
        }
    }
</script>

<style scoped>
    .profile .card {
        margin: 20px 0px;
        background-color: #1B2028;
        border: none;
        position: relative;
        min-height: 160px;
    }

    .profile .card .card-body {
        padding: 10px;
        max-height: 160px;
    }

    .profile .card .avatar {
        position: absolute;
        height: 100%;
        width: 160px;
        background-color: #181D24;
        top: 0px;
        left: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
    }

    .profile .card .avatar img {
        border-radius: 100px;
        width: 120px;
        height: 120px;
    }

    .profile .card .content {
        padding-left: 170px;
        width: 100%;
        vertical-align: top;
        height: 160px;
        position: relative;
    }

    .profile .card .content h1 {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 5px;
    }

    .profile .card .content .tags .badge {
        background-color: transparent;
        border: 1px solid;
        border-radius: 20px;
        padding: 5px 10px 5px 38px;
        vertical-align: middle;
        position: relative;
        color: #aaa;
        margin-right: 10px;
    }

    .profile .card .content .tags .icon {
        position: absolute;
        top: 0;
        left: -1px;
        width: 30px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px 0px 0px 20px;
        color: #14191F;
    }

    .profile .card .content .tags .icon svg {
        position: relative;
        right: -1px;
    }

    .profile .status {
        position: absolute;
        top: 10px;
        right: 20px;
    }

    .profile .stats {
        position: absolute;
        bottom: 20px;
        left: 170px;
    }

    #playernotfound {
        display: none;
    }
</style>
