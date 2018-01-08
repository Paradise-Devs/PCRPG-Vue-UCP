<template>
    <div class="hero">
        <div class="container">
            <div class="content">
                <h2 class="title">Bem vindo ao PC:RPG</h2>        
                <div class="subtitle">
                    Paradise City é um servidor RPG no GTA V.<br/>
                    Explore, trabalhe, conquiste e faça sua vida em Los Santos!
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
            name: 'Slider',
            methods: {
		}
    }
</script>

<style>
    .hero {
        height: 156px;
        max-height: 156px;
        text-align: center;
        color: #6c7d93;
        position: relative;
        width: 100%;
        background-position: 0% 0%;
        background-repeat: no-repeat;
        background-size: cover;
        animation: move 60s infinite ease-in-out;
        background-image: url('../../assets/images/hero-bg.jpg');
        color: #fff;
        text-shadow: 0px 0px 5px rgba(0, 0, 0, .5);
    }

    .hero .container {
        padding-top: 40px;
        padding-bottom: 30px;
    }

    .hero .content {
        max-width: 600px;
        margin: 0 auto;
    }

    .hero .title {
        margin: 0;
        font-size: 22px;
        font-weight: normal;
        line-height: 1.5em;
    }

    .hero .subtitle {
        margin: 8px 0 0;
        line-height: 1.5em;
        font-size: 15px;
    }

    .hero .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: 60px;
    }

    @keyframes move {
        0% {
            background-position: 50% 50%;
        }
        50% {
            background-position: 90% 90%;
        }
        100% {
            background-position: 50% 50%;
        }
    }

</style>
