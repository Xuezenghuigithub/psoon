<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" width="40" />
        Psoon
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="login" text>
        <span class="mr-2">Login</span>
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

      <v-overlay opacity=".7" light v-show="showLogin">
        <login  v-on:closeLogin="closeLoginDialog" class="login" />
      </v-overlay>

    </v-content>
    <v-bottom-navigation dark hide-on-scroll horizontal>
      <v-btn value="recent" block>
        <span>like</span>
        <v-icon>mdi-thumb-up-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import Home from "./views/Home";
import Login from "./components/Login";

export default {
  name: "App",
  components: {
    Home,
    Login
  },
  data: () => ({
    showLogin: false
  }),
  methods: {
    login() {
      this.showLogin = true;
    },
    closeLoginDialog(step){
      this.showLogin = step;
    }
  }
};
</script>
<style>
html {
  font-size: 62.5%;
  height: 100%;
  overflow: hidden;
}

</style>
