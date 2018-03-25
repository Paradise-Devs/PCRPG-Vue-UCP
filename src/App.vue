<!--suppress ALL -->
<template>
	<div id="app">
		<div v-if="!fullyLoaded" class="loading">
			<div class="container">
				<spinner :loading="loading" color="#303846" size="90px"></spinner>
				<h2 v-if="!siteLoaded">Carregando site...</h2>
				<h2 v-if="siteLoaded && !dataLoaded">Carregando sua conta...</h2>
			</div>
		</div>
		<div v-else>
			<header>
				<navbar/>
				<hero/>
			</header>
			<router-view/>
			<appfooter/>
		</div>
	</div>
</template>

<script>
	import 'bootstrap/dist/css/bootstrap.css'
	import 'animate.css/animate.css'
	import { store } from '@/vuex/store'
	import spinner from 'vue-spinner/src/MoonLoader.vue';
	import axios from 'axios';

	import navbar from '@/components/global/Navbar'
	import hero from '@/components/global/Hero'
	import appfooter from '@/components/global/Footer'

	var forumAPI = 'http://forum.pc-rpg.com.br/api/users/';

	export default {
		data() {
			return {
				userdata: { },
				loading: true,
				siteLoaded: false,
				dataLoaded: false,
				fullyLoaded: false
			}
		},
		methods: {
			appLoaded: function() {
				var _this = this;
				this.userdata.token = localStorage.getItem("token");
				if(this.userdata.token != null) {
					new Promise((resolve) => {
						setTimeout(() => {
							axios.get(forumAPI + 'Los')
							.then(response => {
								this.userdata.attributes = response.data.data.attributes;
							})
						}, 2000)
					})

					new Promise((resolve) => {
						setTimeout(() => {
							store.dispatch('login', _this.userdata).then(() => {
								_this.dataLoaded = true;
								_this.fullyLoaded = true;
					 		})
						}, 4000)
					})
				} else {
					_this.dataLoaded = true;
					_this.fullyLoaded = true;
				}
			}
		},
		mounted() {
			var _this = this;

			setTimeout(function () {
				_this.appLoaded();
				_this.siteLoaded = true;
			}, 4000);
		},
		components: {
			'spinner': spinner,
			navbar,
			store,
			hero,
			appfooter
		}
	}
</script>

<style>
	@import 'https://fonts.googleapis.com/css?family=Barlow';
	@import "//fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,700,600";

	button:focus, input:focus, textarea:focus, a:focus { outline: none; }

	#app {
		font-family: Barlow;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #6c7d93;
		position: relative;
	}

	body {
		background: #14191f;
		color: #6c7d93;
		overflow-y: scroll;
		font-family: "Open Sans",Helvetica,Arial,sans-serif;
		font-size: 13px;
		line-height: 1.5;
	}

	.loading {
		width: 99vw;
		height: 99vh;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loading .container {
		height: 300px;
		position: relative;
		display: flex;
		justify-content: center !important;
	}

	.loading h2 {
		position: absolute;
		bottom: 0px;
		color: #6c7d93;
		align-self: center;
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

	p {
		margin: 0 0 10px;
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

	.block .block-header svg {
		margin-right: 5px;
		display: inline;
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
		text-align: center;
		min-height: 52px;
	}

	.block .block-footer a {
		text-decoration: none;

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
        margin-left: -50px;
        float: left;
        margin-top: 15px;
		position: relative;
    }

    .post .author .avatar {
        width: 36px;
        height: 36px;
        border-radius: 36px;
        font-size: 18px;
        line-height: 36px;
        display: inline-block;
        box-sizing: content-box;
        text-align: center;
        vertical-align: top;
        background-color: #1b2028;
        font-weight: normal;
		border-color: transparent;
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

	/* spinner */
	.v-spinner {
		width: 100%;
		margin-top: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* scrollbar */
	.block .block-content::-webkit-scrollbar-track {
		background-color: transparent;
        box-shadow: none;
	}

	.block .block-content::-webkit-scrollbar {
		background-color: transparent;
        width: 6px;
        right: -100px;
	}

	.block .block-content::-webkit-scrollbar-thumb {
		background-color: #1B2028;
        border: 0;
        padding: 2px;
	}

	/* modals */
	.modal.show .modal-dialog {
		max-width: 375px;
		margin: 120px auto;
	}

	.modal-content {
		position: relative;
		background-color: #14191f;
		background-clip: padding-box;
		margin: 0 auto;
		overflow: hidden;
		border: 0;
		border-radius: 4px;
		-webkit-box-shadow: 0 7px 15px rgba(0,0,0,0.5);
		box-shadow: 0 7px 15px rgba(0,0,0,0.5);
	}

	.modal-header {
		position: relative;
		text-align: center;
		border: 0;
		padding: 25px;
	}

	.modal-header .modal-title {
		font-size: 20px;
		font-weight: normal;
		margin: 0;
		color: #ddd;
		line-height: 1.3;
		font-family: "Open Sans",Helvetica,Arial,sans-serif;
		width: 100%;
	}

	.modal button.modalclose {
		position: absolute;
		right: 17px;
		top: -58px;
		background: transparent !important;
		vertical-align: middle;
		cursor: pointer;
		white-space: nowrap;
		line-height: 20px;
		display: inline-block;
		margin-bottom: 0;
		vertical-align: -1px;
		font-size: 14px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		color: #6c7d93;
		text-shadow: none;
		border: none;
	}

	.modal button.modalclose:hover {
		background: transparent !important;
		color: #526cff;
	}

	.modal .modal-body {
		background-color: #1b2028;
		padding: 25px 30px;
		color: #6c7d93;
	}

	.modal .form-control {
		background-color: #14191f;
		color: #ddd;
	}

	.modal .form-control:focus {
		background-color: #14191f;
		color: #ddd;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
	}

	.modal .modal-footer {
		border: 0;
		text-align: center;
		color: #6c7d93;
		background-color: #14191f;;
		padding: 20px;
		margin: 25px -30px -25px;
		display: block;
		font-family: "Open Sans",Helvetica,Arial,sans-serif;
	}

	.modal .modal-footer p {
		width: 100%;
	}

	.modal .modal-footer > :not(:first-child) {
		margin: 0 0 10px;
	}

	.modal .modal-alert {
		min-height: 43px;
	}

	.modal .alert {
		font-family: "Open Sans",Helvetica,Arial,sans-serif;
		font-size: 13px;
		text-align: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		-webkit-border-radius: 0;
		-moz-border-radius: 0;
		border-radius: 0;
	}

	/* forms */
	input:focus, textarea:focus, select:focus {
		outline-offset: -2px;
	}

	input, button, select, textarea {
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
	}
	.form-centered {
		text-align: center;
	}

	.form-centered .b-form-group {
		margin-bottom: 12px;
		position: relative;
	}

	.form-centered .form-control[type=text],
	.form-centered .form-control[type=email],
	.form-centered .form-control[type=password],
	.form-centered .btn {
		margin: 0 auto;
		text-align: center;
		height: 50px;
		padding: 15px 20px;
		font-size: 15px;
	}

	.checkbox input[type=checkbox], .checkbox input[type=radio] {
		margin-left: -20px;
		margin-top: 2px;
		float: left;
	}

	input[type="checkbox"], input[type="radio"] {
		box-sizing: border-box;
		padding: 0;
	}

	.form-centered .checkbox {
		text-align: left;
	}

	.checkbox {
		display: block;
		padding-left: 20px;
		margin-bottom: 5px;
		font-size: 13px;
		font-family: "Open Sans",Helvetica,Arial,sans-serif;
		cursor: pointer;
	}

	.form-control {
		display: block;
		width: 100%;
		height: 36px;
		padding: 8px 13px;
		font-size: 13px;
		line-height: 1.5;
		color: #6c7d93;
		background-color: #1b2028;
		border: 0;
		border-color: transparent;
		border-radius: 4px;
		-webkit-transition: border-color .15s, background .15s;
		-o-transition: border-color .15s, background .15s;
		transition: border-color .15s, background .15s;
		-webkit-appearance: none;
		font-family: "Open Sans",Helvetica,Arial,sans-serif;
	}

	.form-control::placeholder {
		font-size: 15px;
		color: #6c7d93;
		font-family: "Open Sans",Helvetica,Arial,sans-serif;
	}

	.form-control:focus {
		background-color: #14191f;
		color: #ddd;
		border: 2px solid #536dfe;
		outline: none;
	}

	.form-control.disabled, .form-control[disabled],
	.form-control[readonly], fieldset[disabled] .form-control {
		cursor: default;
		opacity: 0.5;
	}

	.form-group:last-child {
		margin-bottom: 0 !important;
	}

	.was-validated .form-control:valid,
	.form-control.is-valid,
	.was-validated .custom-select:valid,
	.custom-select.is-valid {
		border: 2px solid #00e676;
		outline: none;
	}

	.was-validated .form-control:invalid,
	.form-control.is-invalid,
	.was-validated .custom-select:invalid,
	.custom-select.is-invalid {
		border: 2px solid #dc3545;
		color: #dc3545;
		outline: none;
	}

	/* buttons */
	.btn {
		display: inline-block;
		margin-bottom: 0;
		text-align: center;
		vertical-align: middle;
		cursor: pointer;
		white-space: nowrap;
		line-height: 20px;
		padding: 8px 13px;
		border-radius: 4px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		color: #6c7d93;
		background-color: #1b2028;
		border: 0;
		font-family: "Open Sans",Helvetica,Arial,sans-serif;
		font-size: inherit;
		position: relative;
	}

	.btn:hover {
		color: #14191f;
		text-decoration: none;
	}

	.btn-primary:not([disabled]):not(.disabled):hover {
		background-color: #3a57fe;
	}

	.btn-primary:not([disabled]):not(.disabled):active,
	.btn-primary:not([disabled]):not(.disabled).active,
	.show > .btn-primary.dropdown-toggle {
		background-color: #2042fe;
		-webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
		box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
		outline: none;
		border-color: transparent;
		color: #14191f;
	}

	.btn-block {
		display: block;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.btn-primary {
		color: #14191f;
		background-color: #536dfe;
		font-weight: bold;
		padding-left: 20px;
		padding-right: 20px;
	}

	.btn.disabled, .btn[disabled],
	fieldset[disabled] .btn {
		cursor: default;
		opacity: 0.65;
		box-shadow: none;
	}

	.btn-primary.disabled,
	.btn-primary[disabled],
	fieldset[disabled] .btn-primary {
		background-color: #536dfe;
	}

	/* alerts */
	.alert {
		border-radius: 4px;
		padding: 12px 16px;
		line-height: 1.5;
		border: none;
	}

	.alert-danger {
		background: #d83e3e;
		color: #fff;
	}
</style>
