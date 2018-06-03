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
								<b-dropdown no-caret right class="navbar__menu__user__info">
									<template slot="button-content">
										<img class="navbar__menu__user__info__avatar" :src="user.forumAtt.attributes.avatarUrl" v-if="user.forumAtt.attributes.avatarUrl != null" />
										<div class="navbar__menu__user__info__avatar--empty" v-else> ? </div>
										<span class="Button-label">{{ user.forumAtt.attributes.username }}</span>
									</template>
									<b-dropdown-item to="/ucp" exact><fa :icon="['fas', 'wrench']" />Painel do usuário</b-dropdown-item>
									<b-dropdown-item :to="'/jogador/' + user.username" exact><fa :icon="['fas', 'address-card']" /> Perfil</b-dropdown-item>
									<b-dropdown-item to="/ucp/configuracoes" exact><fa :icon="['fas', 'cog']" /> Configurações</b-dropdown-item>
									<b-dropdown-divider/>
									<b-dropdown-item @click="logout"><fa :icon="['fas', 'sign-out-alt']" /> Sair</b-dropdown-item>
								</b-dropdown>
							</div>
                        </b-col>
                    </b-row>
                </b-container>
            </nav>
        </animated-fade-in>
        <spacefix/>
        <a href="#" v-scroll-to="'#app'" id="toTop" :style="{ display: scrolled }">
			<icon name="angle-up"/>
            <span class="screen-reader-text">Voltar ao topo</span>
        </a>
		<signin v-if="!userLoggedIn" />
		<signup v-if="!userLoggedIn"/>
		<overlay />
		<div class="nav__menu--mobile nav__menu--mobile--closed" id="toggleMobNav">
			<div class="navbar__menu__button">
				<fa :icon="['fas', 'bars']" class="navbar__menu__icon navbar__menu__icon--open"  id="openNav" @click="openMobNav"/>
				<fa :icon="['fas', 'times']" class="navbar__menu__icon navbar__menu__icon--hidden navbar__menu__icon--close" id="closeNav" @click="closeMobNav()"/>
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
							<fa :icon="['fas', group.icon]" />
						</span>
						<span :style="{ color: group.color }">{{ group.nameSingular}}</span>
					</b-badge>
            	</div>
			</div>
			<div class="nav__mobile__menu__links">
				<h6 class="separator separator--general">Navegação geral</h6>
				<router-link to="/" @click="closeMobNav"><fa :icon="['fas', 'home']"/>Início</router-link>
				<router-link to="/dev"><fa :icon="['fas', 'code']"/>Desenvolvimento</router-link>
				<a href="https://forum.pc-rpg.com.br"><fa :icon="['fas', 'comments']"/>Fórum</a>
				<div class="nav__mobile__menu__links__user" v-if="userLoggedIn">
					<h6 class="separator">Sua conta</h6>
					<router-link to="/ucp" @click="closeMobNav" exact><fa :icon="['fas', 'wrench']"/>Painel do usuário</router-link>
					<router-link to="/ucp/perfil" @click="closeMobNav" exact><fa :icon="['fas', 'address-card']"/>Seu perfil</router-link>
					<router-link to="/ucp/configuracoes" @click="closeMobNav" exact><fa :icon="['fas', 'cog']"/>Configurações</router-link>
					<a href="#" @click="logout"><fa :icon="['fas', 'sign-out-alt']"/>Sair</a>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import 'vue-awesome/icons/angle-up';
	import { store } from '@/vuex/store';

	import signin from '@/components/auth/SignIn';
	import signup from '@/components/auth/SignUp';

	import fontawesome from '@fortawesome/vue-fontawesome';
	import { bell, addressCard, cog, signOutAlt, bars, times, home, code, comments, wrench } from '@fortawesome/fontawesome-free-solid';

	export default {
        data: () => {
            return {
				user: store.state.user,
				groups: [ ],
				userLoggedIn: null,
				scrolled: false,
				value: 500,
				maxValue: 5000,
				navOpened: false
            }
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
			}
        },
		watch:{
			$route (to, from){
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

			this.$root.$on('logout', function() {
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
			});
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
			signin, signup, store,
			'fa': fontawesome,
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