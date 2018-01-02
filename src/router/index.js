import Vue from 'vue'
import Router from 'vue-router'

// views
import IndexView from '@/pages/Index'
import BlogView from '@/pages/Blog'
import PatchnotesView from '@/pages/Patchnotes'
import CommitsView from '@/pages/Commits'
import RoadmapView from '@/pages/Roadmap'

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
		},
		{
			path: '/roadmap',
			name: 'Roadmap',
			component: RoadmapView
		}
	]
})
