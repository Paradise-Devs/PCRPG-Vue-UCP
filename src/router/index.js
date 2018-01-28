import Vue from 'vue'
import Router from 'vue-router'

// views
import IndexView from '@/pages/Index'
import PatchnotesView from '@/pages/Patchnotes'
import DevelopmentView from '@/pages/Development'
import NotFoundView from '@/pages/errors/404'

//User profile
import User from '@/pages/userProfile/Index'
import UserHome from '@/pages/userProfile/Home'

Vue.use(Router);

// routes
export default new Router({
	mode: 'history',
	cors: true,
	routes: [
		{ 	path: '/', 						component: IndexView },
		{ 	path: '/patchnotes', 			component: PatchnotesView },
		{ 	path: '/dev', 					component: DevelopmentView },
		{ 	path: '/jogador/:username', 	component: User ,
			children: [
				{ path: '',			component: UserHome },
		  	]
		},
		//{ 	path: '/grupo/:groupname', 		component: GroupView },
		{ 	path: '*', 						component: NotFoundView },
	]
})
