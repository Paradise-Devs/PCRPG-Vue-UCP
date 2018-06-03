<!--suppress ALL -->
<template>
	<b-container class="page__ucp--index">
		<firsttime v-if="firstTime"/>
		<b-row v-else class="ucp">
			<b-col md="8" sm="12" class="ucp__column--left">
				<b-row>
					<b-col md="12" class="ucp__block ucp__block--profile">
						<h4 class="ucp__block__desc ucp__block--profile__desc">Seu perfil</h4>
						<div class="ucp__block__content">
							<userAvatar :user="user" :editable="true" />
							<userContent :user="user" />
							<router-link to="/ucp/perfil" exact class="btn btn-primary">Ver perfil completo</router-link>
						</div>
					</b-col>
					<div class="ucp__divider">
						<h3 class="ucp__divider__title">Seus personagens</h3>
					</div>
					<b-col md="12" class="ucp__block__character">
						<swiper :options="swiperOption" class="ucp__block__character-swiper" v-if="chars.length > 1">
							<swiper-slide v-for="char in chars" :key="char.id" class="char__wrapper--item">
								<b-col 
									md="12" 
									offset-md="1" 
									class="ucp__block"
								>
									<span class="character__id">ID {{ char.player_id }}</span>
									<div class="character__level">
										<span class="label">{{ char.level }}</span>
									</div>
									<div class="character__info">
										<h4 class="title">{{ char.name }}</h4>
										<h6 class="text">{{ char.job }}</h6>
										<h6 class="text">Última localização: {{ char.logoutArea }}</h6>
									</div>
									<div class="character__stats">
										<ul class="stats__list">
											<li class="item" :class="{'item--positive': char.cash > 0, 'item--negative': char.cash < 0}"><span class="icon"><fa :icon="['fas', 'dollar-sign']" /></span> {{ char.cash | money }}</li>
										</ul>
									</div>
									<div class="character__exp">
										<span class="character__exp__current">Próximo level {{ char.level + 1 }}</span>
										<span class="character__exp__needed">XP <b>{{ char.xp }}/{{ getNeededExp(char.level) }}</b></span>
										<b-progress :max="getNeededExp(char.level)">
											<b-progress-bar :value="char.xp">
												{{ getExpPercent(char.level, char.xp) }}%
											</b-progress-bar>
										</b-progress>
									</div>
								</b-col>
							</swiper-slide>
							<div class="ucp__block__character-swiper__pagination" slot="pagination"></div>
						</swiper>
						<b-col 
							md="12" 
							offset-md="1" 
							class="ucp__block ucp__block--empty"
							v-else-if="chars.length == 0"
						>
							<div class="char__icon">
								<font-awesome-layers>
									<fa :icon="['fas', 'street-view']"/>
                					<fa :icon="['fas', 'plus']" transform="shrink-12 right-5 up-9" />
								</font-awesome-layers>
							</div>
							<span class="char__text">Sem personagens</span>
						</b-col>
						<b-col 
							md="12" 
							offset-md="1" 
							class="ucp__block ucp__block--single"
							v-else-if="chars.length == 1"
							v-for="char in chars" :key="char.id"
						>
							<span class="character__id">ID {{ char.player_id }}</span>
							<div class="character__level">
								<span class="label">{{ char.level }}</span>
							</div>
							<div class="character__info">
								<h4 class="title">{{ char.name }}</h4>
								<h6 class="text">{{ char.job }}</h6>
								<h6 class="text">Última localização: {{ char.logoutArea }}</h6>
							</div>
							<div class="character__stats">
								<ul class="stats__list">
									<li class="item" :class="{'item--positive': char.cash > 0, 'item--negative': char.cash < 0}"><span class="icon"><fa :icon="['fas', 'dollar-sign']" /></span> {{ char.cash | money }}</li>
								</ul>
							</div>
							<div class="character__exp">
								<span class="character__exp__current">Próximo level {{ char.level + 1 }}</span>
								<span class="character__exp__needed">XP <b>{{ char.xp }}/{{ getNeededExp(char.level) }}</b></span>
								<b-progress :max="getNeededExp(char.level)">
									<b-progress-bar :value="char.xp">
										{{ getExpPercent(char.level, char.xp) }}%
									</b-progress-bar>
								</b-progress>
							</div>
						</b-col>
						<div class="ucp__block__character-swiper__arrow ucp__block__character-swiper__arrow--prev" v-if="chars.length > 1"><fa :icon="['fas', 'angle-left']" /></div>
    					<div class="ucp__block__character-swiper__arrow ucp__block__character-swiper__arrow--next" v-if="chars.length > 1"><fa :icon="['fas', 'angle-right']" /></div>
					</b-col>
				</b-row>
			</b-col>
			<b-col md="3" class="ucp__column--right">
				<b-row>
					<b-col 
						md="12"
						class="ucp__block ucp__block--punishment"
						:class="{
							'tempbanned': userActivatedStatus == 2,
							'permbanned': userActivatedStatus == 3,
						}"
						v-if="userActivatedStatus >= 2"
					>
						<h4 class="ucp__block__desc ucp__block--punishment__desc">Punição</h4>
						<ul class="ucp__block__content">
							<b>{{ this.user.forumAtt.attributes.username }}</b>, você possui uma punição ativa no momento. <br/>Veja maiores detalhes abaixo:
							<ul class="ucp__block--punishment__info">
								<li class="punishment__item">
									Administrador resp. 
									<span class="punishment__item__desc">
										<router-link :to="{ name: 'user', params: { username: punishment.admin}}"><b>{{ punishment.admin }}</b></router-link>
									</span>
								</li>
								<li class="punishment__item">Data <span class="punishment__item__desc">{{ punishment.date }}</span></li>
								<li class="punishment__item">Hora <span class="punishment__item__desc">{{ punishment.time }}</span></li>
								<li class="punishment__item">Motivo <span class="punishment__item__desc">{{ punishment.reason }}</span></li>
								<li class="punishment__item punishment__item--expires" v-if="userActivatedStatus == 2">
									Expira em
									<span class="punishment__item__desc">
										<span v-if="expireDays > 0">{{ expireDays | twoDigits }}d</span>
										<span v-if="expireHours > 0">{{ expireHours | twoDigits }}h</span>
										<span v-if="expireMinutes > 0">{{ expireMinutes | twoDigits }}m</span>
										{{ expireSeconds | twoDigits }}s
									</span>
								</li>
							</ul>
						</ul>
					</b-col>
					<b-col md="12" class="ucp__block ucp__block--account">
						<h4 class="ucp__block__desc">Sua conta</h4>
						<ul class="ucp__block__content">
							<li class="account__item">
								Status atual 
								<span 
									class="account__item__stats"
									:class="{ 
										'deactivated': userActivatedStatus == 0,
										'normal': userActivatedStatus == 1,
										'tempbanned': userActivatedStatus == 2,
										'permbanned': userActivatedStatus == 3,
									}"
								>
									{{ userActivatedStatus | userAccountStatusText }}
								</span>
							</li>
							<li class="account__item">Punições no histórico <span class="account__item__stats">0</span></li>
							<li class="account__item">Tempo total jogando <span class="account__item__stats">0h</span></li>
							<li class="account__item">Membro desde <span class="account__item__stats">{{ this.user.forumAtt.attributes.joinTime | normalDateFilter }}</span></li>
						</ul>
					</b-col>
					<b-col md="12" class="ucp__block">
						<h4 class="ucp__block__desc">Log administrativo</h4>
						<ul class="ucp__block__content">
							<li class="log__item">Não há logs disponíveis.</li>
						</ul>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import Vue from 'vue';
	import ServerService from '@/services/server';
	import moment from 'moment';
	import { store } from '@/vuex/store';
	import firsttime from '@/components/first-time/block';
	import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome';
	import { swiper, swiperSlide } from 'vue-awesome-swiper'

	import userAvatar from '@/components/user-profile/avatar';
	import userContent from '@/components/user-profile/content';

	import { code, bolt, support, briefcase, pencilAlt, angleLeft, angleRight, dollarSign } from '@fortawesome/fontawesome-free-solid';

	export default {
		//char data = player_id, firstName, lastName, position, property, cash, level, xp, gender [type, enum], pedModel, traits, logoutArea

		data() {
            return {
				user: store.state.user,
				avatarFile: null,
				firstTime: false,
				userActivatedStatus: null,
				punishment: [],

				counting: {
					now: Math.trunc((new Date()).getTime() / 1000),
					punishmentEnd: null,
				},

				swiperOption: {
                    slidesPerView: 1,
                    init: true,
                    variableWidth: false,
					navigation: {
						nextEl: '.ucp__block__character-swiper__arrow--next',
						prevEl: '.ucp__block__character-swiper__arrow--prev',
					},
                    pagination: {
                        el: '.ucp__block__character-swiper__pagination',
                    }
                }, 

				chars: [ ]
            }
        },
		watch: {
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
		filters: {
			userAccountStatusText: function(state) {
				let result;
				switch(state) {
					case 0:
						result = 'Desativada';
						break;
					case 1:
						result = 'Ativa';
						break;
					case 2:
						result = 'Banido Temp.';
						break;
					case 3:
						result = 'Banido Perm.';
				}

				return result;
			},
			normalDateFilter: function(date) {
				return moment(date).format('L');
			},
			twoDigits: function(value) {
				if (value.toString().length <= 1) {
					return '0' + value.toString()
				}
				return value.toString()
			},
			money: function(value) {
				return value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			}
		},
		computed: {
			calculatedExpireDate: function() {
				this.counting.punishmentEnd = Math.trunc(Date.parse(this.counting.punishmentEnd) / 1000);
				return this.counting.punishmentEnd;
			},
			expireSeconds: function() {
				return (this.calculatedExpireDate - this.counting.now) % 60;
			},
			expireMinutes: function() {
				return Math.trunc((this.calculatedExpireDate - this.counting.now) / 60) % 60;
			},
			expireHours: function() {
				return Math.trunc((this.calculatedExpireDate - this.counting.now) / 60 / 60) % 24;
			},
			expireDays: function() {
				return Math.trunc((this.calculatedExpireDate - this.counting.now) / 60 / 60 / 24);
			},
			firstTime: function() {
				var timeSave = localStorage.getItem('firstTimeUCP');
				if(timeSave === "true" || timeSave === null) {
					return true;
				} else {
					return false;
				}
			}
		},
		methods: {
			checkUserAccountStatus: function() {
				let userActivated;
				let suspendDate = this.user.forumAtt.attributes.suspendUntil;
				if(this.user.forumAtt.attributes.isActivated) {
					//ativado
					this.userActivatedStatus = 1;
					this.counting.punishmentEnd = this.user.forumAtt.attributes.suspendUntil;

					if(suspendDate) {
						if(this.expireDays <= 0 && this.expireHours <= 0 && this.expireMinutes <= 0 && this.expireMinutes <= 0 && this.expireSeconds <= 0) {
							this.userActivatedStatus = 1;
						} else {
							let expireDate = new Date(suspendDate);
							let today = new Date();
							let interval = today.getFullYear() - expireDate.getFullYear();

							if(interval < 0) {
								interval = interval * -1;
							}
							let tempBan = interval < 10 ? true : false;
							
							if(tempBan) {
								//banido temporariamente (menos de 10 anos de expiração do ban)
								this.userActivatedStatus = 2;
							} else {
								//banido forever (mais de 10 anos de ban)
								this.userActivatedStatus = 3;
							}
							this.getPunishmentData();
						}
					}
				} else {
					//desativado
					this.userActivatedStatus = 0;
				}
			},
			getPunishmentData: function() {
				let today = new Date();
				this.punishment.admin = 'Los';
				this.punishment.date = moment(today).format('L');
				this.punishment.time = moment(today).format('LT');
				this.punishment.reason = 'Drive-by';
			},
			getUserAvatar: function() {
				if(this.user.forumAtt.attributes.avatarUrl != null) {
					this.userAvatar = this.user.forumAtt.attributes.avatarUrl;
				}
			},
			getNeededExp: function(level) {
				return 8 + ((level-1)*4);
			},
			getExpPercent: function(level, currentXP) {
				let max = this.getNeededExp(level);
				let res = (currentXP / max) * 100;
				return res.toFixed();
			},
			getUserChars: function() {
				ServerService.getPlayerCharacters(this.user.username)
				.then(response => {
					this.chars = response.data;
				})
				.catch(error => {
					console.log(error);
				})
			}
		},
		mounted() {
			this.getUserAvatar();
			this.checkUserAccountStatus();
			this.getUserChars();

			store.watch(
				(state)=>{
					return store.getters.getUserData
				},
				(oldValue, newValue)=>{
					this.user = store.state.user;
				}
			)

			window.setInterval(() => {
				this.counting.now = Math.trunc((new Date()).getTime() / 1000);
			},1000);

			if(this.user.token == null) {
				this.userLoggedIn = false;
			} else {
				this.userLoggedIn = true;
			}

			var timeSave = localStorage.getItem('firstTimeUCP');
			if(timeSave === "true" || timeSave === null) {
				this.firstTime = true;
			} else {
				this.firstTime = false;
			}

			this.$root.$on('hideFirstTimeTut', (res) => {
				this.firstTime = res;
			});
		},
		components: {
			firsttime,
			userAvatar, userContent,
			'fa': FontAwesomeIcon,
			FontAwesomeLayers
		}
	}
</script>

<style lang="scss">
	@import '../../assets/sass/main.scss';
</style>