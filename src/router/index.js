import Vue from 'vue'
import Router from 'vue-router'

// views
import IndexView from '@/pages/Index'
import DevelopmentView from '@/pages/Development'
import NotFoundView from '@/pages/errors/404'

//User profile
import UserProfileView from '@/pages/userProfile/Index'

Vue.use(Router);

// routes
export default new Router({
	mode: 'history',
	cors: true,
	routes: [
		{ 	path: '/', 						component: IndexView },
		{ 	path: '/dev', 					component: DevelopmentView },
		{ 	path: '/jogador/:username', 	component: UserProfileView },
		//{ 	path: '/grupo/:groupname', 		component: GroupView },
		{ 	path: '*', 						component: NotFoundView },
	]
})
