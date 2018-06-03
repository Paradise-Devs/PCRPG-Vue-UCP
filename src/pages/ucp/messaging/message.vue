<template>
    <div class="message__details">
        <div class="message__header">
            <h3 class="message__subject">{{ content.subject }}</h3>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            content: Object
        },
    }
</script>