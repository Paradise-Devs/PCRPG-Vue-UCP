<template>
  <div class="ucp__block__character">
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
    <b-col 
      md="12" 
      offset-md="1" 
      class="ucp__block ucp__block--empty"
      v-else-if="chars.length == 0"
    >
      <div class="char__icon">
        <font-awesome-layers>
          <icon :icon="['fas', 'street-view']"/>
                  <icon :icon="['fas', 'plus']" transform="shrink-12 right-5 up-9" />
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
  export default {
    
  }
</script>