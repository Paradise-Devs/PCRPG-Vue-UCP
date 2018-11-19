<template>
    <nav class="ucp__menu" id="navUCPMenu">
        <a href="#" class="router-link current__route current__route--closed" v-if="isMobile" @click="toggleUCPNav">{{ currentRoute }} <icon :icon="['fas', 'bars']" class="route__bars" /></a>
        <div class="ucp__menu__block" style="display: none" id="navUCPBlock">
            <router-link to="/ucp" class="router-link" exact @click="toggleUCPNav">Início</router-link>
            <router-link to="/ucp/perfil" class="router-link" exact @click="toggleUCPNav">Perfil</router-link>
            <router-link to="/ucp/configuracoes" class="router-link" exact @click="toggleUCPNav">Configurações</router-link>
            <router-link to="/ucp/mensagens" class="router-link" @click="toggleUCPNav">Mensagens</router-link>
            <a href="#" class="router-link" @click="logout">Sair</a>
        </div>
    </nav>
</template>

<script>
    import { store } from '@/vuex/store'
	import { bell, addressCard, cog, signOutAlt, bars, times, home, code, comments, wrench } from '@fortawesome/fontawesome-free-solid';

    export default {
        data() {
            return {
                currentRoute: this.$route.name,
                ucpNavOpened: false,
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
            showUCPNav: function() {
                var menu = document.getElementById("navUCPMenu");
                var selector = document.getElementsByClassName("current__route")[0];
                var block = document.getElementById("navUCPBlock");
                var navOverlay = document.getElementById("navOverlay");
                var links = document.querySelectorAll('.router-link');
                
                selector.classList.remove('current__route--closed');
                selector.classList.add('current__route--opened');
                block.style.display = '';

                this.ucpNavOpened = true;
            },
            hideUCPNav: function() {
                var menu = document.getElementById("navUCPMenu");
                var selector = document.getElementsByClassName("current__route")[0];
                var block = document.getElementById("navUCPBlock");
                var navOverlay = document.getElementById("navOverlay");
                var links = document.querySelectorAll('.router-link');
                
                selector.classList.remove('current__route--opened');
                selector.classList.add('current__route--closed');
                block.style.display = 'none';

                this.ucpNavOpened = false;
            },
            toggleUCPNav: function(e) {
                e.preventDefault();
                var selector = document.getElementsByClassName("current__route")[0];
                if(selector.classList.contains('current__route--closed')) {
                    this.showUCPNav();
                } else {
                    this.hideUCPNav();
                }
            },
            
            logout: function () {
				this.$root.$emit('logout');
			}
        },
        watch:{
			$route (to, from){
                this.currentRoute = this.$route.name;

				if(window.innerWidth < 768 && this.ucpNavOpened) {
                    this.hideUCPNav();
				}
            }
        }
    }
</script>
