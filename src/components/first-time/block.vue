<!--suppress ALL -->
<template>
    <b-row align-h="between" class="firsttime__block">
        <b-col md="5" sm="12">
            <textFirstTime />
        </b-col>
        <b-col md="7" sm="12">
            <formFirstTime />
        </b-col>
    </b-row>
</template>

<script>
	import Vue from 'vue';
    import { store } from '@/vuex/store';

    import textFirstTime from './text';
    import formFirstTime from './form';

	export default {
		data() {
            return {
				user: store.state.user,
				userLoggedIn: null,
            }
        },
		methods: {
            
        },
		mounted() {
			if(this.user.token == null) {
				this.userLoggedIn = false;
			} else {
				this.userLoggedIn = true;
			}

			store.watch(
				(state)=>{
					return store.getters.getUserData
				},
				(oldValue, newValue)=>{
					this.user = store.state.user;
				}
			)
        },
        components: {
            textFirstTime, formFirstTime
		}
	}
</script>