<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center brand">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" width="40" />
        <span>Psoon</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn :disabled="signInButton" @click="login" text>
        <span class="mr-2">{{username}}</span>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>

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
    signInButton: false,
  }),
  mounted() {
    this.setUsername();
  },
  methods: {
    setUsername(){
      const username = localStorage.getItem('username');
      if (username) {
        this.username = username;
        this.signInButton = true;
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