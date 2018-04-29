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
    export default {

    }
</script>
