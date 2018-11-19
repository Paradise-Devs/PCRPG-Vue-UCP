<template>
  <div class="block-ucp block-ucp--chars">
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
              <li class="item" :class="{'item--positive': char.cash > 0, 'item--negative': char.cash < 0}"><span class="icon"><icon :icon="['fas', 'dollar-sign']" /></span> {{ char.cash | money }}</li>
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
    <div
      class="container container--empty"
      v-else-if="chars.length == 0"
    >
      <div class="icon">
        <font-awesome-layers>
          <icon :icon="['fas', 'street-view']"/>
                  <icon :icon="['fas', 'plus']" transform="shrink-12 right-5 up-9" />
        </font-awesome-layers>
      </div>
      <span class="text">Sem personagens</span>
    </div>
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
          <li class="item" :class="{'item--positive': char.cash > 0, 'item--negative': char.cash < 0}"><span class="icon"><icon :icon="['fas', 'dollar-sign']" /></span> {{ char.cash | money }}</li>
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
    <div class="ucp__block__character-swiper__arrow ucp__block__character-swiper__arrow--prev" v-if="chars.length > 1"><icon :icon="['fas', 'angle-left']" /></div>
    <div class="ucp__block__character-swiper__arrow ucp__block__character-swiper__arrow--next" v-if="chars.length > 1"><icon :icon="['fas', 'angle-right']" /></div>  
  </div>
</template>

<script>
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
    props: {
      chars: Array
    },
    data() {
      return {
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
    },
    components: {
      FontAwesomeLayers
    }
  }
</script>