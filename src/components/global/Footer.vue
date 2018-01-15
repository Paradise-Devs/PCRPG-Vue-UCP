<template>
    <footer>
        <b-container class="">
			<b-row>
                <b-col cols="6" md="6" class="column">
                    Paradise City RPG é uma propriedade intelectual da <a href="https://wullo.ws/" target="_blank">Wullo Web Services</a> e não possui vinculos com a Rockstar Games.
                </b-col>
                <b-col cols="6" md="6" class="column social">
                    <div class="social-networks">
                        <a 
                            href="https://fb.com/paradisecityrpg/" 
                            v-b-tooltip.hover title="Facebook"
                        >
                            <fa :icon="['fab', 'facebook-f']" size="lg"/>
                        </a>
                        <a 
                            href="https://twitter.com/paradisecityrpg" 
                            v-b-tooltip.hover title="Twitter"
                        >
                            <fa :icon="['fab', 'twitter']" size="lg" />
                        </a>
                        <a 
                            href="https://www.youtube.com/channel/UCGo6hd688I7PS3NzRa01yiw"
                            v-b-tooltip.hover title="YouTube"
                        >
                            <fa :icon="['fab', 'youtube']" size="lg" />
                        </a>
                        <a
                            href="https://discordapp.com/invite/hpvRGZe"
                            v-b-tooltip.hover title="Discord"
                        >
                            <fa :icon="['fab', 'discord']" size="lg" />
                        </a>
                    </div>
                </b-col>
            </b-row>
		</b-container>
    </footer>
</template>

<script>
    import fontawesome from '@fortawesome/vue-fontawesome'
    import twitter from '@fortawesome/fontawesome-free-brands';
    import facebook from '@fortawesome/fontawesome-free-brands';
    import youtube from '@fortawesome/fontawesome-free-brands';
    import discord from '@fortawesome/fontawesome-free-brands';

    export default {
        name: 'Footer',
        components: {
            'fa': fontawesome
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
        border: 0;
        margin: 0 8px 10px;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .social-networks a:hover {
        opacity: 1;
    }
</style>
