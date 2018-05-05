<!--suppress ALL -->
<template>
    <b-row align-h="between" class="firsttime__block">
        <b-col md="5" sm="12">
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
        </b-col>
        <b-col md="7" sm="12">
            <div class="firsttime__block__info">
                <div class="firsttime__block__info__image">
                    <img :src="userAvatar" v-if="userAvatar != null" />
                    <div class="firsttime__block__info__image--empty" v-else> ? </div>
                </div>
                <form class="firsttime__block__info__form" v-on:submit.prevent="changeEmail()">
                    <b-form-group 
                        label="Gostaria de alterar o seu avatar?"
                        label-for="avatarUpload"
                        description="Utilize apenas formatos <b>.jpg/jpeg</b> e <b>.png</b>. Tamanho máximo <b>150kb</b>"
                    >
                        <b-form-file 
                            accept="image/jpeg, image/png"
                            id="avatarUpload"
                            v-model="avatarFile"
                            @change="onFileChanged"
                            placeholder="Selecione um arquivo...">
                        </b-form-file>
                    </b-form-group>
                    <b-form-group 
                        label="Conte-nos um pouco sobre você.<br/>"
                        label-for="userBio"
                        description="Essa bio vai ficar pública no fórum e no seu perfil"
                    >
                        <b-form-input 
                            id="userBio"
                            type="text"
                            v-model="userBio"
                            required
                            placeholder="Conte-nos sobre você">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group 
                        label="Confirme seu nome de usuário:<br/>"
                        label-for="userName"
                        description="Você só vai conseguir trocar daqui 3 meses"
                    >
                        <b-form-input 
                            id="userName"
                            type="text"
                            v-model="userBio"
                            required
                            placeholder="Confirme seu nome de usuário" :value="user.forumAtt.attributes.username">
                        </b-form-input>
                    </b-form-group>
                    <b-button-group right>
                        <b-button>Pular essa etapa</b-button>
                        <b-button variant="primary">Salvar</b-button>
                    </b-button-group>
                </form>
            </div>
        </b-col>
    </b-row>
</template>

<script>
	import Vue from 'vue';
	import axios from 'axios';
	import { store } from '@/vuex/store';

	var tokenAPI, loginAPI;

	if((location.hostname != "pc-rpg.com.br") && (location.hostname != "www.pc-rpg.com.br")) {
		tokenAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/token';
		loginAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/login/';
	} else {
		tokenAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/token';
		loginAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/login/';
	}

	var usersBaseURI = 'https://forum.pc-rpg.com.br/api/users/';

	export default {
		//char data = player_id, firstName, lastName, position, property, cash, level, xp, gender [type, enum], pedModel, traits, logoutArea

		data() {
            return {
				user: store.state.user,
				userAvatar: null,
				userLoggedIn: null,
				avatarFile: null,
				userBio: ''
            }
        },
		methods: {
			onFileChanged(event) {
				this.avatarFile = event.target.files[0];
				this.userAvatar = URL.createObjectURL(event.target.files[0]);
            },
            uploadAvatar: function() {
                const formData = new FormData();
                formData.append('avatar', this.avatarFile, this.avatarFile.name);
                let userId = this.user.forumAtt.id;
                axios.post(userBaseURI + userId + '/avatar', formData, {
                    headers: {
                        "Authorization": "Token " + store.getters.getMasterToken + 'userId=' + userId
                    },
                    onUploadProgress: ProgressEvent => {
                        console.log(ProgressEvent.loaded / ProgressEvent.total)
                    }
                })
                .then(response => {
                    this.user.forumAtt.attributes.avatarUrl = response.data.data.attributes.avatarUrl;

                    store.dispatch('setData', this.user).then(() => {
                        location.reload();
                    });
                })
                .catch(error => {
                    console.log(error);
                })
            }
		},
		watch: {
			user: {
				handler: function(val, oldVal) {
					if(this.user.token == null) {
						this.userLoggedIn = false;
					} else {
						this.userLoggedIn = true;
					}
				}, deep: true
			}
		},
		mounted() {
			if(this.user.token == null) {
				this.userLoggedIn = false;
			} else {
				this.userLoggedIn = true;
			}

			if(this.user.forumAtt.attributes.avatarUrl != null) {
				this.userAvatar = this.user.forumAtt.attributes.avatarUrl;
			}

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

<style lang="scss">
	@import '../../assets/sass/main.scss';
</style>