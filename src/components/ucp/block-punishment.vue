<template>
  <div
	 	class="block-ucp"
    :class="{
      'block-ucp--tempbanned': userActivatedStatus == 2,
      'block-ucp--permbanned': userActivatedStatus == 3,
    }"
    v-if="userActivatedStatus >= 2"
  >
    <h4 class="desc">Punição</h4>
    <ul class="content">
			<user-name :username="user.username" />, você possui uma punição ativa no momento. <br/>Veja maiores detalhes abaixo:
      <ul class="info">
        <li class="item">
          Administrador resp. 
          <span class="item__stats item__stats--username">
						<user-name :username="punishment.admin" linkable />
          </span>
        </li>
        <li class="item">Data <span class="item__stats">{{ punishment.date }}</span></li>
        <li class="item">Hora <span class="item__stats">{{ punishment.time }}</span></li>
        <li class="item">Motivo <span class="item__stats">{{ punishment.reason }}</span></li>
        <li class="item item--expires" v-if="userActivatedStatus == 2">
          Expira em
          <span class="item__stats">
          <span v-if="expireDays > 0">{{ expireDays | twoDigits }}d</span>
          <span v-if="expireHours > 0">{{ expireHours | twoDigits }}h</span>
          <span v-if="expireMinutes > 0">{{ expireMinutes | twoDigits }}m</span>
            {{ expireSeconds | twoDigits }}s
          </span>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
	import moment from "moment";
	import userName from "@/components/user-profile/username";

  export default {
    props: {
      user: Object
    },
    data() {
			return {
				userActivatedStatus: 0,
				punishment: { },

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
				let suspendDate = this.user.suspendUntil;
				if (this.user.isActivated) {
					//ativado
					this.userActivatedStatus = 1;
					this.counting.punishmentEnd = this.user.suspendUntil;

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
			this.getPunishmentData();

      window.setInterval(() => {
				this.counting.now = Math.trunc(new Date().getTime() / 1000);
			}, 1000);
		},
		components: {
			userName
		}
  }
</script>