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
	
	import slider from '@/components/global/Slider'
	import navbar from '@/components/global/Navbar'

	export default {
		name: 'app',
		components: {
			slider, navbar
		},
		methods: {
            viewHandler (direction, going) {
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
	@import 'https://fonts.googleapis.com/css?family=Montserrat';
	@import 'https://fonts.googleapis.com/css?family=Lato';

	#app {
		font-family: Barlow;
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

	.badge {
		font-family: Roboto;
		font-weight: 400;
		border-radius: 0px;
	}

	section {
		max-width: 1170px;
		position: relative;
		width: 100%;
		margin: 0 auto;
		position: relative;
		padding: 120px 0px 0px;
	}

	.main-content {
		position: relative;
		z-index: 2;
		height: 1500px;
		background-color: #1E2021;
	}

	.block-title .title-content h1 {
		color: #fff;
		text-transform: uppercase;
		font-weight: 400;
		text-transform: uppercase;
		color: #f5f5f5;
		font-size: 30px;
		position: relative;
		margin-bottom: 0;
		line-height: 35px;
	}

	.block-title .title-content h1 span {
		color: #00b0ff;
	}

	.block-title .title-content small {
		color: #aaa;
	}

	.title-content {
		position: relative;
		padding-left: 20px;
	}

	.block-title .title-content::before {
		background-color: #00b0ff;
		content: "";
		position: absolute;
		height: 100%;
		width: 4px;
		left: 0;
		top: 0;
	}
</style>