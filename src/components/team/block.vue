<template>
    <div class="block team">
        <div class="block__header">
            <h3><fa :icon="['fas', 'users']" /> A equipe</h3>
        </div>
        <div class="block__content">
            <div role="tablist">
                <div class="rank" v-b-toggle.devs>
                    Desenvolvedores
                    <span class="opened"><fa :icon="['fas', 'angle-up']" /></span>
                    <span class="closed"><fa :icon="['fas', 'angle-down']" /></span>
                </div>
                <b-collapse accordion="team" id="devs">
                    <user
                        v-for="user in devs"
                        :key="user.id"
                        :user='user'
                    />
                </b-collapse>

                <div class="rank" v-b-toggle.admin>
                    Administradores
                    <span class="opened"><fa :icon="['fas', 'angle-up']" /></span>
                    <span class="closed"><fa :icon="['fas', 'angle-down']" /></span>
                </div>
                <b-collapse accordion="team" id="admin">
                    <user
                        v-for="user in admins"
                        :key="user.id"
                        :user='user'
                    />
                </b-collapse>

                <div class="rank" v-b-toggle.mods>
                    Moderadores
                    <span class="opened"><fa :icon="['fas', 'angle-up']" /></span>
                    <span class="closed"><fa :icon="['fas', 'angle-down']" /></span>
                </div>
                <b-collapse accordion="team" id="mods">
                    <user
                        v-for="user in mods"
                        :key="user.id"
                        :user='user'
                    />
                </b-collapse>

                <div class="rank" v-b-toggle.support>
                    Suporte
                    <span class="opened"><fa :icon="['fas', 'angle-up']" /></span>
                    <span class="closed"><fa :icon="['fas', 'angle-down']" /></span>
                </div>
                <b-collapse accordion="team" id="support">
                    <user
                        v-for="user in supports"
                        :key="user.id"
                        :user='user'
                    />
                </b-collapse>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
    import fontawesome from '@fortawesome/vue-fontawesome'

	import angleDown from '@fortawesome/fontawesome-free-solid';
    import angleUp from '@fortawesome/fontawesome-free-solid';

    import user from './user.vue'

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
                                this.devs.push(this.users[i].attributes);
                            }

                            if(this.users[i].relationships.groups.data[j].id == 4) {
                                this.mods.push(this.users[i].attributes);
                            }

                            if(this.users[i].relationships.groups.data[j].id == 8) {
                                this.admins.push(this.users[i].attributes);
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
            'fa': fontawesome,
            user
		}
    }
</script>

<style lang="scss" scoped>
    .team {
        .block__content {
            padding-bottom: 0px;
            min-height: 374px;
            max-height: 374px;
            overflow-x: auto;

            .rank {
                background-color: #181c24;
                padding: 5px 10px;
                cursor: pointer;

                &:hover {
                    background-color: #171B22;
                }

                &:not(:last-child) {
                    border-bottom: 1px solid #151920;
                }

                &.collapsed > .opened,
                &:not(.collapsed) > .closed {
                    display: none;
                }

                .opened, .closed {
                    float: right;
                }
            }
        }
    }
</style>