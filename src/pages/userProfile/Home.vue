<template>
    <b-row>
        <char 
            v-for="char in charsData" 
            :key="char.id"
            :char='char'
        />
    </b-row>
</template>

<script>
    import axios from 'axios';

    import char from '@/components/profile/CharCard.vue'

    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    export default {
        data() {
			return {
                charsData: [
                    {
                        level: 240,
                        name: 'Antonio Nunes',
                        job: 'Entregador de Pizza',
                        faction: 'Sem Tetos',
                        timeplayed: '14h 22m'
                    },
                    {
                        level: 13,
                        name: 'John Doe',
                        job: 'Caminhoneiro',
                        faction: null,
                        timeplayed: '5h 11m'
                    },
                    {
                        level: 7,
                        name: 'Hugh Mungus',
                        job: 'Jardineiro',
                        faction: 'Fodidos',
                        timeplayed: '2h 22m'
                    }
                ],
                playerFound: false,
                playerProcessed: false,
            }
        },
        components: {
            'vue-spinner': PulseLoader,
            char
        }
    }
</script>
