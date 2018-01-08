<template>
    <div>
        <animated-fade-in>
            <nav id="navbar">
                <b-container class="bv-example-row">
                    <b-row>
                        <b-col md="2">
                            <router-link to="/" class="header-logo">
                                <img src="https://pc-rpg.com.br/forum/assets/logo-tjwsbbzz.png" alt="PC:RPG">
                            </router-link>
                        </b-col>
                        <b-col md="10" class="right-items">
                            <router-link to="/">Início</router-link>
                            <router-link to="/patchnotes">Patchnotes</router-link>
                            <router-link to="/commits">Desenvolvimento</router-link>
                            <a href="/forum">Fórum</a>
                            <separator></separator>
                            <a href="#">Cadastre-se</a>
                            <a href="#">Login</a>
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
    import Vue from 'vue'
    import jQuery from 'jQuery'
    import 'vue-awesome/icons/angle-up'

    new Vue();
    
    export default {
        data: () => {
            return {
                isShow: 'none',
                isFixed: false,
                scrolled: false
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
            },
            handleScroll () {
                var scrollpos = window.scrollY;
                var navbar = document.getElementById("navbar");
                if(scrollpos > 50) {
                    navbar.classList.add('scrolled');
                    console.log('scrollou +50');
                } else {
                    navbar.classList.remove('scrolled');
                    console.log('scrollou -50');
                }
            }
        },
        created () {
            window.addEventListener('scroll', this.handleScroll);
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll);
        }
    }

    Vue.component('separator', {
        template: '<div class="separator"></div>'
    })
</script>

<style>
    nav {
		padding: 8px;
        height: 52px;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        position: fixed;
        background-color: #14181F;
        transition: all .2s ease-in-out 0s;
    }

    nav.scrolled {
        box-shadow: 0 2px 6px rgba(0,0,0,0.5);
        transition: all .2s ease-in-out 0s;
    }

    nav .separator {
        border-right: 1px solid #6c7d93;
        height: 20px;
        opacity: .1;
        padding-right: 0px;
        margin-right: 25px;
    }

    nav .header-logo {
        float: left;
        vertical-align: top;
        font-size: 18px;
        font-weight: normal;
        margin: 0 15px 0 0;
        line-height: 34px;
    }

    nav .header-logo img {
        max-height: 30px;
        vertical-align: middle;
    }

    nav a {
        text-decoration: none;
        font-size: 13px;
        font-weight: 500;
        color: #6c7d93;
        transition: ease-in 200ms;
    }

    nav a.router-link-exact-active {
        color: #526cff;;
        opacity: 1;
    }

    nav a:hover {
        text-decoration: none;
        color:#394bb2;
    }

    nav a:not(:last-child) {
        margin-right: 25px;
    }

    nav .right-items {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        vertical-align: middle;
        text-align: right;
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