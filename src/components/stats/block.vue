<template>
    <div class="stats__block">
        <b-container>
            <div class="stats__block__wrapper">
                <div class="stats__column">
                    <div class="number">{{ stats.players }}</div>
                    <div class="desc">Jogadores</div>
                </div>
                <div class="stats__column">
                    <div class="number">{{ stats.characters }}</div>
                    <div class="desc">Personagens</div>
                </div>
                <div class="stats__column">
                    <div class="number">{{ stats.factions }}</div>
                    <div class="desc">Facções</div>
                </div>
                <div class="stats__column">
                    <div class="number">{{ stats.properties }}</div>
                    <div class="desc">Propriedades</div>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
    import axios from 'axios';
    
    var statsEndpoint;
    if((location.hostname != "pc-rpg.com.br") && (location.hostname != "www.pc-rpg.com.br")) {
		statsEndpoint = 'http://dev.pc-rpg.com.br:3000/api/v1/statistics';
	} else {
		statsEndpoint = 'http://prod.pc-rpg.com.br:3000/api/v1/statistics';
	}

    export default {
        data() {
            return {
                stats: [ ]
            }
        },
        mounted() {
            axios.get(statsEndpoint)
			.then(response => {
				this.stats = response.data;
			});
        }
    }
</script>

<style lang="scss" scoped>
    .stats__block {
        background-image: url('./parallax.jpg');
    }
</style>
