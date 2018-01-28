// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// dependencies
import VueBootstrap from 'bootstrap-vue'
import VueAnimated from 'animated-vue'
import VueWaypoint from 'vue-waypoint'
import VueScrollTo  from 'vue-scrollto'
import VueMoment from 'vue-moment'
import VueInfiniteScroll from 'vue-infinite-scroll'
import anime from 'animejs'
import Icon from 'vue-awesome/components/Icon'
import VuePaginate from 'vue-paginate'
import axios from 'axios'

Vue.router = router;

// registering apps
Vue.use(VueBootstrap);
Vue.use(VueAnimated);
Vue.use(VueWaypoint);
Vue.use(VueScrollTo);
Vue.use(VuePaginate);

const locale = require('moment')
require('moment/locale/pt-br')
Vue.use(VueMoment, {
	locale
});

Vue.component('icon', Icon)

Vue.config.productionTip = false

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
});

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
});
