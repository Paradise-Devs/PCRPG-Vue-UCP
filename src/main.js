// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'

// dependencies
import VueBootstrap from 'bootstrap-vue'
import VueAnimated from 'animated-vue'
import VueWaypoint from 'vue-waypoint'
import VueScrollTo  from 'vue-scrollto'
import VueMoment from 'vue-moment'
import VueInfiniteScroll from 'vue-infinite-scroll'
import VuePaginate from 'vue-paginate'
import VeeValidate, { Validator } from 'vee-validate';
import ptbr from 'vee-validate/dist/locale/pt_BR';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Notifications from 'vue-notification'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome';

Validator.localize('pt_BR', ptbr);

Vue.router = router;

// registering apps
Vue.use(VueBootstrap);
Vue.use(VueAnimated);
Vue.use(VueWaypoint);
Vue.use(VueScrollTo);
Vue.use(VuePaginate);
Vue.use(VeeValidate);
Vue.use(VueAwesomeSwiper);
Vue.use(Notifications);

const locale = require('moment')
require('moment/locale/pt-br')
Vue.use(VueMoment, {
	locale
});

Vue.component('icon', FontAwesomeIcon);

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
	store,
	template: '<App/>',
	components: { App }
});
