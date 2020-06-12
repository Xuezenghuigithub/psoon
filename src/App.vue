<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center brand">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" width="40" />
        <span>Psoon</span>
      </div>

      <v-spacer></v-spacer>
      
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" @click="loginFlag && login" text>
            <span class="mr-2">{{username}}</span>
            <v-icon>mdi-account-circle</v-icon>
          </v-btn >
        </template>
        <v-list flat>
          <v-list-item-group>
            <v-list-item v-if="isAdmin">
              <v-list-item-icon>
                <v-icon>mdi-cogs</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>管理</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
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
    <v-content>

      <v-parallax height="1500" src="../src/assets/starry.jpg">
        <home></home>
      </v-parallax>

      <!-- 登录组件 -->
      <v-overlay opacity=".7" light v-show="showSignIn">
        <login v-on:emitLogin="handleEmitFromLogin" class="login" />
      </v-overlay>

      <!-- 注册组件 -->
      <v-overlay opacity=".7" light v-show="showSignUp">
        <sign-up v-on:emitSignUp="handleEmitFromSignUp" class="login" />
      </v-overlay>

    </v-content>
    <v-bottom-navigation dark hide-on-scroll horizontal>
      <v-btn value="recent" block>
        <span>Like</span>
        <v-icon>mdi-thumb-up-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import Home from "./views/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";

export default {
  name: "App",
  components: {
    Home,
    Login,
    SignUp
  },
  data: () => ({
    showSignIn: false,
    showSignUp: false,
    username: 'Sign in',
    loginFlag: true, // 控制登录注册 dialog 事件是否可用
    // isAdmin: false, // 是否为管理员
  }),
  mounted() {
    this.setUsername();
  },
  computed: {
    isAdmin(){
      getters: {
        return localStorage.getItem('isAdmin');
      }
    }
  },
  methods: {
    setUsername(){
      const username = localStorage.getItem('username');
      if (username) {
        this.username = username;
        this.loginFlag = false;
      }
    },
    login() {
      this.showSignIn = true;
    },
    handleEmitFromLogin(data){
      if (data.function === 'close') {
        this.showSignIn = false;
        this.setUsername();
      } else if(data.function === 'signUp') {
        this.showSignIn = false;
        this.showSignUp = !this.showSignIn;
      }
    },
    handleEmitFromSignUp(data) {
      if (data.function === 'close') {
        this.showSignUp = false;
      } else if(data.function === 'signIn') {
        this.showSignUp = false;
        this.showSignIn = !this.showSignUp;
      }
    }
  }
};
</script>
<style lang="scss">
@import "../src/assets/css/font.css";
@import "@/assets/css/common.scss";

html {
  font-size: 62.5%;
  height: 100%;
  overflow: hidden;
}
</style>