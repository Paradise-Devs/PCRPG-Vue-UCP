<template>
	<div id="indexContent">
		<b-container class="main-content" fluid>
			<section>
				<div class="block-title">
					<div class="title-content">
						<h1>Últimas <span>notícias</span></h1>
						<small>Saiba o que está acontecendo no servidor.</small>
					</div>
				</div>
				<div class="news-blocks">
					<swiper :options="newsOptions">
						<swiper-slide v-for="news in newsSlides" :key="news.id">
							<router-link :to="news.link"></router-link>
							<div class="news-image" :style="{ 'background-image': 'url(' + news.img + ')' }"></div>
							<b-badge variant="primary" :class="news.tag">
								{{ news.tag }}
							</b-badge>
							<div class="overlay">
								<span><icon name="link" scale="1.8"></icon></span>
							</div>
							<div class="news-content">
								<h2>{{ news.title }}</h2>
								<span>{{ news.desc }}</span>
							</div>
							<div class="news-info">
								<small>{{ news.date }}</small>
								<h3>{{ news.title }}</h3>
							</div>
						</swiper-slide>
					</swiper>
				</div>
			</section>
		</b-container>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import 'vue-awesome/icons/link'
	import 'swiper/dist/css/swiper.css'

	export default {
        name: 'Slider',
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                newsOptions: {
					slidesPerView: 3,
                    loop: false,
                    autoplay: {
                        delay: 30000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                },
                newsSlides: [
                    {
                        img: require('../assets/images/slider/2.png'),
						text: 'testing',
						type: 'blog',
						tag: 'devblog',
						title: 'Devblog #1',
						desc: 'Neste devblog, falaremos um pouco sobre o desenvolvimento inicial do servidor, ideias e planejamento para o futuro.',
						link: 'blog/taltaltatla',
						date: '14/08/2017'
					}
                ]
            }
		},
		methods: {

		}
    }
</script>

<style>
	.news-blocks {
		margin-top: 20px;
	}

	.news-blocks .swiper-slide {
		height: 600px;
		position: relative;
		overflow: hidden;
	}

	.news-blocks .swiper-slide a {
		width: 100%;
		height: 100%;
		z-index: 3;
		position: absolute;
		top: 0px;
		left: 0px;
	}

	.news-blocks .swiper-slide .badge {
		position: absolute;
		right: 20px;
		top: 20px;
		font-size: 16px;
		z-index: 3;
	}

	.news-blocks .swiper-slide .badge.devblog {
		background-color: #3f51b5;
	}

	.news-blocks .swiper-slide .overlay {
		width: 100%;
		height: 100%;
		z-index: 1;
		position: absolute;
		top: 0px;
		left: 0px;
		transition: all ease-in-out .5s;
		background-color: rgba(0, 0, 0, .8);
		opacity: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.news-blocks .swiper-slide .overlay span {
		color: #fff;
		background-color: #282C34;
		padding: 10px;
		width: 80px;
		height: 80px;
		border-radius: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.news-blocks .swiper-slide .news-content {
		z-index: 3;
		position: absolute;
		bottom: 0px;
		height: auto;
		background-color: #171819;
		width: 90%;
		margin: 20px;
		padding: 20px;
		opacity: 0;
		-webkit-transform: translateY(30px);
		transform: translateY(30px);
		-webkit-transition: all .3s ease;
		transition: all .3s ease;
	}

	.news-blocks .swiper-slide .news-info {
		position: absolute;
		bottom: 0px;
		left: 10px;
		color: #fff;
		transition: all .5s ease-in-out;
	}

	.news-blocks .swiper-slide .news-info h1 {
		color: #fff;
	}

	.news-blocks .swiper-slide .news-info small {
		color: #aaa;
	}

	.news-blocks .swiper-slide .news-image {
		width: 100%;
		height: 100%;
		background-position: center center;
        background-repeat: no-repeat;
		background-size: cover;
		-webkit-transition: all 1s ease;
		transition: all .5s ease-in-out;
	}

	.news-blocks .swiper-slide .news-content h2 {
		text-transform: uppercase;
		color: #fff;
	}
	.news-blocks .swiper-slide .news-content span {
		color: #aaa;
	}

	/* hover handlers */
	.news-blocks .swiper-slide:hover {
		cursor: pointer;
	}

	.news-blocks .swiper-slide:hover .news-info {
		opacity: 0;
	}

	.news-blocks .swiper-slide:hover .news-image {
		transform: scale(1.1) translateY(-20px);
	}

	.news-blocks .swiper-slide:hover .overlay {
		opacity: 1;
		transition: all ease-in-out .5s;
	}

	.news-blocks .swiper-slide:hover .news-content {
		opacity: 1;
		-webkit-transform: translateY(0);
		transform: translateY(0);
	}

</style>