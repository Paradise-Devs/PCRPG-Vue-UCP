<template>
    <b-container>
        <usercard />
        <router-view></router-view>
    </b-container>
</template>

<script>
    import usercard from '@/components/profile/UserCard.vue'

    export default {
        components: {
            usercard
        }
    }
</script>

<style scoped>
    .container {
        margin-bottom: 20px;
    }
</style>
