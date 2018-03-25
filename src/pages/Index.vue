<template>
	<div>
		<b-container>
			<serverinfo/>
			<b-row>
				<b-col cols="8">
					<news />
				</b-col>
				<b-col cols="4">
					<patchnotes />
				</b-col>
			</b-row>
		</b-container>
		<stats/>
		<b-container>
			<div class="joinus">
				<h2><b>#</b>Junte-se a nós</h2>
				<b-row>
					<b-col cols="4">
						<discord/>
					</b-col>
					<b-col cols="4">
						<lastdiscussions/>
					</b-col>
					<b-col cols="4">
						<team/>
					</b-col>
				</b-row>
			</div>
		</b-container>
	</div>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios';
	import moment from 'moment';

	import fontawesome from '@fortawesome/vue-fontawesome'
	import comments from '@fortawesome/fontawesome-free-regular';
	import users from '@fortawesome/fontawesome-free-solid';

	import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
	import serverinfo from '@/components/server-info/bar.vue'
	import news from '@/components/news/block.vue'
	import patchnotes from '@/components/patchnotes/block.vue'
	import lastdiscussions from '@/components/last-discussions/block.vue'
	import stats from '@/components/stats/block.vue'
	import discord from '@/components/discord/block.vue'
	import team from '@/components/team/block.vue'

	export default {
		components: {
			'vue-spinner': PulseLoader,
			'fa': fontawesome,
			serverinfo,
			news,
			patchnotes,
			stats,
			discord,
			lastdiscussions,
			team
		}
    }
</script>

<style lang="scss">
	.joinus {
        margin: 30px 0px;

		h2 {
			color: #526cff;
			text-transform: uppercase;
			font-size: 20px;
			margin-bottom: 20px;

			b {
				color: #6c7d93;
			}
		}

		.row {
			display: flex;
			justify-content: center;
			align-items: center;
			min-height: 367px;
		}
    }
</style>
