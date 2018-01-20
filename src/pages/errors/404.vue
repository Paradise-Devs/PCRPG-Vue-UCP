<template>
    <b-container>
        <h1>404</h1>
        <h3>Não encontramos a página que você está procurando =(</h3>
        <router-link to="/" class="button primary">Voltar a página inicial</router-link>
    </b-container>
</template>

<style scoped>
    .container {
        min-height: 62.5vh;
        padding: 30px;
        text-align: center;
    }

    .container h1 {
        text-align: center;
        font-size: 900%;
    }

    .container h3 {
        text-align: center;
        margin-bottom: 30px;
    }
</style>