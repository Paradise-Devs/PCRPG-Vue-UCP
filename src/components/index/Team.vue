<template>
    <div role="tablist">
        <div class="rank-name" v-b-toggle.admin>
            Administradores
            <span class="opened"><fa :icon="['fas', 'angle-up']" /></span>
            <span class="closed"><fa :icon="['fas', 'angle-down']" /></span>
        </div>
        <b-collapse visible accordion="team" id="admin">
            admins
        </b-collapse>

        <div class="rank-name" v-b-toggle.devs>
            Desenvolvedores
            <span class="opened"><fa :icon="['fas', 'angle-up']" /></span>
            <span class="closed"><fa :icon="['fas', 'angle-down']" /></span>
        </div>
        <b-collapse accordion="team" id="devs">
            devs
        </b-collapse>

        <div class="rank-name" v-b-toggle.mods>
            Moderadores
            <span class="opened"><fa :icon="['fas', 'angle-up']" /></span>
            <span class="closed"><fa :icon="['fas', 'angle-down']" /></span>
        </div>
        <b-collapse accordion="team" id="mods">
            mods
        </b-collapse>

        <div class="rank-name" v-b-toggle.support>
            Suporte
            <span class="opened"><fa :icon="['fas', 'angle-up']" /></span>
            <span class="closed"><fa :icon="['fas', 'angle-down']" /></span>
        </div>
        <b-collapse accordion="team" id="support">
            suporte
        </b-collapse>
    </div>
</template>

<script>
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import fontawesome from '@fortawesome/vue-fontawesome'

	import angleDown from '@fortawesome/fontawesome-free-solid';
    import angleUp from '@fortawesome/fontawesome-free-solid';
    
    var usersBaseURI = 'http://forum.pc-rpg.com.br/api/users';
    var groupsBaseURI = 'http://forum.pc-rpg.com.br/api/groups';
    
    export default {
        data() {
			return {
                users: [ ],
                admins: [ ],
                devs: [ ],
                mods: [ ],
                supports: [ ],
            }
        },
        mounted() {
            axios.get(usersBaseURI)
			.then(response => {
                this.users = response.data.data;
                for(var i = 0; i < this.users.length; i++) {
                    if(this.users[i].relationships.groups.data != null) {
                        for(var j = 0; j < this.users[i].relationships.groups.data.length; j++) {
                            if(this.users[i].relationships.groups.data[j].id == 1) {
                                this.admins.push(this.users[i].attributes);
                            }

                            if(this.users[i].relationships.groups.data[j].id == 4) {
                                this.mods.push(this.users[i].attributes);
                            }

                            if(this.users[i].relationships.groups.data[j].id == 6) {
                                this.devs.push(this.users[i].attributes);
                            }

                            if(this.users[i].relationships.groups.data[j].id == 7) {
                                this.supports.push(this.users[i].attributes);
                            }
                        }
                    }
                }
            })
        },
        components: {
			'vue-spinner': PulseLoader,
			'fa': fontawesome
		}
    }
</script>

<style scoped>
    .rank-name {
        background-color: #181c24;
        padding: 5px 10px;
        cursor: pointer;
    }

    .collapsed > .opened,
    :not(.collapsed) > .closed {
        display: none;
    }

    .opened, .closed {
        float: right;
    }
</style>
