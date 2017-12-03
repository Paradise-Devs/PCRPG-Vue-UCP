<template>
    <animated-fade-in>
        <nav :class="[isActive ? 'fixed' : '' ]">
            <v-waypoint @waypoint="navbarHandler"></v-waypoint>
            <b-container class="bv-example-row">
                <b-row>
                    <b-col md="7">
                        
                    </b-col>
                    <b-col md="5" right>
                        <router-link to="/">Início</router-link>
                        <router-link to="/blog">Blog</router-link>
                        <router-link to="/patchnotes">Changelog</router-link>
                        <router-link to="/commits">Desenvolvimento</router-link>
                    </b-col>
                </b-row>
            </b-container>
        </nav>
    </animated-fade-in>
</template>

<script>
    export default {
        data: () => {
            return {
                isActive: false
            }
        },
        methods: {
            navbarHandler (direction, going) {
                if(going == "out" && direction.y == "down") {
                    this.isActive = true
                }
            }
        },
        mounted: function () { 
            this.$root.$on('unfixNav', () => {
                this.isActive = false
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
        background: red; /* For browsers that do not support gradients */
        background: -webkit-linear-gradient(transparent, #161616); /* For Safari 5.1 to 6.0 */
        background: -o-linear-gradient(transparent, #161616); /* For Opera 11.1 to 12.0 */
        background: -moz-linear-gradient(transparent, #161616); /* For Firefox 3.6 to 15 */
        background: linear-gradient(transparent, #161616); /* Standard syntax */
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
</style>