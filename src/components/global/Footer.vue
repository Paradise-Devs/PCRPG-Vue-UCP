<template>
    <footer>
        <b-container>
			<b-row>
                <b-col sm="12" md="6">
                    <p>Paradise City RPG é uma propriedade intelectual da <a href="https://wullo.ws/" target="_blank">Wullo Web Services</a> e não possui vinculos com a Rockstar Games.</p>
                </b-col>
                <b-col sm="12" md="6" class="social">
                    <a 
                        href="https://fb.com/paradisecityrpg/" 
                        v-b-tooltip.hover title="Facebook"
                        target="_blank"
                    >
                        <fa :icon="['fab', 'facebook-f']"/>
                    </a>
                    <a 
                        href="https://twitter.com/paradisecityrpg" 
                        v-b-tooltip.hover title="Twitter"
                        target="_blank"
                    >
                        <fa :icon="['fab', 'twitter']"/>
                    </a>
                    <a 
                        href="https://www.youtube.com/channel/UCGo6hd688I7PS3NzRa01yiw"
                        v-b-tooltip.hover title="YouTube"
                        target="_blank"
                    >
                        <fa :icon="['fab', 'youtube']"/>
                    </a>
                    <a
                        href="https://discordapp.com/invite/hpvRGZe"
                        v-b-tooltip.hover title="Discord"
                        target="_blank"
                    >
                        <fa :icon="['fab', 'discord']"/>
                    </a>
                </b-col>
            </b-row>
		</b-container>
    </footer>
</template>

<script>
    import fontawesome from '@fortawesome/vue-fontawesome'
    import { twitter, facebook, youtube, discord } from '@fortawesome/fontawesome-free-brands';

    export default {
        name: 'Footer',
        components: {
            'fa': fontawesome
        }
    }
</script>