import Vue from 'vue'
import Router from 'vue-router'

// views
import IndexView from '@/pages/Index'
import PatchnotesView from '@/pages/Patchnotes'
import CommitsView from '@/pages/Commits'

Vue.use(Router)

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
