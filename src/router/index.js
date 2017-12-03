import Vue from 'vue'
import Router from 'vue-router'

// dependencies
import Icon from 'vue-awesome/components/Icon'
import BootstrapVue from 'bootstrap-vue'
import AnimatedVue from 'animated-vue'
import VueWaypoint from 'vue-waypoint'

// views
import IndexView from '@/pages/Index'
import BlogView from '@/pages/Blog'
import PatchnotesView from '@/pages/Patchnotes'
import CommitsView from '@/pages/Commits'

// registering apps
Vue.use(Router)
Vue.use(BootstrapVue)
Vue.use(AnimatedVue)
Vue.use(VueWaypoint)

// registering components
Vue.component('icon', Icon)

// routes
export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Index',
			component: IndexView
		},
		{
			path: '/blog',
			name: 'Blog',
			component: BlogView
		},
		{
			path: '/patchnotes',
			name: 'Patchnotes',
			component: PatchnotesView
		},
		{
			path: '/commits',
			name: 'Commits',
			component: CommitsView
		}
	]
})
