<template>
  <div
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
    <div class="ucp__block ucp__block--account">
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
    </div>
  </div>
</template>

<script>
  import moment from "moment";

  export default {
    props: {
      user: Object
    },
    data() {
			return {
				punishment: [],

				counting: {
					now: Math.trunc(new Date().getTime() / 1000),
					punishmentEnd: null
				},
      }
    },
    filters: {
			twoDigits: function(value) {
				if (value.toString().length <= 1) {
					return "0" + value.toString();
				}
				return value.toString();
			}
    },
    computed: {
			calculatedExpireDate: function() {
				this.counting.punishmentEnd = Math.trunc(
					Date.parse(this.counting.punishmentEnd) / 1000
				);
				return this.counting.punishmentEnd;
			},
			expireSeconds: function() {
				return (this.calculatedExpireDate - this.counting.now) % 60;
			},
			expireMinutes: function() {
				return (
					Math.trunc((this.calculatedExpireDate - this.counting.now) / 60) % 60
				);
			},
			expireHours: function() {
				return (
					Math.trunc((this.calculatedExpireDate - this.counting.now) / 60 / 60) %
					24
				);
			},
			expireDays: function() {
				return Math.trunc(
					(this.calculatedExpireDate - this.counting.now) / 60 / 60 / 24
				);
			}
    },
    methods: {
			checkUserAccountStatus: function() {
				let userActivated;
				let suspendDate = this.user.forumAtt.attributes.suspendUntil;
				if (this.user.forumAtt.attributes.isActivated) {
					//ativado
					this.userActivatedStatus = 1;
					this.counting.punishmentEnd = this.user.forumAtt.attributes.suspendUntil;

					if (suspendDate) {
						if (
							this.expireDays <= 0 &&
							this.expireHours <= 0 &&
							this.expireMinutes <= 0 &&
							this.expireMinutes <= 0 &&
							this.expireSeconds <= 0
						) {
							this.userActivatedStatus = 1;
						} else {
							let expireDate = new Date(suspendDate);
							let today = new Date();
							let interval = today.getFullYear() - expireDate.getFullYear();

							if (interval < 0) {
								interval = interval * -1;
							}
							let tempBan = interval < 10 ? true : false;

							if (tempBan) {
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
				this.punishment.admin = "Los";
				this.punishment.date = moment(today).format("L");
				this.punishment.time = moment(today).format("LT");
				this.punishment.reason = "Drive-by";
			}
    },
    mounted() {
      this.checkUserAccountStatus();

      window.setInterval(() => {
				this.counting.now = Math.trunc(new Date().getTime() / 1000);
			}, 1000);
    }
  }
</script>