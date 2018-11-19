<template>
  <div class="block-ucp">
		<h4 class="desc">Sua conta</h4>
		<ul class="content">
			<li class="item">
				Status atual 
				<span 
					class="item__stats"
					:class="{ 
						'item__stats--deactivated': userActivatedStatus == 0,
						'item__stats--normal': userActivatedStatus == 1,
						'item__stats--tempbanned': userActivatedStatus == 2,
						'item__stats--permbanned': userActivatedStatus == 3,
					}"
				>
					{{ userActivatedStatus | userAccountStatusText }}
				</span>
			</li>
			<li class="item">Punições no histórico <span class="item__stats">0</span></li>
			<li class="item">Tempo total jogando <span class="item__stats">0h</span></li>
			<li class="item">Membro desde <span class="item__stats">{{ this.user.forumAtt.attributes.joinTime | normalDateFilter }}</span></li>
		</ul>
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
        userActivatedStatus: null,
      }
    },
    filters: {
			userAccountStatusText: function(state) {
				let result;
				switch (state) {
					case 0:
						result = "Desativada";
						break;
					case 1:
						result = "Ativa";
						break;
					case 2:
						result = "Banido Temp.";
						break;
					case 3:
						result = "Banido Perm.";
				}

				return result;
			},
			normalDateFilter: function(date) {
				return moment(date).format("L");
			},
    },
    methods: {
			checkUserAccountStatus: function() {
				let userActivated;
				let suspendDate = this.user.forumAtt.attributes.suspendUntil;
				if (this.user.forumAtt.attributes.isActivated) {
					this.userActivatedStatus = 1;

					if (suspendDate) {
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
					}
				} else {
					//desativado
					this.userActivatedStatus = 0;
				}
			}
    },
    mounted() {
			this.checkUserAccountStatus();
		}
  }
</script>