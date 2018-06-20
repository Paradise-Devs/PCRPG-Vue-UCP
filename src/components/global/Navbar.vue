<!--suppress ALL -->
<template>
    <div class="nav">
        <animated-fade-in>
            <nav id="navbar" class="navbar">
                <b-container>
                    <b-row>
                        <b-col>
                            <router-link to="/" class="navbar__logo">
                                <img src="./logo-text.png" alt="PC:RPG">
                            </router-link>
                        </b-col>
                        <b-col md="8" class="navbar__menu navbar__menu--desk">
                            <router-link to="/">Início</router-link>
                            <router-link to="/dev">Desenvolvimento</router-link>
                            <a href="https://forum.pc-rpg.com.br">Fórum</a>
                            <separator/>
							<div v-if="!userLoggedIn">
								<a href="#" v-b-modal.signupModal>Cadastre-se</a>
								<a href="#" v-b-modal.signinModal>Entrar</a>
							</div>
							<div class="navbar__menu__user" v-else>
								<b-dropdown no-caret right class="messages__dropdown">
									<template slot="button-content">
										<icon :icon="['fas', 'comment-alt']" :class="{ 'active': messagesNotReaded.length > 0 }"/>
										<span v-if="messagesNotReaded.length > 0" class="number">{{ messagesNotReaded.length }}</span>
									</template>
									<msg-notification v-for="message in sortedMessages" :key="message._id" :msg="message"/>
									<div v-if="messagesNotReaded.length == 0" class="dropdown-item empty">
										Não há mensagens não lidas
									</div>
									<b-dropdown-item to="/ucp/mensagens" exact class="all">Ver todas as mensagens...</b-dropdown-item>
								</b-dropdown>
								<b-dropdown no-caret right class="profile">
									<template slot="button-content">
										<img class="navbar__menu__user__info__avatar" :src="user.forumAtt.attributes.avatarUrl" v-if="user.forumAtt.attributes.avatarUrl != null" />
										<div class="navbar__menu__user__info__avatar--empty" v-else> ? </div>
										<span class="Button-label">{{ user.forumAtt.attributes.username }}</span>
									</template>
									<b-dropdown-item to="/ucp" exact><icon :icon="['fas', 'wrench']" />Painel do usuário</b-dropdown-item>
									<b-dropdown-item :to="'/jogador/' + user.username" exact><icon :icon="['fas', 'address-card']" /> Perfil</b-dropdown-item>
									<b-dropdown-item to="/ucp/configuracoes" exact><icon :icon="['fas', 'cog']" /> Configurações</b-dropdown-item>
									<b-dropdown-divider/>
									<b-dropdown-item @click="logout"><icon :icon="['fas', 'sign-out-alt']" /> Sair</b-dropdown-item>
								</b-dropdown>
							</div>
                        </b-col>
                    </b-row>
                </b-container>
            </nav>
        </animated-fade-in>
        <spacefix/>
		<signin v-if="!userLoggedIn" />
		<signup v-if="!userLoggedIn"/>
		<overlay />
		<div class="nav__menu--mobile nav__menu--mobile--closed" id="toggleMobNav">
			<div class="navbar__menu__button">
				<icon :icon="['fas', 'bars']" class="navbar__menu__icon navbar__menu__icon--open"  id="openNav" @click="openMobNav"/>
				<icon :icon="['fas', 'times']" class="navbar__menu__icon navbar__menu__icon--hidden navbar__menu__icon--close" id="closeNav" @click="closeMobNav()"/>
			</div>
		</div>
		<div class="nav__mobile__menu" id="navMenu">
			<div class="nav__mobile__menu__signin" v-if="!userLoggedIn">
				<a href="#" v-b-modal.signupModal @click="closeMobNav">Cadastre-se</a>
				<span>ou</span>
				<a href="#" v-b-modal.signinModal @click="closeMobNav">Entre</a>
			</div>
			<div class="nav__mobile__menu__user" v-else>
				<div class="nav__mobile__menu__user__info__avatar">
					<img :src="user.forumAtt.attributes.avatarUrl" v-if="user.forumAtt.attributes.avatarUrl != null" />
					<div class="nav__mobile__menu__user__info__avatar--empty" v-else> ? </div>
				</div>
				<div class="nav__mobile__menu__user__info__name">
					Olá, {{ user.forumAtt.attributes.username }}!
				</div>
				<div class="nav__mobile__menu__user__info__tags">
					<b-badge 
						v-for="group in user.groups"
						:key="group.id"
						:style="{ borderColor: group.color }"
					>
						<span class="icon" :style="{ backgroundColor: group.color }"> 
							<icon :icon="['fas', group.icon]" />
						</span>
						<span :style="{ color: group.color }">{{ group.nameSingular}}</span>
					</b-badge>
            	</div>
			</div>
			<div class="nav__mobile__menu__links">
				<h6 class="separator separator--general">Navegação geral</h6>
				<router-link to="/" @click="closeMobNav"><icon :icon="['fas', 'home']"/>Início</router-link>
				<router-link to="/dev"><icon :icon="['fas', 'code']"/>Desenvolvimento</router-link>
				<a href="https://forum.pc-rpg.com.br"><icon :icon="['fas', 'comments']"/>Fórum</a>
				<div class="nav__mobile__menu__links__user" v-if="userLoggedIn">
					<h6 class="separator">Sua conta</h6>
					<router-link to="/ucp" @click="closeMobNav" exact><icon :icon="['fas', 'wrench']"/>Painel do usuário</router-link>
					<router-link to="/ucp/perfil" @click="closeMobNav" exact><icon :icon="['fas', 'address-card']"/>Seu perfil</router-link>
					<router-link to="/ucp/configuracoes" @click="closeMobNav" exact><icon :icon="['fas', 'cog']"/>Configurações</router-link>
					<a href="#" @click="logout"><icon :icon="['fas', 'sign-out-alt']"/>Sair</a>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
    import Vue from 'vue';
	import { store } from '@/vuex/store';

	import signin from '@/components/auth/SignIn';
	import signup from '@/components/auth/SignUp';
	import msgNotification from '@/components/messaging/notification';

	import MessagingService from '@/services/messaging'

	import { bell, addressCard, cog, signOutAlt, bars, times, home, code, comments, wrench, commentAlt } from '@fortawesome/fontawesome-free-solid';
import { setTimeout, setInterval } from 'timers';

	export default {
        data: () => {
            return {
				user: store.state.user,
				groups: [ ],
				messagesNotReaded: [ ],
				userLoggedIn: null,
				scrolled: false,
				value: 500,
				maxValue: 5000,
				navOpened: false
            }
		},
		computed: {
			sortedMessages: function() {
                return this.messagesNotReaded.sort((a, b) => new Date(b.sendDate).getTime() - new Date(a.sendDate).getTime());
            },
		},
        methods: {
            handleScroll: function () {
                var scrollpos = window.scrollY;
                var navbar = document.getElementById("navbar");
                if(scrollpos > 10) {
                    navbar.classList.add('navbar--scrolled');
                    this.scrolled = true;
                } else {
                    navbar.classList.remove('navbar--scrolled');
                    this.scrolled = false;
                }
            },
			logout: function () {
				store.dispatch('logout').then(() => {
					this.user = store.state.user;
					this.$router.push(this.$route.query.redirect || '/');
					this.userLoggedIn = false;
					var navOverlay = document.getElementById("navOverlay");
					navOverlay.style.display = 'none';
					
					if(window.innerWidth < 768) {
						this.closeMobNav();
					}
				})
			},
			openMobNav: function () {
				var navbar = document.getElementById("navbar");
				var navToggleButton = document.getElementById("toggleMobNav");
				var navOpenIcon = document.getElementById("openNav");
				var navCloseIcon = document.getElementById("closeNav");
				var navOverlay = document.getElementById("navOverlay");
				var navMenu = document.getElementById("navMenu");
				var body = document.getElementsByTagName("body")[0];

				setTimeout(() => {
					navOverlay.style.display = '';
				}, 100)

				setTimeout(() => {
					navOverlay.classList.add('navbar__overlay--opened');
				}, 200)

				navbar.classList.add('navbar__mobile--opened');
				navbar.classList.remove('navbar__mobile--closed');
				navCloseIcon.classList.remove('navbar__menu__icon--hidden');
				navOpenIcon.classList.add('navbar__menu__icon--hidden');
				navToggleButton.classList.remove('nav__menu--mobile--closed');
				navToggleButton.classList.add('nav__menu--mobile--opened');
				
				navMenu.classList.remove('nav__mobile__menu--closed');
				navMenu.classList.add('nav__mobile__menu--opened');
				body.classList.add('locked');

				this.fadeIn(navCloseIcon);
				this.navOpened = true;
			},
			closeMobNav: function () {
				var navToggleButton = document.getElementById("toggleMobNav");
				var navOpenIcon = document.getElementById("openNav");
				var navCloseIcon = document.getElementById("closeNav");
				var navOverlay = document.getElementById("navOverlay");
				var body = document.getElementsByTagName("body")[0];

				setTimeout(() => {
					navOverlay.classList.remove('navbar__overlay--opened');
				}, 100)

				setTimeout(() => {
					navOverlay.style.display = 'none';
				}, 600)

				navCloseIcon.classList.add('navbar__menu__icon--hidden');
				navOpenIcon.classList.remove('navbar__menu__icon--hidden');
				navToggleButton.classList.remove('nav__menu--mobile--opened');
				navToggleButton.classList.add('nav__menu--mobile--closed');
				navMenu.classList.remove('nav__mobile__menu--opened');
				navMenu.classList.add('nav__mobile__menu--closed');
				body.classList.remove('locked');

				this.fadeIn(navOpenIcon);
				this.navOpened = false;
			},
			fadeIn: function (el) {
				el.style.opacity = 0;

				var last = +new Date();
				var tick = function() {
					el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
					last = +new Date();

					if (+el.style.opacity < 1) {
						(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
					}
				};

				tick();
			},
			getUserUnreadedMessages: function() {
				let oldLeng = this.messagesNotReaded.length;

				MessagingService.getMessagesTo(this.user.username)
				.then(res => {
					if(oldLeng != res.data.length) {
						this.messagesNotReaded = [];
						for(let i in res.data) {
							if(!res.data[i].isRead) {
								this.messagesNotReaded.push(res.data[i]);
							}
						}

						if(oldLeng < res.data.length) {
							let lastestMessage = this.messagesNotReaded.slice(-1).pop();
							let lastestNotification = localStorage.getItem('lastestNotification');

							if(lastestNotification != lastestMessage._id && lastestNotification != null) {
								this.$notify({
									group: 'main',
									title: 'Você recebeu uma nova mensagem!',
									text: '<b>' + lastestMessage.sender.username + '</b> te enviou uma mensagem.',
									type: 'info',
									duration: 8000
								});
							}
							
							localStorage.setItem('lastestNotification', lastestMessage._id);
						}
					}
				})
			}
        },
		watch:{
			$route (to, from){
				this.getUserUnreadedMessages();
				if(window.innerWidth < 768 && this.navOpened) {
					this.closeMobNav();
				}
			},
			user: {
				handler: function(val, oldVal) {
					if(this.user.token == null) {
						this.userLoggedIn = false;
					} else {
						this.userLoggedIn = true;
					}
				}, deep: true
			}
		},
		mounted() {
			var navOverlay = document.getElementById("navOverlay");
			navOverlay.style.display = 'none';

			this.$root.$on('initNavLoading', () => {
				this.isFixed = false
				this.isShow = 'none'
			})
			
			var closenav = document.getElementById('closeNav');
			closenav.classList.add('navbar__menu__icon--hidden');

			if(this.user.token == null) {
				this.userLoggedIn = false;
			} else {
				this.userLoggedIn = true;
			}

			if(this.userLoggedIn) { this.getUserUnreadedMessages(); }

			let e = this;
			this.$root.$on('refreshNotReadedMessages', function() {
				let messagesDropdown = document.getElementsByClassName('show');
				console.log(messagesDropdown);
				for(let i = 0; i < messagesDropdown.length; i++) {
					messagesDropdown[i].classList.remove('show');
				}
				e.getUserUnreadedMessages();
			});

			this.$root.$on('logout', function() {
				store.dispatch('logout').then(() => {
					e.user = store.state.user;
					e.$router.push(this.$route.query.redirect || '/');
					e.userLoggedIn = false;
					var navOverlay = document.getElementById("navOverlay");
					navOverlay.style.display = 'none';
					
					if(window.innerWidth < 768) {
						e.closeMobNav();
					}
				})
			});

			setInterval(function() {
				console.log('chamou');
				e.getUserUnreadedMessages();
			}, 5000);
		},
        created() {
            window.addEventListener('scroll', this.handleScroll);

			store.watch(
				(state)=>{
					return store.getters.getUserData
				},
				(oldValue, newValue)=>{
					this.user = store.state.user;
				}
			)
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll);
        },
		components: {
			signin, signup, store, msgNotification
		}
	}

    Vue.component('separator', {
        template: '<div class="navbar__separator"></div>'
    });

    Vue.component('spacefix', {
        template: '<div class="navbar__clearfix"></div>'
	});
	
	Vue.component('overlay', {
        template: '<div class="navbar__overlay" id="navOverlay"></div>'
    });
</script>