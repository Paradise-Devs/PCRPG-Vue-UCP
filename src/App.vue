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

	ul {
		margin: 0px;
		padding: 0px;
		list-style-type: none;
	}

	/* block */
	.block .block-header {
		background-color: #1B2028;
		padding: 8px 10px;
		text-align: center;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}

	.block.no-footer .block-content {
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	.block .block-content {
		padding: 0px 0px 10px;
		border: 1px solid #1B2028;
	}

	.block.no-bottom .block-content {
		padding: 0px;
	}

	.block.no-border .block-content {
		border: none;
	}

	.block .block-header h3 {
		text-transform: uppercase;
		font-size: 16px;
		margin: 0px;
	}

	.block .block-footer {
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		background-color: #1B2028;
		padding: 8px 10px;
	}

	/* posts */
	.post {
        padding-left: 62px;
        padding-right: 80px;
        position: relative;
        color: #6c7d93;
		transition: background .2s;
    }

	.post:hover {
		background: #171d23;
	}

	.post:hover .content .created {
		opacity: 1;
	}

	.post a {
		text-decoration: none;
	}

    .post .author {
        text-decoration: none;
        float: left;
        margin-top: 13px;
        margin-left: -50px;
        float: left;
        margin-top: 13px;
    }

    .post .author .avatar {
        width: 36px;
        height: 36px;
        border-radius: 36px;
        font-size: 18px;
        line-height: 36px;
        display: inline-block;
        box-sizing: content-box;
        color: #fff;
        text-align: center;
        vertical-align: top;
        background-color: #1b2028;
        font-weight: normal;
    }

	.post .content {
		margin-right: -65px;
		display: inline-block;
		width: 100%;
		padding: 12px 0;
		color: inherit;
	}

	.post .content h3 {
		margin-right: 155px;
		font-size: 15px;
		line-height: 1.3;
		color: #6c7d93;
		font-weight: normal;
		overflow: hidden;
		text-overflow: ellipsis;
		margin: 0 0 3px;
	}

	.post .content .info {
		list-style-type: none;
		padding: 0;
		margin: 0;
		font-size: 12px;
	}

	.post .content .info li {
		display: inline;
		opacity: 0.7;
		-webkit-transition: opacity .2s;
		-o-transition: opacity .2s;
		transition: opacity .2s;
	}

	.post .content .info .tags {
		margin-right: 0;
		position: absolute;
		right: 80px;
		top: 23px;
		max-width: 150px;
		white-space: nowrap;
		overflow: hidden;
		transition: max-width .2s ease-in-out,-webkit-mask-image .2s;
		-webkit-mask-image: linear-gradient(to right, #000 140px, rgba(0,0,0,0) 150px);
		opacity: 1;
		display: inline;
	}

	.post .content .info .tag {
		white-space: nowrap;
	}

	.post .content .info .tag .label {
		font-size: 85%;
		font-weight: 600;
		display: inline-block;
		padding: .1em .5em;
		border-radius: 4px;
		background: #1b2028;
		background-color: rgb(27, 32, 40);
		color: #6c7d93;
		text-transform: none;
	}

	.post .content .info .tag .label:first-child:last-child {
    	border-radius: 4px;
	}

	.post .content .info .tag .label:last-child {
		border-radius: 0 4px 4px 0;
	}

	.post .content .info .tag .label:first-child {
		border-radius: 4px 0 0 4px;
	}

	.post .content .info .tag .label .tag-text {
		color: #14191f !important;
		font-weight: 600;
		text-transform: none;
	}

	.post .content .username {
		font-weight: bold;
	}

	.post .comments {
		margin-top: 21px;
		margin-right: -50px;
		width: 55px;
		color: #6c7d93;
		font-size: 14px;
		padding-left: 21px;
		float: right;
		text-decoration: none;
	}

	.post .comments .fa-icon {
		float: left;
		margin-left: -25px;
		margin-top: 2px;
	}

	/* pagination */
	.paginate-links {
		display: flex;
		display: -ms-flexbox;
		padding-left: 0;
		list-style: none;
		border-radius: 0.25rem;
		justify-content: center;
		margin-top: 10px;
	}
	.paginate-links li {
		padding: 2px 10px;
		border: 1px solid rgba(48, 56, 70, .4);
		margin-left: -1px;
	}
	
	.paginate-links li.active {
		background-color: #303846;
	}

	.paginate-links li.left-arrow.disabled, .paginate-links li.right-arrow.disabled {
		opacity: .2;
	}

	.paginate-links li.left-arrow.disabled a, .paginate-links li.right-arrow.disabled a {
		cursor: default;
	}

	.paginate-links li:first-child {
		border-top-left-radius: 100px;
		border-bottom-left-radius: 100px;
	}

	.paginate-links li:last-child {
		border-top-right-radius: 100px;
		border-bottom-right-radius: 100px;
	}

	/* buttons */
	.button {
		text-decoration: none;
		margin-bottom: 0;
		text-align: center;
		vertical-align: middle;
		cursor: pointer;
		white-space: nowrap;
		line-height: 20px;
		padding: 8px 13px;
		border-radius: 4px;
		user-select: none;
		border: 0;
	}

	.button:hover {
		text-decoration: none;
	}

	.button.block {
		display: block;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.button.primary {
		color: #fff;
		background: #536dfe;
	}

	.button.primary:hover {
		background-color: #3d5afe;
	}
</style>