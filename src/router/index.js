import Vue from 'vue'
import Router from 'vue-router'

// views
import IndexView from '@/pages/Index'
import DevelopmentView from '@/pages/Development'
import NotFoundView from '@/pages/errors/404'
import UserProfileView from '@/pages/Profile'

//UCP
import UcpView from '@/pages/ucp/model'
import UcpIndexView from '@/pages/ucp/index'
import UcpSettingsView from '@/pages/ucp/settings'
import UcpProfileView from '@/pages/ucp/profile'

//messaging
import UcpMessagesView from '@/pages/ucp/messaging/model'
import UcpMessagesIndexView from '@/pages/ucp/messaging/index'
import UcpMessageDetailsView from '@/pages/ucp/messaging/message'
import UcpNewMessageView from '@/pages/ucp/messaging/new'
import UcpReplyMessageView from '@/pages/ucp/messaging/reply'

Vue.use(Router);

// routes
export default new Router({
	routes: [
		{ path: '/', name: 'Início', component: IndexView },
		{ path: '/dev', name: 'Desenvolvimento', component: DevelopmentView },
		{
			path: '/ucp', name: 'UCP', component: UcpView,
			children: [
				{ path: '', name: 'Início', component: UcpIndexView },
				{ path: 'configuracoes', name: 'Configurações', component: UcpSettingsView },
				{
					path: 'mensagens', name: 'Mensagens', component: UcpMessagesView,
					children: [
						{ path: '', name: 'Mensagens', component: UcpMessagesIndexView },
						{ path: 'ver/:msgid', name: 'Mensagens', component: UcpMessageDetailsView },
						{ path: 'nova', name: 'Mensagens', component: UcpNewMessageView },
						{ path: 'responder/:msgid', name: 'Mensagens', component: UcpReplyMessageView },
					]
				},
				{ path: 'perfil', name: 'Perfil', component: UcpProfileView },
			]
		},
		{ path: '/jogador/:username', name: 'Perfil', component: UserProfileView },
		{ path: '*', component: NotFoundView },
	]
})
