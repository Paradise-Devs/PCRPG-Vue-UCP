import Vue from 'vue'
import Router from 'vue-router'

// views
import IndexView from '@/pages/Index'
import PatchnotesView from '@/pages/Patchnotes'
import DevelopmentView from '@/pages/Development'
import NotFoundView from '@/pages/errors/404'

Vue.use(Router)

// routes
export default new Router({
	mode: 'history',
	routes: [
		{ path: '/', 			name: 'Index', 			component: IndexView },
		{ path: '/patchnotes', 	name: 'Patchnotes', 	component: PatchnotesView },
		{ path: '/dev', 		name: 'Development', 	component: DevelopmentView },
		{ path: '*', 			name: '404', 			component: NotFoundView },
	]
})