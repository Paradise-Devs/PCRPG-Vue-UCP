<!--suppress ALL -->
<template>
	<b-container class="ucp__index">
		<firsttime v-if="firstTime"/>
		<b-row v-else class="ucp__index__info">
			<b-col md="8" class="ucp__index__info__column--left">
				<b-row>
					<b-col md="12" class="ucp__index__info__block ucp__index__info__block--profile">
						<h4 class="ucp__index__info__block__desc ucp__index__info__block--profile__desc">Seu perfil</h4>
						<div class="ucp__index__info__block__content">
							<userAvatar :user="user" :editable="true" />
							<userContent :user="user" />
							<router-link to="/ucp/perfil" exact class="btn btn-primary">Ver perfil completo</router-link>
						</div>
					</b-col>
					<h3>Seus personagens</h3>
					<b-col md="12" class="ucp__index__info__block">
						
					</b-col>
				</b-row>
			</b-col>
			<b-col md="3" class="ucp__index__info__column--right">
				<b-row>
					<b-col 
						md="12"
						class="ucp__index__info__block ucp__index__info__block--punishment"
						:class="{
							'tempbanned': userActivatedStatus == 2,
							'permbanned': userActivatedStatus == 3,
						}"
						v-if="userActivatedStatus >= 2"
					>
						<h4 class="ucp__index__info__block__desc ucp__index__info__block--punishment__desc">Punição</h4>
						<ul class="ucp__index__info__block__content">
							<b>{{ this.user.forumAtt.attributes.username }}</b>, você possui uma punição ativa no momento. <br/>Veja maiores detalhes abaixo:
							<ul class="ucp__index__info__block--punishment__info">
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
					<b-col md="12" class="ucp__index__info__block ucp__index__info__block--account">
						<h4 class="ucp__index__info__block__desc">Sua conta</h4>
						<ul class="ucp__index__info__block__content">
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
					<b-col md="12" class="ucp__index__info__block">
						<h4 class="ucp__index__info__block__desc">Log administrativo</h4>
						<ul class="ucp__index__info__block__content">
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
	import axios from 'axios';
	import moment from 'moment';
	import { store } from '@/vuex/store';
	import firsttime from '@/components/first-time/block';
	import fontawesome from '@fortawesome/vue-fontawesome';

	import userAvatar from '@/components/user-profile/avatar';
	import userContent from '@/components/user-profile/content';

	import { code, bolt, support, briefcase, pencilAlt } from '@fortawesome/fontawesome-free-solid';

	var tokenAPI, loginAPI;

	if((location.hostname != "pc-rpg.com.br") && (location.hostname != "www.pc-rpg.com.br")) {
		tokenAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/token';
		loginAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/login/';
	} else {
		tokenAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/token';
		loginAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/login/';
	}

	var usersBaseURI = 'https://forum.pc-rpg.com.br/api/users/';

	export default {
		//char data = player_id, firstName, lastName, position, property, cash, level, xp, gender [type, enum], pedModel, traits, logoutArea

		data() {
            return {
				user: store.state.user,
				firstTime: false,
				avatarFile: null,
				userActivatedStatus: null,
				punishment: [],

				counting: {
					now: Math.trunc((new Date()).getTime() / 1000),
					punishmentEnd: null,
				}
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
			}
		},
		mounted() {
			this.getUserAvatar();
			this.checkUserAccountStatus();

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

			this.$root.$on('hideFirstTimeTut', (res) => {
				this.firstTime = res;
			});

			var timeSave = localStorage.getItem('firstTimeUCP');
			if(timeSave != null) {
				this.firstTime = true;
			}
		},
		components: {
			firsttime,
			userAvatar, userContent,
			'fa': fontawesome
		}
	}
</script>

<style lang="scss">
	@import '../../assets/sass/main.scss';
</style>