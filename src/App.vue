<template>
	<div id="app">
		<div class="header">
			<navbar/>
			<hero/>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import 'bootstrap/dist/css/bootstrap.css'
	import 'animate.css/animate.css'

	import navbar from '@/components/global/Navbar'
	import hero from '@/components/global/Hero'

	export default {
		name: 'app',
		components: {
			navbar, hero
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
		background: #14191f;
		color: #ddd;
		font-family: "Open Sans",Helvetica,Arial,sans-serif;
		font-size: inherit;
		line-height: 1.5;
		overflow-y: scroll;
	}

	.container {
		margin-right: auto;
		margin-left: auto;
		padding-left: 15px;
		padding-right: 15px;
		max-width: 1100px;
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