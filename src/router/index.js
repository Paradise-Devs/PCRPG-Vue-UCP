import Vue from 'vue'
import Router from 'vue-router'

// views
import IndexView from '@/pages/Index'
import DevelopmentView from '@/pages/Development'
import NotFoundView from '@/pages/errors/404'

//UCP
import UcpView from '@/pages/ucp/index'
import UcpSettingsView from '@/pages/ucp/settings'
import UserProfileView from '@/pages/ucp/profile'

Vue.use(Router);

// routes
export default new Router({
	mode: 'history',
	cors: true,
	routes: [
		{ 	path: '/', 						component: IndexView },
		{ 	path: '/dev', 					component: DevelopmentView },
		{ 	path: '/ucp', 					component: UcpView },
		{ 	path: '/ucp/configuracoes', 	component: UcpSettingsView },
		{ 	path: '/jogador/:username', 	component: UserProfileView },
		//{ 	path: '/grupo/:groupname', 		component: GroupView },
		{ 	path: '*', 						component: NotFoundView },
	]
})
