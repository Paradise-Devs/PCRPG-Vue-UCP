<template>
    <div class="parallax">
        <swiper :options="swiperOption">
            <swiper-slide v-for="slide in swiperSlides" :key="slide.id">
                <div class="slide-image" :style="{ 'background-image': 'url(' + slide.url + ')' }"></div>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"><icon name="angle-left"></icon></div>
            <div class="swiper-button-next" slot="button-next"><icon name="angle-right"></icon></div>
        </swiper>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    import 'swiper/dist/css/swiper.css'

    export default {
        name: 'Slider',
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                swiperOption: {
                    loop: true,
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
                swiperSlides: [
                    {
                        url: require('../../assets/images/slider/1.jpg'),
                        text: 'testing'
                    },
                    {
                        url: require('../../assets/images/slider/2.png'),
                        text: 'testing'
                    }
                ]
            }
        }
    }
</script>

<style>
    .parallax {
        width: 100%;
        top: 0px;
        left: 0px;
        z-index: 0;
        height: 100vh;
        position: fixed;
    }

    .swiper-container {
        height: 100%;
    }

    .swiper-slide .slide-image {
        width: 100%;
        height: 100vh;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .swiper-slide.swiper-slide-active {
        animation: move 30s infinite ease-in-out;
    }

    .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: 60px;
    }

    [class^="swiper-button"] {
        top: 45%;
        background: none;
        opacity: .2;
        transition: ease-in 200ms;
    }

    [class^="swiper-button"]:hover {
        opacity: 1;
    }

    .swiper-button-next {
        right: 100px;
    }

    .swiper-button-prev {
        left: -20px;
    }

    .swiper-button-next svg, .swiper-button-prev svg {
        width: 140px;
        height: 140px;
        color: #fff;
        -webkit-filter: drop-shadow( 0px 0px 4px #000 ); 
            filter: drop-shadow( 0px 0px 4px #000 );
    }

    @keyframes move {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

</style>
