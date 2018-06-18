<template>
    <div class="messaging__list">
        <div v-if="messages.length > 0">
            <paginate name="messages" :list="messages" :per="5" class="list">
                <li v-for="(msg, index) in paginated('messages')" :key="index" @click="getSelectedElements">
                    <message :msg="msg"/>
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
    import ForumService from '@/services/forum'

    import message from './message'

    export default {
        props: {
            messages: Array
        },
        data() {
			return {
                userAvatar: null,
                userName: null,
                selected: [],
                paginate: ['messages']
			}
        },
        methods: {
            getSelectedElements: function (event) {
                if(!event.target.classList.contains('message--selected')) {
                    event.target.classList.add('message--selected');
                } else {
                    event.target.classList.remove('message--selected');
                }

                let allMessages = document.getElementsByClassName('message--selected');
                this.selected = [];
                for(let i = 0; i < allMessages.length; i++) {
                    this.selected.push(allMessages[i].dataset.msgid);
                }
            }
        },
        components: {
            message
        }
    }
</script>
