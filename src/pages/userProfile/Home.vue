<template>
	<div>
		<b-row>
			<char
				v-for="char in charsData"
				:key="char.id"
				:char='char'
			/>
		</b-row>
		<b-row class="charnav">
			<b-col cols="12">
				<b-tabs>
					<b-tab title="Fórum" active>
						<forumlog/>
					</b-tab>
					<b-tab title="Servidor">

					</b-tab>
					<b-tab title="Histórico">

					</b-tab>
				</b-tabs>
			</b-col>
		</b-row>
	</div>
</template>

<script>
    import axios from 'axios';

    import char from '@/components/profile/CharCard.vue'
	import forumlog from '@/components/profile/ForumLog.vue'

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
            char,
			forumlog
        }
    }
</script>

<style>
	.charnav {
		margin-top: 20px;
	}

	.charnav .nav {
		border-color: #1B2028;
	}

	.charnav .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
		background-color: #1B2028;
		border-color: #1B2028;
		color: #6c7d93;
	}

	.charnav .nav-tabs .nav-link {
		color: #303846;
	}

	.charnav .nav-tabs .nav-item {
		width: 33.33%;
		text-align: center;
	}

	.charnav .nav-tabs .nav-link:focus:not(.active), .charnav .nav-tabs .nav-link:hover:not(.active) {
		border-color: #1B2028;
		background-color: #161A20;
	}
</style>
