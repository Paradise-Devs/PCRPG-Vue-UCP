import Vue from 'vue'
import Router from 'vue-router'

// views
import IndexView from '@/pages/Index'
import DevelopmentView from '@/pages/Development'
import NotFoundView from '@/pages/errors/404'
import UserProfileView from '@/pages/Profile'

//UCP
import UcpView from '@/pages/ucp/auth'
import UcpIndexView from '@/pages/ucp/index'
import UcpSettingsView from '@/pages/ucp/settings'
import UcpProfileView from '@/pages/ucp/profile'

//messaging
import UcpMessagesView from '@/pages/ucp/messaging/model'
import UcpMessagesIndexView from '@/pages/ucp/messaging/index'
import UcpMessageDetailsView from '@/pages/ucp/messaging/message'
import UcpNewMessageView from '@/pages/ucp/messaging/new'

Vue.use(Router);

// routes
export default new Router({
	routes: [
		{ 	path: '/', 									component: IndexView },
		{ 	path: '/dev', 								component: DevelopmentView },
		{ 	path: '/ucp', 								component: UcpView,
			children: [
				{ 	path: '', 							component: UcpIndexView },
				{ 	path: 'configuracoes', 				component: UcpSettingsView },
				{ 	path: 'mensagens', 					component: UcpMessagesView,
					children: [
						{ 	path: '', 					component: UcpMessagesIndexView },
						{ 	path: ':msgid', 		component: UcpMessageDetailsView },
						{ 	path: 'nova', 				component: UcpNewMessageView },
					]
				},
				{ 	path: 'perfil', 					component: UcpProfileView },
			]
		},
		{ 	path: '/jogador/:username', 				component: UserProfileView },
		{ 	path: '*', 									component: NotFoundView },
	]
})
