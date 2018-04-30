<template>
    <nav class="ucp__menu">
        <router-link to="/ucp" class="router-link" exact>Início</router-link>
        <router-link to="/ucp/perfil" class="router-link" exact>Perfil</router-link>
        <router-link to="/ucp/configuracoes" class="router-link" exact>Configurações</router-link>
        <router-link to="/ucp/mensagens" class="router-link" exact>Mensagens</router-link>
        <a href="#" class="router-link" @click="logout">Sair</a>
    </nav>
</template>

<script>
    import { store } from '@/vuex/store'

    export default {
        methods: {
            logout: function () {
				store.dispatch('logout').then(() => {
					this.$router.push(this.$route.query.redirect || '/ucp');
				})
			}
        }
    }
</script>
