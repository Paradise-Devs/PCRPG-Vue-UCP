<!--suppress ALL -->
<template>
	<b-container class="page__ucp--index">
		<b-row class="ucp">
			<b-col md="8" sm="12" class="ucp__column--left">
				<b-row>
					<b-col md="12" class="ucp__block ucp__block--profile">
						<h4 class="ucp__block__desc ucp__block--profile__desc">Seu perfil</h4>
						<div class="ucp__block__content">
							<userAvatar :url="user.forumAtt.attributes.avatarUrl" :username="user.username" mobSize="80px" editable />
							<userContent :user="user" />
							<router-link to="/ucp/perfil" exact class="btn btn-primary">Ver perfil completo</router-link>
						</div>
					</b-col>
					<div class="ucp__divider">
						<h3 class="ucp__divider__title">Seus personagens</h3>
					</div>
					<b-col md="12">
						<!-- comp block chars -->
					</b-col>
				</b-row>
			</b-col>
			<b-col md="3" class="ucp__column--right">
				<b-row>
					<block-punishment :user="user" />
					<block-stats :user="user" />
				</b-row>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import Vue from "vue";
	import ServerService from "@/services/server";
	import moment from "moment";
	import { store } from "@/vuex/store";
	import { swiper, swiperSlide } from "vue-awesome-swiper";

	import userAvatar from "@/components/user-profile/avatar";
	import userContent from "@/components/user-profile/content";
	import blockChars from "@/components/user-profile/char-block";
	import blockStats from "@/components/ucp/block-accstats";
	import blockPunishment from "@/components/ucp/block-punishment";

	import { FontAwesomeLayers } from "@fortawesome/vue-fontawesome";
	import {
		code,
		bolt,
		support,
		briefcase,
		pencilAlt,
		angleLeft,
		angleRight,
		dollarSign
	} from "@fortawesome/fontawesome-free-solid";

	export default {
		//char data = player_id, firstName, lastName, position, property, cash, level, xp, gender [type, enum], pedModel, traits, logoutArea

		data() {
			return {
				user: store.state.user,
				firstTime: false,

				swiperOption: {
					slidesPerView: 1,
					init: true,
					variableWidth: false,
					navigation: {
						nextEl: ".ucp__block__character-swiper__arrow--next",
						prevEl: ".ucp__block__character-swiper__arrow--prev"
					},
					pagination: {
						el: ".ucp__block__character-swiper__pagination"
					}
				},

				chars: []
			};
		},
		watch: {
			user: {
				handler: function(val, oldVal) {
					if (this.user.token == null) {
						this.userLoggedIn = false;
					} else {
						this.userLoggedIn = true;
					}
				},
				deep: true
			}
		},
		filters: {
			money: function(value) {
				return value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			}
		},
		methods: {
			getNeededExp: function(level) {
				return 8 + (level - 1) * 4;
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
					});
			}
		},
		mounted() {
			this.getUserChars();

			store.watch(
				state => {
					return store.getters.getUserData;
				},
				(oldValue, newValue) => {
					this.user = store.state.user;
				}
			);

			if (this.user.token == null) {
				this.userLoggedIn = false;
			} else {
				this.userLoggedIn = true;
			}
		},
		components: {
			FontAwesomeLayers,
			userAvatar,
			userContent,
			blockStats,
			blockChars,
			blockPunishment
		}
	};
</script>