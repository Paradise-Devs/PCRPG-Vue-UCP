<template>
	<div id="app">
		<div class="header">
			<slider/>
			<navbar/>
		</div>
		<v-waypoint @waypoint="viewHandler"></v-waypoint>
		<router-view></router-view>
	</div>
</template>

<script>
	import 'bootstrap/dist/css/bootstrap.css'
	import 'animate.css/animate.css'
	import 'vue-awesome/icons'
	
	import slider from '@/components/global/Slider'
	import navbar from '@/components/global/Navbar'

	export default {
		name: 'app',
		components: {
			slider, navbar
		},
		methods: {
            viewHandler (direction, going) {
				console.log('View: direction: { x: ' + direction.x + ', y: ' + direction.y + ' } and going: ' + going)
                if(going == "in" && direction.y == "up") {
                    this.$root.$emit('unfixNav')
                }
            }
        }		
	}
</script>

<style>
	@import 'https://fonts.googleapis.com/css?family=Raleway';
	@import 'https://fonts.googleapis.com/css?family=Roboto';
	@import 'https://fonts.googleapis.com/css?family=Barlow';

	#app {
		font-family: 'Barlow';
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		position: relative;
	}

	.header {
		position: relative;
		height: 100vh;
	}
	
	body {
		overflow-x: hidden;
	}
</style>