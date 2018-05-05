<template>
    <nav class="ucp__menu">
        <a href="#" class="router-link current__route current__route--closed" v-if="isMobile" @click="toggleUCPNav">{{ currentRoute }} <fa :icon="['fas', 'bars']" class="route__bars" /></a>
        <div class="ucp__menu__block" style="display: none" id="navBlock">
            <router-link to="/ucp" class="router-link" exact>Início</router-link>
            <router-link to="/ucp/perfil" class="router-link" exact>Perfil</router-link>
            <router-link to="/ucp/configuracoes" class="router-link" exact>Configurações</router-link>
            <a href="#" class="router-link" @click="logout">Sair</a>
        </div>
    </nav>
</template>

<script>
    import { store } from '@/vuex/store'

    import fontawesome from '@fortawesome/vue-fontawesome';
	import { bell, addressCard, cog, signOutAlt, bars, times, home, code, comments, wrench } from '@fortawesome/fontawesome-free-solid';

    export default {
        data() {
            return {
                currentRoute: this.$route.name
            }
        },
        computed: {
            isMobile: function() {
                if(window.innerWidth < 768) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            toggleUCPNav: function() {
                var selector = document.getElementsByClassName("current__route")[0];
                var block = document.getElementById("navBlock");
                
                if(selector.classList.contains('current__route--closed')) {
                    selector.classList.remove('current__route--closed');
                    selector.classList.add('current__route--opened');
                    block.style.display = '';
                } else {
                    selector.classList.remove('current__route--opened');
                    selector.classList.add('current__route--closed');
                    block.style.display = 'none';
                }
            },
            
            logout: function () {
				store.dispatch('logout').then(() => {
					this.$router.push(this.$route.query.redirect || '/ucp');
				})
			}
        },
        watch: {
            '$route' (to, from) {
                this.currentRoute = this.$route.name;
                this.toggleUCPNav();
            }
        },
        components: {
            'fa': fontawesome
        }
    }
</script>
