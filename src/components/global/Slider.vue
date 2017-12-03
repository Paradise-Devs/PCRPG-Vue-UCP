<template>
    <div class="parallax">
        <swiper :options="swiperOption">
            <swiper-slide v-for="slide in swiperSlides" :key="slide.id">
                <div class="slide-image" :style="{ 'background-image': 'url(' + slide.url + ')' }"></div>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
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
