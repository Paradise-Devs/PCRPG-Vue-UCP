<template>
	<div id="app">
		<header>
			<navbar/>
			<hero/>
		</header>
		<router-view/>
		<appfooter/>
	</div>
</template>

<script>
	import 'bootstrap/dist/css/bootstrap.css'
	import 'animate.css/animate.css'

	import navbar from '@/components/global/Navbar'
	import hero from '@/components/global/Hero'
	import appfooter from '@/components/global/Footer'

	export default {
		name: 'app',
		components: {
			navbar, hero, appfooter
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
		color: #6c7d93;
		position: relative;
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

	a {
		cursor: pointer;
		color: #526cff;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
		color: #526cff;
	}
</style>