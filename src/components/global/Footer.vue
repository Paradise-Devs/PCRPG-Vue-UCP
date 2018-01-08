<template>
    <footer>
        <b-container class="">
			<b-row>
                <b-col cols="6" md="6" class="column">
                    Paradise City RPG é uma propriedade intelectual não registrada da <a href="https://wullo.ws/" target="_blank">Wullo Web Services</a> e não possui vinculos com a Rockstar Games.
                </b-col>
                <b-col cols="6" md="6" class="column social">
                    <div class="social-networks">
                        <a href="https://fb.com/paradisecityrpg/" v-b-tooltip.hover title="Facebook"><icon name="facebook" scale="1.2" /></a>
                        <a href="https://twitter.com/paradisecityrpg" v-b-tooltip.hover title="Twitter"><icon name="twitter" scale="1.2" /></a>
                        <a href="https://i.imgur.com/Solwvn4.png" v-b-tooltip.hover title="YouTube"><icon name="youtube-play" scale="1.2" /></a>
                        <a href="https://discordapp.com/invite/hpvRGZe" v-b-tooltip.hover title="Discord"><icon name="group" scale="1.2" /></a>
                    </div>
                </b-col>
            </b-row>
		</b-container>
    </footer>
</template>

<script>
    import 'vue-awesome/icons/facebook'
    import 'vue-awesome/icons/twitter'
    import 'vue-awesome/icons/group'
    import 'vue-awesome/icons/heart'
    import 'vue-awesome/icons/youtube-play'

    export default {
            name: 'Footer',
            methods: {
		}
    }
</script>

<style>
    footer {
        height: 160px;
        text-align: center;
        color: #6c7d93;
        position: relative;
        width: 100%;
        background-color: #1B2028;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    footer .row {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    footer .container .column .logo {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    footer .container .column .how {
        font-size: 12px;
        margin-top: 10px;
    }
    footer .container .column img {
        max-width: 120px;
        display: block;
        opacity: .2;
    }

    .social-networks {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        overflow: hidden;
    }

    .social-networks a {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.4);
        opacity: .4;
        border-radius: 100%;
        border: 0;
        margin: 0 5px 10px;
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .social-networks a:hover {
        opacity: 1;
    }
</style>
