<!--suppress ALL -->
<template>
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
            <b-form-group>
                <b-button-group right>
                    <b-button @click="ignoreInit()">Pular essa etapa</b-button>
                    <b-button 
                        type="submit"
                        variant="primary"
                        :disabled="loadingData || errors.has('userScope.username') || newUsername.length === 0 || errorUsername || usernameChecking"
                    >
                        Salvar
                        <moonloader :loading="loadingData" color="#303846" size="25px"></moonloader>
                    </b-button>
                </b-button-group>
            </b-form-group>
        </form>
    </div>
</template>

<script>
    import Vue from 'vue';
    import ServerService from '@/services/server';
    import ForumService from '@/services/forum';
    import { store } from '@/vuex/store';
    
    import beat from 'vue-spinner/src/BeatLoader.vue';
	import moon from 'vue-spinner/src/MoonLoader.vue';

    import textFirstTime from './text';
    import formFirstTime from './form';

	export default {
		data() {
            return {
				user: store.state.user,
				userAvatar: null,
				userLoggedIn: null,
                avatarFile: null,
                loadingData: false,
                newUsername: '',
                usernameChecking: false,
                errorUsername: null,
                fileChanged: false,
            }
        },
		methods: {
            checkUsername: function() {
                if(this.fields.$userScope.username.changed && this.fields.$userScope.username.valid) {
					this.usernameChecking = true;

					if(this.user.username != this.newUsername.toLowerCase()) {
						ServerService.getPlayers()
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
            ignoreInit: function() {
                localStorage.setItem('firstTimeUCP', false);
                this.$root.$emit('hideFirstTimeTut', false);
            },
			onFileChanged: function(event) {
				this.avatarFile = event.target.files[0];
                this.userAvatar = URL.createObjectURL(event.target.files[0]);
                this.fileChanged = true;
            },
            updateUser: function() {
                this.loadingData = true;

                if(this.avatarFile != null) {
                    const formData = new FormData();
                    formData.append('avatar', this.avatarFile, this.avatarFile.name);
                    let userId = this.user.forumAtt.id;
                    ForumService.updateUserAvatar(userId , formData)
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
                ServerService.updatePlayerUsername(this.user.username, this.newUsername)
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

                ForumService.updateUserData(this.user.forumAtt.id, sendData)
                .then(response => {
                    store.dispatch('setData', this.user).then(() => {
                        this.loadingData = false;
                        localStorage.setItem('firstTimeUCP', false);
                        if(this.fileChanged) {
                            location.reload();
                        }
					});
                });
            }
		},
		mounted() {
			if(this.user.forumAtt.attributes.avatarUrl != null) {
				this.userAvatar = this.user.forumAtt.attributes.avatarUrl;
            }
            
            this.newUsername = this.user.forumAtt.attributes.username;
        },
        components: {
			'beatloader': beat,
			'moonloader': moon,
            textFirstTime, formFirstTime
		}
	}
</script>