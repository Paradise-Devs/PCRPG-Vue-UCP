// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// dependencies
import BootstrapVue from 'bootstrap-vue'
import AnimatedVue from 'animated-vue'
import VueWaypoint from 'vue-waypoint'
import VueScrollTo  from 'vue-scrollto'
import anime from 'animejs'
import Icon from 'vue-awesome/components/Icon'

// registering apps
Vue.use(BootstrapVue)
Vue.use(AnimatedVue)
Vue.use(VueWaypoint)
Vue.use(VueScrollTo)

Vue.component('icon', Icon)

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})

Vue.use(VueScrollTo, {
	container: "body",
	duration: 500,
	easing: "ease",
	offset: -100,
	cancelable: true,
	onDone: false,
	onCancel: false,
	x: false,
	y: true
})