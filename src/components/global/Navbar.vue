<template>
    <div>
        <animated-fade-in>
            <nav :class="[isFixed ? 'fixed' : '' ]">
                <v-waypoint @waypoint="navbarHandler"></v-waypoint>
                <b-container class="bv-example-row">
                    <b-row>
                        <b-col md="5" offset-md="7" right>
                            <router-link to="/" v-scroll-to=" {
                                el: '#indexContent',
                                offset: 20
                            }">
                                Início
                            </router-link>
                            <router-link to="/blog">Blog</router-link>
                            <router-link to="/patchnotes">Changelog</router-link>
                            <router-link to="/commits">Desenvolvimento</router-link>
                        </b-col>
                    </b-row>
                </b-container>
            </nav>
        </animated-fade-in>
        <a href="#" v-scroll-to="'#app'" id="toTop" :style="{ display: isShow }" @click="restartState">
            <icon name="angle-up"></icon>
            <span class="screen-reader-text">Voltar ao topo</span>
        </a>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                isShow: 'none',
                isFixed: false
            }
        },
        methods: {
            restartState: function(event) {
                this.isFixed = false
                this.isShow = 'none'
            },
            navbarHandler (direction, going) {
                if(going == "out" && direction.y == "down") {
                    this.isFixed = true
                    this.isShow = 'block'
                }
            }
        },
        mounted: function () { 
            this.$root.$on('unfixNav', () => {
                this.isFixed = false
                this.isShow = 'none'
            })
        }
    }
</script>

<style>
    nav {
		padding-bottom: 0px;
		padding-top: 0px;
        position: absolute;
        z-index: 2;
        height: 50px;
        width: 100%;
        bottom: 0px;
        line-height: 50px;
        background: rgba(0, 0, 0, .5);
        background: -webkit-linear-gradient(transparent, #161616);
        background: -o-linear-gradient(transparent, #161616);
        background: -moz-linear-gradient(transparent, #161616);
        background: linear-gradient(transparent, #161616);
        transition: ease-in 200ms;
    }

    nav.fixed {
        position: fixed;
        top: 0;
        width: 100%;
        background-color: #2A2A2A;
        margin-top: 0px;
        height: 50px;
        z-index: 999;
        transition: ease-in 200ms;
    }
    
    nav a {
        text-decoration: none;
        text-transform: uppercase;
        font-size: 13px;
        font-weight: 500;
        color: #fff;
        opacity: .3;
        transition: ease-in 200ms;
    }

    nav a:hover {
        opacity: 1;
        text-decoration: none;
        color:#fff;
    }

    nav a.router-link-exact-active {
        color: #fff;
        font-weight: 600;
        opacity: 1;
    }

    nav a:not(:last-child) {
        margin-right: 25px;
    }

    #toTop {
        background-color: #333;
        border-radius: 4px 4px 0 0;
        bottom: 0;
        height: 35px;
        position: fixed;
        right: 30px;
        text-align: center;
        text-transform: uppercase;
        width: 48px;
        display: none;
        opacity: .9;
        z-index: 10000;
        transition: all .2s ease-in-out 0s;
        line-height: 35px;
        font-size: 22px;
        padding-top: 5px;
        border: 0px;
        color: #fff;
    }

    #toTop:hover {
        background-color: #2A2A2A;
    }

    #toTop svg {
        height: 22px;
        width: 22px;
    }
</style>