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
                <form class="firsttime__block__info__form" v-on:submit.prevent="updateUser()">
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
                            v-model="user.forumAtt.attributes.bio"
                            v-validate="'max:70'"
                            placeholder="Conte-nos sobre você"
                            :value="user.forumAtt.attributes.bio"
                        >
                        </b-form-input>
                    </b-form-group>
                    <b-form-group 
                        label="Confirme seu nome de usuário:<br/>"
                        label-for="userName"
                    >
                        <b-form-input 
                            id="userName"
                            type="text"
                            name="username"
                            v-model="newUsername"
                            data-vv-scope="userScope"
							v-validate="{ regex: /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/ , min: 5, max: 15, required: true}"
                            :class="{ 'is-invalid': errors.has('userScope.username') || errorUsername, 'is-valid': !errors.has('userScope.username') && newUsername.length != 0 && !errorUsername }"
                            placeholder="Confirme seu nome de usuário"
                            :value="user.forumAtt.attributes.username"
                            :state="null"
							@change="checkUsername()"
							autocomplete="off"
							:disabled="usernameChecking"
                        />
                        <beatloader :loading="usernameChecking" color="#303846" size="5px" class="input-spinner"></beatloader>
						<div class="invalid-feedback">{{ errors.first('userScope.username') }}</div>
						<div class="invalid-feedback" v-if="errorUsername">{{ errorUsername }}</div>
                        <small class="form-text text-muted" v-if="!errors.first('userScope.username')">Você só vai conseguir trocar daqui 3 meses</small>
                    </b-form-group>
                    <b-button-group right>
                        <b-button>Pular essa etapa</b-button>
                        <b-button type="submit" variant="primary">Salvar</b-button>
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
    
    import beat from 'vue-spinner/src/BeatLoader.vue';
	import moon from 'vue-spinner/src/MoonLoader.vue';

	var tokenAPI, loginAPI, usersAPI;

	if((location.hostname != "pc-rpg.com.br") && (location.hostname != "www.pc-rpg.com.br")) {
		tokenAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/token';
		loginAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/login/';
		usersAPI = 'http://dev.pc-rpg.com.br:3000/api/v1/players/';
	} else {
		tokenAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/token';
		loginAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/login/';
		usersAPI = 'https://prod.pc-rpg.com.br:3000/api/v1/players/';
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
                loadingData: false,
                newUsername: '',
                usernameChecking: false,
                errorUsername: ''
            }
        },
		methods: {
            checkUsername: function() {
                if(this.fields.$userScope.username.changed && this.fields.$userScope.username.valid) {
					this.usernameChecking = true;

					if(this.user.username != this.newUsername.toLowerCase()) {
						axios.get(usersAPI)
						.then(response => {
							for (var i = 0; i < response.data.length; i++) {
								if (response.data[i].username == this.newUsername.toLowerCase()) {
									this.errorUsername = 'Esse nome de usuário já está em uso';
									this.usernameChecking = false;
									break;
								} else {
									this.errorUsername = false;
									this.usernameChecking = false;
								}
							}
						})
					} else {
                        this.usernameChecking = false;
                        this.errorUsername = false;
                    }
				}
            },
			onFileChanged: function(event) {
				this.avatarFile = event.target.files[0];
				this.userAvatar = URL.createObjectURL(event.target.files[0]);
            },
            updateUser: function() {
                this.loadingData = true;

                if(this.avatarFile != null) {
                    const formData = new FormData();
                    formData.append('avatar', this.avatarFile, this.avatarFile.name);
                    let userId = this.user.forumAtt.id;
                    axios.post(usersBaseURI + userId + '/avatar', formData, {
                        headers: {
                            "Authorization": "Token " + store.getters.getMasterToken + 'userId=' + userId
                        }
                    })
                    .then(response => {
                        this.user.forumAtt.attributes.avatarUrl = response.data.data.attributes.avatarUrl;
                        this.updateServerUserAtt();
                    })
                    .catch(error => {
                        console.log(error);
                        this.loadingData = false;
                    });
                } else {
                    this.updateServerUserAtt();
                }
            },
            updateServerUserAtt: function() {
                axios.patch(usersAPI + this.user.username, {
                    masterkey: store.getters.getUpdateMasterToken,
                    username: this.newUsername,
                })
                .then(response => {
                    this.user.username = this.newUsername.toLowerCase();
                    this.user.token = response.data.token;
                    this.updateForumUserAtt();
                })
                .catch(error => {
                    console.log(error);
                    this.loadingData = false;
                })
            },
            updateForumUserAtt: function() {
                let sendData = { attributes: { bio: this.user.forumAtt.attributes.bio, username: this.newUsername } };

                axios.patch(usersBaseURI + this.user.forumAtt.id, {
                    data: sendData,
                }, {
                    headers: { "Authorization": "Token " + store.getters.getMasterToken + 'userId=1' }
                })
                .then(response => {
                    console.log('deu certo');
                    console.log(response);

                    store.dispatch('setData', this.user).then(() => {
						this.loadingEmail = false;
						this.loadingData = false;
					});
                });
            },
            uploadAvatar: function() {
                
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
        },
        components: {
			'beatloader': beat,
			'moonloader': moon
		}
	}
</script>

<style lang="scss">
	@import '../../assets/sass/main.scss';
</style>