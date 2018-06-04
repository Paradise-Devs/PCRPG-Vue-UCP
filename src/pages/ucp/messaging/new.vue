<template>
    <div class="page__ucp--message-new">
        <b-form class="new_message">
            <div class="preview markdown" v-html="marked"> {{ text | marked }} </div>
            <div class="inputs">
                <b-form-group>
                    <b-form-input type="email" v-model="title" required placeholder="Assunto da mensagem"/>
                </b-form-group>
                <b-form-group>
                    <b-form-input type="email" v-model="title" required placeholder="Destinatário" />
                </b-form-group>
                <b-form-group description="Você pode utilizar <a href='http://commonmark.org/help/' target='_blank'>Markdown</a> para formatar o seu texto">
                    <textarea placeholder="Escreva aqui" @input="updatePreview" v-model="text" class="new_message__textarea"/>
                </b-form-group>
                <b-form-group>
                    <b-button variant="secondary">Cancelar</b-button>
                    <b-button variant="primary" class="submit">Enviar</b-button>
                </b-form-group>
            </div>
        </b-form>
    </div>
</template>

<script>
    import marked from 'marked';

    export default {
        data() {
            return {
                text: '',
                title: ''
            }
        },
        computed: {
            marked: function () {
                return marked(this.text, { sanitize: true })
            }
        }
    }
</script>