<!--suppress ALL -->
<template>
    <div class="firsttime__block__content">
        <h4 class="firsttime__block__content__title">Olá, {{ user.forumAtt.attributes.username }}!</h4>
        <p>
            Aparentemente é a primeira vez que você está por aqui.
            <br/><br/>
            Seja bem vindo ao painel de usuário do PC:RPG! Esta é uma área em constante atualização, aqui você vai conseguir atualizar seu perfil,
            ver seus dados em tempo real, acompanhar seus personagens e muito mais.
            <br /><br/>
            Você pode acompanhar as atualizações constantes ocorrendo no site ou no servidor, pela <a href="https://forum.pc-rpg.com.br/t/patchnotes" target="_blank">tag de patchnotes</a> no Fórum.
            <br /><br/>
            Para começar com o pé direito, sinta-se livre para usar sua foto favorita como avatar e preencher os dados adicionais quanto ao seu perfil.
            <br /><br/>
            Você também pode ignorar e fazer isso depois, porém, é bom você confirmar pelo menos o seu nome de usuário, já que você só vai conseguir alterar ele novamente daqui 3 meses.
            <br /><br/>
            Have fun! :D
        </p>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { store } from '@/vuex/store';
    
    export default {
        data() {
            return {
				user: store.state.user,
            }
        },
		mounted() {
			store.watch(
				(state)=>{
					return store.getters.getUserData
				},
				(oldValue, newValue)=>{
					this.user = store.state.user;
				}
			)
        }
    }
</script>