<template>
	<div class="page__index">
		<b-container>
			<serverinfo/>
			<b-row>
				<b-col sm="12" md="8">
					<news />
				</b-col>
				<b-col sm="12" md="4">
					<patchnotes />
				</b-col>
			</b-row>
		</b-container>
		<stats/>
		<b-container>
			<div class="joinus">
				<h2><b>#</b>Junte-se a nós</h2>
				<b-row>
					<b-col sm="12" md="4">
						<discord/>
					</b-col>
					<b-col sm="12" md="4">
						<lastdiscussions/>
					</b-col>
					<b-col sm="12" md="4">
						<team/>
					</b-col>
				</b-row>
			</div>
		</b-container>
	</div>
</template>

<script>
	import Vue from 'vue'
	import moment from 'moment';

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