<template>
  <div class="block team block--fullheight block--accordion">
    <div class="block__header">
      <h3><fa-icon icon="users" /> A equipe</h3>
    </div>
    <div class="block__content">
      <vue-spinner :loading="lc.loading" color="#303846" size="10px" class="loader"></vue-spinner>
      <div role="tablist" v-if="lc.processed">
        <div class="toggler" v-b-toggle.devs>
          Desenvolvedores
          <span class="opened"><fa-icon icon="angle-up" /></span>
          <span class="closed"><fa-icon icon="angle-down" /></span>
        </div>
        <b-collapse accordion="team" id="devs">
          <user
              v-for="user in devs"
              :key="user.id"
              :user='user'
          />
        </b-collapse>

        <div class="toggler" v-b-toggle.admin>
          Administradores
          <span class="opened"><fa-icon icon="angle-up" /></span>
          <span class="closed"><fa-icon icon="angle-down" /></span>
        </div>
        <b-collapse accordion="team" id="admin">
          <user
              v-for="user in admins"
              :key="user.id"
              :user='user'
          />
        </b-collapse>

        <div class="toggler" v-b-toggle.mods>
          Moderadores
          <span class="opened"><fa-icon icon="angle-up" /></span>
          <span class="closed"><fa-icon icon="angle-down" /></span>
        </div>
        <b-collapse accordion="team" id="mods">
          <user
              v-for="user in mods"
              :key="user.id"
              :user='user'
          />
        </b-collapse>

        <div class="toggler" v-b-toggle.support>
          Suporte
          <span class="opened"><fa-icon icon="angle-up" /></span>
          <span class="closed"><fa-icon icon="angle-down" /></span>
        </div>
        <b-collapse accordion="team" id="support">
          <user
              v-for="user in supports"
              :key="user.id"
              :user='user'
          />
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
  import ForumService from "@/services/forum";
  import PulseLoader from "vue-spinner/src/PulseLoader.vue";

  import user from "./user";

  export default {
    data() {
      return {
        users: [],
        admins: [],
        devs: [],
        mods: [],
        supports: [],

        lc: {
          loading: true,
          processed: false
        }
      };
    },
    mounted() {
      ForumService.getAllUsers()
        .then(response => {
          this.users = response.data.data;
          for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].relationships.groups.data != null) {
              for (
                var j = 0;
                j < this.users[i].relationships.groups.data.length;
                j++
              ) {
                if (this.users[i].relationships.groups.data[j].id == 1) {
                  this.devs.push(this.users[i].attributes);
                }

                if (this.users[i].relationships.groups.data[j].id == 5) {
                  this.mods.push(this.users[i].attributes);
                }

                if (this.users[i].relationships.groups.data[j].id == 4) {
                  this.admins.push(this.users[i].attributes);
                }

                if (this.users[i].relationships.groups.data[j].id == 6) {
                  this.supports.push(this.users[i].attributes);
                }
              }
              
              let s = this;
              setTimeout(function() {
                s.lc.processed = true;
                s.lc.loading = false;
              }, 500);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    components: {
      "vue-spinner": PulseLoader,
      user
    }
  };
</script>

<style lang="scss" scoped>
  .team {
    .block__content {
      padding-bottom: 0px;
      min-height: 374px;
      max-height: 374px;
      overflow-x: auto;

      .rank {
        background-color: #181c24;
        padding: 5px 10px;
        cursor: pointer;

        &:hover {
          background-color: #171b22;
        }

        &:not(:last-child) {
          border-bottom: 1px solid #151920;
        }

        &.collapsed > .opened,
        &:not(.collapsed) > .closed {
          display: none;
        }

        .opened,
        .closed {
          float: right;
        }
      }
    }
  }
</style>