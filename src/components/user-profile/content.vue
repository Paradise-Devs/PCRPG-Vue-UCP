<template>
    <div class="comp__userContent">
        <h3 class="comp__userContent__username">{{ user.forumAtt.attributes.username }}</h3>
        <p class="comp__userContent__bio">{{ user.forumAtt.attributes.bio | bio }}</p>
        <div class="tags">
            <b-badge 
                v-for="group in user.groups"
                :key="group.id"
                :style="{ borderColor: group.color }"
            >
                <span class="icon" :style="{ backgroundColor: group.color }"> 
                    <fa :icon="['fas', group.icon]" />
                </span>
                <span :style="{ color: group.color }">{{ group.nameSingular}}</span>
            </b-badge>
        </div>
    </div>
</template>

<script>
	import Vue from 'vue';
	import axios from 'axios';
	import { store } from '@/vuex/store';
	import fontawesome from '@fortawesome/vue-fontawesome';
    
    import { code, bolt, support, briefcase, pencilAlt } from '@fortawesome/fontawesome-free-solid';

    export default {
        props: {
            user: Object
        },
        filters: {
            bio: function(text) {
                let tmp = text.replace(/(?:\r\n|\r|\n)/g, ' ');
                return tmp;
            },
        },
        components: {
            'fa': fontawesome
        }
    }
</script>