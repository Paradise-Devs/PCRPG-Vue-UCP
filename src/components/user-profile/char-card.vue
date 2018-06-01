<template>
    <div v-if="char && !empty" class="char__card">
        <div class="char__card__main">
            <span class="char__card__main--level">{{ char.level }}</span>
        </div>
        <div class="char__card__info">
            <h4>{{ char.name }}</h4>
        </div>
        <table class="char__card__stats">
            <tr>
                <td class="opt">Profissão</td>
                <td class="value" v-if="char.job != null">{{ char.job }}</td>
                <td class="value" v-else>-</td>
            </tr>
            <tr>
                <td class="opt">Facção</td>
                <td class="value" v-if="char.faction != null">{{ char.faction }}</td>
                <td class="value" v-else>-</td>
            </tr>
            <tr>
                <td class="opt">Tempo Jogado</td>
                <td class="value">{{ char.timeplayed }}</td>
            </tr>
        </table>
    </div>
    <div v-else-if="empty" class="char__card char__card--empty">
        <div class="card__icon">
            <font-awesome-layers>
                <fa :icon="['fas', 'street-view']"/>
                <fa :icon="['fas', 'plus']" transform="shrink-12 right-5 up-9" />
            </font-awesome-layers>
        </div>
        <span class="card__text">Espaço de personagem vazio</span>
    </div>
</template>

<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome';
	import { streetView, plus } from '@fortawesome/fontawesome-free-solid';

    export default {
        props: {
            char: Object,
            empty: Boolean
        },
        data() {
			return {
                username: this.$route.params.username,
            }
        },
        mounted() {
            console.log(this.char);
        },
        components: {
            'vue-spinner': PulseLoader,
            'fa': FontAwesomeIcon,
            FontAwesomeLayers
        }
    }
</script>