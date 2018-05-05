import Vue from 'vue'
import Router from 'vue-router'

// views
import IndexView from '@/pages/Index'
import DevelopmentView from '@/pages/Development'
import NotFoundView from '@/pages/errors/404'
//import UserProfileView from '@/pages/Profile'

//UCP
import UcpView from '@/pages/ucp/auth'
import UcpIndexView from '@/pages/ucp/index'
import UcpSettingsView from '@/pages/ucp/settings'
import UcpProfileView from '@/pages/ucp/profile'
import UcpMessagesView from '@/pages/ucp/messages'

Vue.use(Router);

// routes
export default new Router({
	mode: 'history',
	cors: true,
	routes: [
		{ 	path: '/', 						component: IndexView },
		{ 	path: '/dev', 					component: DevelopmentView },
		{ 	path: '/ucp', 					component: UcpView,
			children: [
				{ 	path: '', 				name: 'Início', 		component: UcpIndexView },
				{ 	path: 'configuracoes', 	name: 'Configurações', 	component: UcpSettingsView },
				//{ 	path: 'mensagens', 		name: 'Mensagens', 	component: UcpMessagesView },
				{ 	path: 'perfil', 		name: 'Perfil', 		component: UcpProfileView },
			]
		},
		//{ 	path: '/jogador/:username', 	component: UserProfileView },
		{ 	path: '*', 						component: NotFoundView },
	]
})
