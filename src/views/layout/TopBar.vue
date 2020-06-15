<template>
  <v-app-bar app dark>
    <div class="d-flex align-center brand">
      <v-img alt="Vuetify Logo" class="shrink mr-2" contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" width="40" />
      <router-link tag="span" to="/Home">Psoon</router-link>
    </div>

    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn v-on="showList && on" @click="canClick && login()" text>
          <span class="mr-2">{{username}}</span>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list flat>
        <v-list-item-group>
          <router-link to="/Manage">
            <v-list-item v-if="isAdmin">
              <v-list-item-icon>
                <v-icon>mdi-cogs</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <router-link tag="span" to="/Manage">
                  <v-list-item-title>管理</v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <v-list-item @click="logOut">
            <v-list-item-icon>
              <v-icon>mdi-account-arrow-left</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>登出</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>

    <v-btn href="https://github.com/Xuezenghuigithub/psoon" target="_blank" text>
      <span class="mr-2">GitHub</span>
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { EventBus } from '../../utils/eventBus';
export default {
  name: "",
  data() {
    return {
      username: 'Sign in',
      showList: false,
      canClick: true
    };
  },
  computed: {
    isAdmin: {
      get(){
        return localStorage.getItem('isAdmin');
      },
      set(val){
      }
  }
  },
  mounted() {
    this.init();
    EventBus.$on('loginBtn', param => {
      this.init();
    })
  },
  methods: {
    init(){
      const username = localStorage.getItem('username');
      this.isAdmin = localStorage.getItem('isAdmin');
      if (username) {
        this.canClick = false;
        this.showList = true;
        this.username = username;
      }
    },
    login() {
      EventBus.$emit('topBarLogin', true);
    },
    logOut() {
      localStorage.removeItem('username');
      localStorage.removeItem('isAdmin');
      this.showList = false;
      this.canClick = true;
      this.username = 'Sign In';
    }
  },
};
</script>

<style lang="" scoped>
</style>
