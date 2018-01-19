<template>
    <div class="stats-wrapper">
        <b-container>
            <div class="content">
                <b-row>
                    <b-col cols="3" class="column">
                        <div class="number">1265</div>
                        <div class="desc">Jogadores</div>
                    </b-col>
                    <b-col cols="3" class="column">
                        <div class="number">1265</div>
                        <div class="desc">Empregos</div>
                    </b-col>
                    <b-col cols="3" class="column">
                        <div class="number">1265</div>
                        <div class="desc">Gangues</div>
                    </b-col>
                    <b-col cols="3" class="column">
                        <div class="number">1265</div>
                        <div class="desc">Propriedades</div>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    .stats-wrapper {
        margin-top: 20px;
        width: 100%;
        height: 250px;
        background-attachment: fixed;
        background-position: 0% 0%;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url('../../assets/images/parallax.jpg');
        display: flex;
        align-items: center;
    }

    .stats-wrapper .column {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        text-align: center;
    }

    .stats-wrapper .column .number {
        color: #fff;
        border-radius: 100px;
        border: 2px solid #526cff;
        background-color: rgba(20, 25, 31, .3);
        width: 100px;
        height: 100px;
        font-size: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: -20px;
    }

    .stats-wrapper .column .desc {
        position: absolute;
        bottom: -30px;
        left: 0px;
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: #fff;
        opacity: .7;
        text-transform: uppercase;
    }
</style>
