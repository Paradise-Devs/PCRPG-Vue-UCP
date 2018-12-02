<!--suppress ALL -->
<template>
	<b-container class="page__ucp--index">
		<b-row class="ucp">
			<b-col md="8" sm="12" class="ucp__column--left">
				<b-row>
					<b-col md="12" class="block-ucp">
						<h4 class="desc">Seu perfil</h4>
						<div class="content">
							<userAvatar :url="user.avatarUrl" :username="user.username" mobSize="80px" editable />
							<userContent :user="user" />
							<router-link to="/ucp/perfil" exact class="btn btn-primary">Ver perfil completo</router-link>
						</div>
					</b-col>
					<div class="ucp__divider">
						<h3 class="ucp__divider__title">Seus personagens</h3>
					</div>
					<b-col md="12" class="container--nopadding">
						<block-chars :chars="chars" />
					</b-col>
				</b-row>
			</b-col>
			<b-col md="3" class="ucp__column--right">
				<b-row>
					<block-punishment :user="user" />
					<block-stats :user="user" />
					<block-friends :user="user" />
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
	import blockFriends from "@/components/ucp/block-friends";

	export default {
		data() {
			return {
				user: store.state.user,
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
		methods: {
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
			userAvatar,
			userContent,
			blockStats,
			blockChars,
			blockPunishment,
			blockFriends
		}
	};
</script>