<template>
    <div class="messaging__list">
        <div v-if="messages.length > 0">
            <paginate name="messages" :list="messages" :per="5" class="list">
                <li class="message" :class="{ 'unreaded': !msg.isRead }" v-for="(msg, index) in paginated('messages')" :key="index">
                    <div class="avatar">
                        <img src="https://forum.pc-rpg.com.br/assets/avatars/fd5jikfxjrpo4tx4.png">
                    </div>
                    <div class="content">
                        <h5 class="title">{{ msg.subject }}</h5>
                        <span class="info">Enviado por <b>{{ msg.sender }}</b> há 2 dias atrás.</span>
                    </div>
                </li>
            </paginate>
            <paginate-links
                for="messages"
                :show-step-links="true"
                :hide-single-page="true"
            >
            </paginate-links>
        </div>
        <div class="empty" v-else>
            <h3>Nenhuma mensagem encontrada</h3>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            messages: Array
        },
        data() {
			return {
				paginate: ['messages']
			}
        },
    }
</script>