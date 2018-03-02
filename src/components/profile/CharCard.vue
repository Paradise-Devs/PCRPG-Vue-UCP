<template>
    <b-col cols="4">
        <div class="char">
            <div class="main">
                <span class="level">{{ char.level }}</span>
            </div>
            <div class="info">
                <h4>{{ char.name }}</h4>
            </div>
            <table class="stats">
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
            <footer>
                <router-link :to="username + '/char/' + char.name" class="btn btn-primary btn-block">Ver personagem</router-link>
            </footer>
        </div>
    </b-col>
</template>

<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    export default {
        props: {
            char: Object
        },
        data() {
			return {
                username: this.$route.params.username,
            }
        },
        components: {
            'vue-spinner': PulseLoader,
        }
    }
</script>

<style scoped>
    .char {
        width: 100%;
        background-color: #1B2028;
        margin-right: 20px;
        border-radius: 0.25rem;
        position: relative;
    }

    .char .main {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .char .main .level {
        width: 65px;
        height: 65px;
        background-color: #039BE5;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        font-size: 32px;
    }

    .char .info {
        text-align: center;
    }

    .char .stats {
        width: 100%;
        margin-top: 15px;
    }

    .char .stats tr td {
        padding: 5px 10px;
        text-align: center;
    }

    .char .stats tr td.opt {
        background-color: #161A20;
        font-size: 14px;
        width: 40%;
    }

    .char .stats tr td.value {
        background-color: #181D24;
        font-size: 14px;
    }

    .char footer {
        border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		background-color: #1B2028;
		text-align: center;
		height: auto;
    }

	.char .btn {
		-webkit-border-radius: 0;
		-moz-border-radius: 0;
		border-radius: 0;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		padding: 12px 0;
	}
</style>
